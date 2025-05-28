<?php
header('Content-Type: application/json');

$file = $_GET['file'] ?? 'partita_privata.json';

if (!file_exists($file)) {
    echo json_encode(["status" => "errore", "messaggio" => "$file mancante"]);
    exit;
}

$data = json_decode(file_get_contents($file), true);
$conteggio = [];

foreach ($data as $record) {
    $giocatore = $record['giocatore'] ?? "NONE";
    if ($giocatore !== "NONE") {
        if (!isset($conteggio[$giocatore])) {
            $conteggio[$giocatore] = 0;
        }
        $conteggio[$giocatore]++;
    }
}

arsort($conteggio);

echo json_encode([
    "status" => "ok",
    "classifica" => $conteggio
]);
