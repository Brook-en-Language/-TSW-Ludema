const pulsante1 = document.getElementById("P1");
const pulsante2 = document.getElementById("P2");
const pulsante3 = document.getElementById("P3");
const pulsante4 = document.getElementById("P4");
const pulsante5 = document.getElementById("P5");

function inviaRisposta(patternId, valore, codice) {
    const dati = new URLSearchParams();
    dati.append("pattern_id", patternId);
    dati.append("valore", valore);
    dati.append("codice", codice);

    fetch("salvaRisposta.php", {
        method: "POST",
        body: dati
    })
    .then(response => response.json())
    .then(data => {
        console.log("Risposta registrata:", data);
    });
}
