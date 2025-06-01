const pulsante1 = document.getElementById("P1");
const pulsante2 = document.getElementById("P2");
const pulsante3 = document.getElementById("P3");
const pulsante4 = document.getElementById("P4");
const pulsante5 = document.getElementById("P5");
const schermata = document.querySelector(".schermata");

const pulsanti = [pulsante1, pulsante2, pulsante3, pulsante4, pulsante5];
pulsanti.forEach(p => p.disabled = true);  // disattiva bottoni all'avvio

let patternCorrente = null;
let patternDisponibili = [...Array(70).keys()].map(i => i + 1);  // pattern 1-70
let partitaFinita = false;

let tempoPartitaMinuti = 1; // da cambiare
let codiceUtente = localStorage.getItem("codiceGiocatore");

if (!codiceUtente) {
    codiceUtente = "U" + Math.floor(1000 + Math.random() * 9000);
    localStorage.setItem("codiceGiocatore", codiceUtente);
}

// Mostra ID utente nel div solo dopo averlo generato
document.addEventListener("DOMContentLoaded", () => {
    const utenteIdBox = document.getElementById("utenteIdBox");
    if (utenteIdBox) {
        utenteIdBox.textContent = `Il tuo ID giocatore : ${codiceUtente}`;
    }
});

const tipoPartita = localStorage.getItem("tipoPartita") || "privata";
const nomeFilePartita = tipoPartita === "pubblica" ? "partita_pubblica.json" : "partita_privata.json";

if (tipoPartita === "pubblica") {
    fetch("data/registraGiocatore.php", {
        method: "POST",
        body: new URLSearchParams({ codice: codiceUtente })
    })
    .then(r => r.json())
    .then(data => console.log("Giocatori attivi:", data.giocatori));
}

// BOT simulati
const botCodici = ["B001", "B002"];

function avviaCountdown() {
    let secondi = 3;
    schermata.textContent = `Inizio tra: ${secondi}`;

    const timer = setInterval(() => {
        secondi--;
        schermata.textContent = `Inizio tra: ${secondi}`;
        if (secondi <= 0) {
            clearInterval(timer);
            schermata.textContent = "";
            avviaGioco();
        }
    }, 1000);
}

function avviaGioco() {
    pulsanti.forEach(p => p.disabled = false);
    mostraProssimoPattern();
    avviaTimerFinePartita();
    avviaBot();
}

function mostraProssimoPattern() {
    if (patternDisponibili.length === 0) {
    patternCorrente = null;        // blocca risposte future
    finePartita("Tutti i pattern completati.");
    return;
}

    const index = Math.floor(Math.random() * patternDisponibili.length);
    patternCorrente = patternDisponibili.splice(index, 1)[0];
    console.log("Mostrato pattern:", patternCorrente);
    schermata.textContent = `Pattern: ${patternCorrente}`;
}

function inviaRisposta(patternId, valore, codice) {
    if (partitaFinita || patternCorrente === null) return;

    const dati = new URLSearchParams();
    dati.append("pattern_id", patternId);
    dati.append("valore", valore);
    dati.append("codice", codice);
    dati.append("file", nomeFilePartita);

    fetch("data/salvaRisposta.php", {
        method: "POST",
        body: dati
    })
    .then(res => res.json())
    .then(data => {
        console.log("Risposta registrata:", data);
        if (data.giocatore !== "NONE" && !partitaFinita) {
   
    mostraProssimoPattern();
}

    });
}

// evento al click utente
pulsante1.addEventListener("click", () => inviaRisposta(patternCorrente, 1, codiceUtente));
pulsante2.addEventListener("click", () => inviaRisposta(patternCorrente, 0, codiceUtente));

// modalità per la demo
function avviaBot() {
    setInterval(() => {
        const demoAttiva = document.getElementById("demoToggle").checked;
        if (!patternCorrente || partitaFinita || !demoAttiva) return;

        botCodici.forEach(bot => {
            const valore = Math.round(Math.random());
            inviaRisposta(patternCorrente, valore, bot);
        });
    }, 3000);
}

function avviaTimerFinePartita() {
    setTimeout(() => {
        finePartita("Tempo scaduto");
    }, tempoPartitaMinuti * 60 * 1000);
}

function finePartita(messaggio) {
    partitaFinita = true;
    schermata.textContent = messaggio;
    pulsanti.forEach(p => p.disabled = true);

    // aggiorna classifica UNA VOLTA
    aggiornaClassifica();

    // salva il tipo di partita nel localStorage
    localStorage.setItem("tipoPartita", tipoPartita);

    if (tipoPartita === "pubblica") {
        fetch("data/statoPartita.php", {
            method: "POST",
            body: new URLSearchParams({ stato: "finita" })
        })
        .then(() => {
            window.location.href = "score.html";
        })
        .catch(err => {
            console.error("Errore aggiornamento stato partita:", err);
            window.location.href = "score.html"; // fallback
        });
    } else {
        window.location.href = "score.html";
    }
}



function aggiornaClassifica() {
    fetch(`data/classifica.php?file=${nomeFilePartita}`)
        .then(res => res.json())
        .then(data => {
            const lista = document.getElementById("listaClassifica");
            lista.innerHTML = '';
            Object.entries(data.classifica).forEach(([nome, punteggio]) => {
                const li = document.createElement('li');
                li.textContent = `${nome}: ${punteggio}`;
                lista.appendChild(li);
            });
        });
}

setInterval(() => {
    if (!partitaFinita) aggiornaClassifica();
}, 3000);

// ogni 10 secondi rinnova la connessione (solo in partita pubblica)
if (tipoPartita === "pubblica") {
  setInterval(() => {
    fetch("data/registraGiocatore.php", {
      method: "POST",
      body: new URLSearchParams({ codice: codiceUtente })
    });
  }, 10000);

}

window.addEventListener("beforeunload", function () {
  const codice = localStorage.getItem("codiceGiocatore");
  if (codice) {
    navigator.sendBeacon("data/disconnettiGiocatore.php", new URLSearchParams({ codice }));
  }
});

document.getElementById("btnLobby").addEventListener("click", () => {
    window.location.href = "index.html"
});

window.onload = () => {
    document.getElementById("demoToggle").checked = false;

    document.getElementById("infoPartita").textContent =
        tipoPartita === "pubblica" ? "Modalita: Pubblica" : "Modalita: Privata";

    if (tipoPartita === "privata") {
        fetch(`data/resetPartita.php?file=${nomeFilePartita}`)
            .then(res => res.json())
            .then(data => {
                console.log("Partita resettata:", data);
                avviaCountdown();
            })
            .catch(err => {
                console.error("Errore nel reset della partita:", err);
                avviaCountdown(); // fallback
            });
    } else {
    fetch("data/statoPartita.php")
        .then(res => res.json())
        .then(stato => {
            if (stato.stato === "finita") {
                // resetta la partita e segna che è in corso
                fetch(`data/resetPartita.php?file=${nomeFilePartita}`)
                    .then(() => {
                        return fetch("data/statoPartita.php", {
                            method: "POST",
                            body: new URLSearchParams({ stato: "in_corso" })
                        });
                    })
                    .then(() => {
                        console.log("Partita pubblica resettata e avviata");
                        avviaCountdown();
                    });
            } else {
                console.log("Partita pubblica già in corso");
                avviaCountdown();
            }
        })
        .catch(err => {
            console.error("Errore nel controllo dello stato partita:", err);
            avviaCountdown(); // fallback
        });
}

};
