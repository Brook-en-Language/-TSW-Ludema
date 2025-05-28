<?php
header('Content-Type: application/json');

$file = 'giocatori_attivi.json';
if (!file_exists($file)) {
    echo json_encode([]);
    exit;
}

$data = json_decode(file_get_contents($file), true);
$giocatoriValidi = [];

// Mantieni solo quelli con ID valido (es. "U1234", "B001")
if (is_array($data)) {
    foreach ($data as $key => $timestamp) {
        if (preg_match('/^[UB]\d+$/', $key)) { //mi inserisc 171727 non riconsce codice
            $giocatoriValidi[$key] = $timestamp;
        }
    }
}

// Sovrascrivi il file con solo i validi
file_put_contents($file, json_encode($giocatoriValidi, JSON_PRETTY_PRINT));

// Rispondi con solo gli ID validi
echo json_encode(array_keys($giocatoriValidi));
