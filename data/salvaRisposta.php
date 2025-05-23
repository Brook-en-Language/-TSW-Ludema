<?php

// date input
$pattern_id = isset($_POST['pattern_id']) ? intval($_POST['pattern_id']) : null;
$valore_premuto = isset($_POST['valore']) ? intval($_POST['valore']) : null;
$codice_giocatore = isset($_POST['codice']) ? $_POST['codice'] : "NONE";

//valido?
if ($pattern_id === null || $valore_premuto === null) {
    echo json_encode(["status" => "errore", "messaggio" => "Dati mancanti"]);
    exit;
}

// p.json?
if (!file_exists('pattern.json')) {
    echo json_encode(["status" => "errore", "messaggio" => "pattern.json mancante"]);
    exit;
}

$pattern_data = json_decode(file_get_contents('pattern.json'), true);

// pattern.id ?
if (!isset($pattern_data[$pattern_id - 1])) {
    echo json_encode(["status" => "errore", "messaggio" => "Pattern non trovato"]);
    exit;
}

$valore_corretta = $pattern_data[$pattern_id - 1]['valore'];

// partita.json
$partita_file = 'partita.json';
$partita_data = file_exists($partita_file) ? json_decode(file_get_contents($partita_file), true) : [];

//registro o no
$giocatore_registrato = ($valore_premuto === $valore_corretta) ? $codice_giocatore : "NONE";

// Agdd record
$partita_data[] = [
    "pattern_id" => $pattern_id,
    "giocatore" => $giocatore_registrato
];


file_put_contents($partita_file, json_encode($partita_data, JSON_PRETTY_PRINT));


echo json_encode([
    "status" => "ok",
    "giocatore" => $giocatore_registrato,
    "valore_atteso" => $valore_corretta,
    "valore_ricevuto" => $valore_premuto
]);
?>

