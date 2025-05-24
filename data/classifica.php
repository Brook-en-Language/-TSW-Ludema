<?php
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

$file = 'partita.json';
//debug non riuscivo a capire perchè non andasse
if (!file_exists($file)) {
    echo json_encode(["status" => "errore", "messaggio" => "partita.json mancante"]);
    exit;
}

$data = json_decode(file_get_contents($file), true);
$conteggio = [];
//occorrenze ho levato NONE
foreach ($data as $record) {
    $giocatore = $record['giocatore'];
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
?>

