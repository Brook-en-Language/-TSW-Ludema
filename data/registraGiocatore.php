<?php
header('Content-Type: application/json');

$codice = $_POST['codice'] ?? null;
if (!$codice) {
    echo json_encode(["status" => "errore", "messaggio" => "Codice mancante"]);
    exit;
}

$file = 'giocatori_attivi.json';
$lista = file_exists($file) ? json_decode(file_get_contents($file), true) : [];

// Se è un array semplice (lista), trasformala in oggetto con timestamp
if (array_keys($lista) === range(0, count($lista) - 1)) {
    $temp = [];
    foreach ($lista as $c) {
        $temp[$c] = time();
    }
    $lista = $temp;
}

$lista[$codice] = time(); // salva timestamp attuale

file_put_contents($file, json_encode($lista, JSON_PRETTY_PRINT));
echo json_encode(["status" => "ok", "giocatori" => array_keys($lista)]);
