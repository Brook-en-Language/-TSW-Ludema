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
let codiceUtente = "U001"; // id codice utente

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
        finePartita("Tutti i pattern completati.");
        return;
    }
    const index = Math.floor(Math.random() * patternDisponibili.length);
    patternCorrente = patternDisponibili.splice(index, 1)[0];
    console.log("Mostrato pattern:", patternCorrente);
    schermata.textContent = `Pattern: ${patternCorrente}`;
}

function inviaRisposta(patternId, valore, codice) {
    const dati = new URLSearchParams();
    dati.append("pattern_id", patternId);
    dati.append("valore", valore);
    dati.append("codice", codice);

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
    schermata.textContent =messaggio;
    pulsanti.forEach(p => p.disabled = true);
}

window.onload = avviaCountdown;
