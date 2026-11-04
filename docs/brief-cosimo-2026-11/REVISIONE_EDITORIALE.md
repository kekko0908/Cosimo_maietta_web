# Revisione editoriale — 4 novembre 2026

## Correzione successiva dell'utente

Queste scelte sostituiscono la proposta descritta più sotto per home, archivio e footer:

- **Home:** ripristinata la precedente composizione Stories con tre fotografie sovrapposte per percorso e animazioni di ingresso. Conservata la palette calda; rimossi i folio decorativi aggiunti nella proposta scartata.
- **Archivio:** conservata la sala scura, ampliata fino a 1.900 px. Quattro colonne desktop, tre tablet, due telefono; fotografie intere in supporti alti 390 px sugli schermi ampi, 360 px a 1440 e circa 218 px a 390. Eliminati gli sfalsamenti arbitrari. Le serie seguono l'ordine delle selezioni, con titoli e collegamenti espliciti. La vista Tutte mostra 46 immagini uniche; i filtri tematici mantengono anche le fotografie condivise tra più serie.
- **Footer:** sostituito il colophon scuro con una pagina di chiusura su carta calda: fotografia, testo editoriale, navigazione compatta, social e piattaforme professionali. Nessuna ripetizione del nome completo.

Verifiche della correzione: 18 combinazioni di pagina e larghezza (home, archivio e Chi sono a 3840, 1440, 1024, 768, 390 e 320 px) e 17 controlli su filtri, unicità, ordine, caricamento, destinazioni, Stories, footer e movimento ridotto. Nessun errore JavaScript. Screenshot desktop, 4K e mobile ispezionati. I controlli della proposta sottostante sono storici.

## Richiesta e direzione

La prima proposta mostrava immagini troppo grandi e una sequenza lenta da percorrere. L'utente richiede una pagina «Chi sono» approfondita, gerarchie più leggibili, linee oblique, spazio vuoto, movimento e una galleria utilizzabile anche con 50 fotografie. Chiede inoltre servizi e footer editoriali e di eliminare la ripetizione del nome nelle pagine interne.

La direzione scelta è quella di una rivista: composizioni asimmetriche, folio serif rossi, fotografie intere con altezza contenuta, pause e separatori obliqui che si disegnano entrando in vista. Restano Inter, Playfair Display e i colori carta, inchiostro e rosso del progetto. Le immagini non vengono inclinate o deformate.

## Cosa cambia

| Area | Comportamento realizzato |
| --- | --- |
| Chi sono | Nuova rotta `/chi-sono`, apertura «Tra misura e istinto», manifesto, tre capitoli su persona, luce e professione, video e contatto. Collegata da home, testata e footer. |
| Home | Sei percorsi in una composizione da rivista; foto d'apertura contenuta; copy approvato conservato. |
| Prime cinque foto | Una nell'apertura, quattro in una doppia pagina asimmetrica; folio visibili e titoli degli scatti. |
| Foto successive | Griglia da 6, 4 o 3 colonne secondo lo schermo. 24 miniature iniziali, pulsante per caricarne altre 24. |
| Visualizzatore | Immagine intera, indice corretto anche dopo il quinto scatto, frecce, Escape e ripristino del focus. |
| Indice delle serie | Pannello apribile con sei folio grandi; si chiude al cambio pagina o con Escape. |
| Altri percorsi | Due destinazioni equivalenti, «Serie precedente» e «Serie successiva», ognuna con titolo e anteprima. |
| Archivio | Apertura tipografica e miniature contenute; filtri e caricamento progressivo conservati. |
| Servizi | Fisarmonica numerata: titolo, immagine e testo; utilizzabile anche da tastiera. |
| Footer | Colophon scuro con indice, canali e contatti; nessuna ripetizione del nome completo. |
| Identità | Il nome nella testata appare sulla home; le pagine interne mostrano «Fotografia / Portfolio». |
| URL precedenti | I tre vecchi URL progetto portano alle nuove serie corrispondenti. |

## Testi e materiali

Il testo ampliato di «Chi sono» è una proposta editoriale basata sulle informazioni disponibili: professione da geometra, passione fotografica e temi del portfolio. Non aggiunge date, premi, clienti o qualifiche non documentati. Le due immagini di apertura sono indicate come immagini del portfolio, non come ritratto dell'autore. La proposta va validata dall'autore prima della pubblicazione definitiva.

Restano i materiali provvisori già dichiarati: selezione di architetture per i cantieri, video fotografico di esempio al posto dell'intervista, logo sostitutivo e home delle piattaforme professionali in attesa dei profili reali. Le firme già incorporate nelle fotografie originali sono conservate.

## Verifica del nuovo design

- Browser locale: 60 combinazioni, dieci pagine a 3840, 1440, 1024, 768, 390 e 320 px. Un H1 per pagina, nessun overflow orizzontale del documento, nessuna ripetizione del nome nella testata o nel footer interni, nessun errore JavaScript durante la matrice.
- 19 verifiche delle interazioni superate: indice e focus, cambio serie, visualizzatore e tastiera, collegamento a Chi sono, servizi desktop e mobile, URL precedente, movimento ridotto e prova con 50 immagini.
- La prova usa il componente reale con 50 elementi, solo in `output/editorial-qa/`, escluso dal deploy. Dopo il caricamento: 1 apertura + 4 selezionate + 45 miniature. Altezza totale di 4.715 px a 1440, 5.391 px a 390 e 5.488 px a 320; nessun overflow. Miniature alte al massimo 170 px desktop e 115 px sui due telefoni provati.
- Screenshot di selezione, Chi sono, servizi, footer, mobile e schermo ampio ispezionati. Artefatti locali in `output/editorial-qa/`, esclusi da Git.
- Revisione 21st dei nove componenti principali: 0 errori, 0 avvisi e 8 suggerimenti informativi sui colori derivati dalla palette.

TypeScript e `npm run check:portfolio` superati. Build Vite completata con dieci documenti HTML di metadati, inclusa la nuova pagina Chi sono. Verificati sulla build anche home a 1440 px, Chi sono a 390 px, B/N, cantieri e archivio a 320 px: nessun titolo tagliato e nessun overflow orizzontale. La matrice responsive e le interazioni sono state eseguite sul server di sviluppo; i controlli storici della prima proposta restano separati in `IMPLEMENTAZIONE.md`.
