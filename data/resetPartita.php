<?php
header('Content-Type: application/json');

$file = $_GET['file'] ?? 'partita_privata.json';

if (file_exists($file)) {
    file_put_contents($file, json_encode([], JSON_PRETTY_PRINT));
    echo json_encode(["status" => "reset completato", "file" => $file]);
} else {
    echo json_encode(["status" => "errore", "messaggio" => "$file non trovato"]);
}
