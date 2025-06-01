<?php
header('Content-Type: application/json');

$statoFile = 'stato_partita_pubblica.json';

// Modalita scrittura (via POST)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nuovoStato = $_POST['stato'] ?? null;

    if ($nuovoStato) {
        file_put_contents($statoFile, json_encode(["stato" => $nuovoStato], JSON_PRETTY_PRINT));
        echo json_encode(["status" => "ok", "nuovo_stato" => $nuovoStato]);
    } else {
        echo json_encode(["status" => "errore", "messaggio" => "Stato mancante"]);
    }
    exit;
}

// Modalità lettura (GET)
if (file_exists($statoFile)) {
    $contenuto = file_get_contents($statoFile);
    echo $contenuto;
} else {
    echo json_encode(["stato" => "finita"]); // default se non esiste
}
