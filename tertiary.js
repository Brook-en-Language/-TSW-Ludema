const b1 = document.getElementById("btn1");
const b2 = document.getElementById("btn2");

b1.addEventListener("click", eseguiB1);
b2.addEventListener("click", eseguiB2);
document.addEventListener("DOMContentLoaded", () => {caricaClassifica();});

function eseguiB1() {
    window.location.href = "index.html";
}

function eseguiB2() {
    window.location.href = "game.html";
}

const caricaClassifica = () => {
    fetch("data/classifica.php")
        .then(response => {
            if (!response.ok) throw new Error("E1");
            return response.json();
        })
        .then(data => {
            data.status === "ok"
                ? aggiornaTabella(data.classifica) 
                : mostraErrore(data.messaggio || "E2)");
        })
        .catch(error => mostraErrore(error.message));
};

const aggiornaTabella = (classifica) => {
    const corpoTabella = document.getElementById("corpo-classifica");
    corpoTabella.innerHTML = '';

    if (Object.keys(classifica).length === 0) {
        corpoTabella.innerHTML = `
            <tr>
                <td colspan="3" class="caricamento">N1</td>
            </tr>
        `;
        return;
    }

    let posizione = 1;
    for (const [giocatore, punteggio] of Object.entries(classifica)) {
        corpoTabella.innerHTML += `
            <tr>
                <td class="posizione">${posizione}°</td>
                <td class="nome-giocatore">${giocatore}</td>
                <td class="punteggio">${punteggio}</td>
            </tr>
        `;
        posizione++;
    }
};

const mostraErrore = (messaggio) => {
    document.getElementById("corpo-classifica").innerHTML = `
        <tr>
            <td colspan="3" class="caricamento">${messaggio}</td>
        </tr>
    `;
};

