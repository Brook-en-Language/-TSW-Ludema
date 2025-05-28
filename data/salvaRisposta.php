<?php
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

// INPUT
$pattern_id = isset($_POST['pattern_id']) ? intval($_POST['pattern_id']) : null;
$valore_premuto = isset($_POST['valore']) ? intval($_POST['valore']) : null;
$codice_giocatore = $_POST['codice'] ?? "NONE";
$file = $_POST['file'] ?? 'partita_privata.json';

// VALIDAZIONE
if ($pattern_id === null || $valore_premuto === null) {
    echo json_encode(["status" => "errore", "messaggio" => "Dati mancanti"]);
    exit;
}

// PATTERN
$pattern_file = 'pattern.json';
if (!file_exists($pattern_file)) {
    echo json_encode(["status" => "errore", "messaggio" => "pattern.json mancante"]);
    exit;
}

$pattern_data = json_decode(file_get_contents($pattern_file), true);
if (!isset($pattern_data[$pattern_id - 1])) {
    echo json_encode(["status" => "errore", "messaggio" => "Pattern non trovato"]);
    exit;
}

$valore_corretta = $pattern_data[$pattern_id - 1]['valore'];
$giocatore_registrato = ($valore_premuto === $valore_corretta) ? $codice_giocatore : "NONE";

// SALVATAGGIO SU FILE CON LOCK
$fp = fopen($file, 'c+');
if (flock($fp, LOCK_EX)) {
    $contenuto = stream_get_contents($fp);
    $partita_data = json_decode($contenuto, true) ?? [];

    // BLOCCO oltre 70 pattern UNIVOCI
    $patternGiocati = array_column($partita_data, 'pattern_id');
    if (count(array_unique($patternGiocati)) >= 70) {
        flock($fp, LOCK_UN);
        fclose($fp);
        echo json_encode(["status" => "fine", "messaggio" => "Pattern esauriti"]);
        exit;
    }

    $partita_data[] = [
        "pattern_id" => $pattern_id,
        "giocatore" => $giocatore_registrato
    ];

    rewind($fp);
    ftruncate($fp, 0);
    fwrite($fp, json_encode($partita_data, JSON_PRETTY_PRINT));
    fflush($fp);
    flock($fp, LOCK_UN);
    fclose($fp);

    echo json_encode([
        "status" => "ok",
        "giocatore" => $giocatore_registrato,
        "valore_atteso" => $valore_corretta,
        "valore_ricevuto" => $valore_premuto,
        "file_usato" => $file
    ]);
} else {
    fclose($fp);
    echo json_encode(["status" => "errore", "messaggio" => "Impossibile bloccare il file"]);
}
