-TSW-Ludema-main/ 

/audio
 ∟ contiene le musiche di sottofondo e gli effetti sonori del sito

/data
 ∟ include i file JSON per la memorizzazione dei dati e i file PHP per la logica di backend
     classifica.php
     ∟ elabora un file JSON contenente dati di gioco e restituisce una classifica dei giocatori basata sul loro numero di occorrenze
     disconnettiGiocatore.php
     ∟ gestisce la rimozione di un giocatore dalla lista salvata in giocatori_attivi.json
     getGiocatori.php
     ∟ filtra e restituisce una lista di giocatori attivi con ID validi da giocatori_attivi.json
     giocatori_attivi.json
     ∟ l'elenco dei giocatori che partecipano alla partita
     partita_privata.json
     ∟ tiene traccia di tutte le risposte corrette fornite nelle partite private
     partita_pubblica.json
     ∟ tiene traccia di tutte le risposte corrette fornite nelle partite pubbliche
     partita.json
     ∟ tiene traccia di tutte le risposte fornite nelle partite pubbliche e private
     pattern.json
     ∟ l'elenco dei percorsi di tutti i pattern e delle relative risposte
     registraGiocatore.php
     ∟ aggiorna la lista dei giocatori attivi registrando l'ultimo momento di attività per ciascun giocatore
     resetPartita.php
     ∟ svuota partita_privata.json cancellando tutti i dati al suo interno
     salvaRisposta.php
     ∟ registra e valida le risposte dei giocatori confrontandole con quanto definito in pattern.json
     stato_partita_pubblica.json
     ∟ registra lo stato di una partita pubblica per conto di statoPartita.php
     statoPartita.php
     ∟ gestisce lo stato di una partita pubblica tramite stato_partita_pubblica.json

/font
 ∟ contiene uno dei font utilizzati nell'interfaccia grafica

/img
 ∟ contiene tutte le immagini utilizzate nell'interfaccia grafica

/pattern
 ∟ contiene tutti i pattern utilizzati nel gioco

index.html
∟ file HTML della schermata principale
game.html
∟ file HTML dell'interfaccia gioco
score.html
∟ file HTML della classifica finale
main.js
∟ file JavaScript contenente la logica di index.html
secondary.js
∟ file JavaScript contenente la logica di game.html
tertiary.js
∟ file JavaScript contenente la logica di score.html
style.css
∟ file CSS contenente gli stili grafici di index.html e score.html
stylish.css
∟ file CSS contenente gli stili grafici di game.html










