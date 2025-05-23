<?php
$pattern_id = isset($_POST['pattern_id']) ? intval($_POST['pattern_id']) : null;
$valore_premuto = isset($_POST['valore']) ? intval($_POST['valore']) : null;
$codice_giocatore = isset($_POST['codice']) ? $_POST['codice'] : "NONE";

//i pattern
$pattern_data = json_decode(file_get_contents('pattern.json'), true);
$valore_corretta = $pattern_data[$pattern_id - 1]['valore']; // pattern_id è 1-based

//partita vuoto o esistente
$partita_file = 'partita.json';
$partita_data = file_exists($partita_file) ? json_decode(file_get_contents($partita_file), true) : [];

//chi scrive
$giocatore_registrato = ($valore_premuto === $valore_corretta) ? $codice_giocatore : "NONE";

//record add
$partita_data[] = [
    "pattern_id" => $pattern_id,
    "giocatore" => $giocatore_registrato
];

// Save
file_put_contents($partita_file, json_encode($partita_data, JSON_PRETTY_PRINT));
echo json_encode(["status" => "ok", "giocatore" => $giocatore_registrato]);
?>

