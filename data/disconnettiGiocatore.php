<?php
$codice = $_POST['codice'] ?? null;
if (!$codice) exit;

$file = 'giocatori_attivi.json';
if (!file_exists($file)) exit;

$giocatori = json_decode(file_get_contents($file), true);

// Se sono solo stringhe:
$giocatori = array_filter($giocatori, fn($g) => $g !== $codice);

file_put_contents($file, json_encode(array_values($giocatori), JSON_PRETTY_PRINT));
?>
