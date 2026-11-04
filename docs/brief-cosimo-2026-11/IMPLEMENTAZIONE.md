# Implementazione del portfolio

Branch: `feature/percorsi-fotografici`.

Il 4 novembre 2026 è stata autorizzata l'implementazione completa con dati e materiali provvisori dove mancanti. Questa indicazione aggiorna le dipendenze dei documenti di brief: il logo definitivo, gli URL dei profili, le foto di cantieri e la registrazione dell'intervista non bloccano l'anteprima del sito. Palette, tipografia e descrizioni già approvate sono state mantenute.

## Pagine e contenuti

| Pagina | URL | Contenuto |
| --- | --- | --- |
| Home | `/` | Nome in primo piano, sei percorsi, profilo, servizi, contatti e link professionali. |
| A distanza di sguardo | `/fotografia/primi-piani` | 10 fotografie, dettagli e primi piani. |
| Dentro la luce | `/fotografia/sala-posa` | 9 fotografie di studio e ritratto editoriale. |
| Figure e luoghi | `/fotografia/in-esterna` | 10 fotografie ambientate. |
| Volti monocromatici | `/fotografia/bianco-e-nero` | 12 fotografie in B/N, richiamate anche dagli altri percorsi. |
| Orizzonti vicini | `/fotografia/paesaggi` | 12 fotografie di costa e paesaggio dal Flickr dell'autore. |
| Geometrie del lavoro | `/geometra/cantieri` | 8 fotografie di architetture e materiali, video di esempio, traccia dell'intervista e contatto per geometra. |
| Archivio fotografico | `/archivio` | 46 fotografie uniche, sei filtri condivisibili tramite URL e caricamento progressivo. |
| Chi sono | `/chi-sono` | Tre capitoli su persona, luce e professione e spazio per l’intervista. |
| Privacy e contatti | `/privacy` | Informazioni sul funzionamento dell'anteprima e dei servizi di contatto. |

I vecchi URL `/progetti/:slug` e `/versione2/*` restano utilizzabili. Le varianti di confronto si aprono con `lab=1`; Stories e Services V2 sono predefiniti. Il nome nella testata compare soltanto sulla home; nelle pagine interne la testata riporta «Fotografia / Portfolio» e il titolo identifica il tema. Le firme incorporate nei file originali restano parte delle immagini.

## Materiali provvisori e sostituzione

| Elemento | Scelta per l'anteprima | Come sostituirlo |
| --- | --- | --- |
| Logo | Segno originale SVG con C e cornice fotografica. | `public/logo-cm.svg`; favicon in `public/favicon.svg`. |
| Foto cantieri | Immagini reali dell'autore di Perugia, Alberobello e Salento. La pagina le presenta come selezione di studio, senza attribuire questi edifici a suoi incarichi. | Sostituire gli ID nel percorso `cantieri` di `src/versione2/collections-data.json`, importando i file e i relativi metadati. |
| Video | Filmato fotografico locale e silenzioso di 3:20, dichiarato «Video di esempio», con sottotitoli. Non rappresenta un'intervista registrata. | `VITE_INTERVIEW_URL`, `VITE_INTERVIEW_CAPTIONS_URL` e `VITE_INTERVIEW_TRANSCRIPT`. |
| Testo dell'intervista | Quattro domande di lavoro, accessibili nella sezione espandibile. | Trascrizione approvata nella configurazione del video definitivo. |
| ProntoPro / StarOfService | Link alle home delle piattaforme, non a profili inventati. | `VITE_PRONTOPRO_URL`, `VITE_STAROFSERVICE_URL`. |
| Dominio | Indirizzo `.example` in locale; URL di anteprima fornito da Vercel durante la build. | `VITE_SITE_URL` per il dominio finale. |
| Invio richieste | Il modulo copia il brief negli appunti, pronto da inviare al profilo Instagram esistente. Non simula una consegna email. Se gli appunti non sono disponibili, mostra il messaggio selezionabile. | Configurare `VITE_CONTACT_API_URL` per un endpoint POST JSON reale. |

Le foto sono state scaricate dal [profilo Flickr di Cosimo Maietta](https://www.flickr.com/photos/cosimomaietta/) e dagli album Costa Tirrenica e Salento, come autorizzato dall'utente per questa anteprima. I file selezionati, le fonti, le licenze restituite da Flickr e lo stato `user-authorized-preview` sono registrati in `src/assets/versione2/flickr-selection.json`. Questo stato non cambia la licenza originale. L'immagine intitolata «Dile AI» è stata esclusa dalla selezione.

## Design e interazioni

La revisione del 4 novembre conserva il copy approvato e la palette: la home presenta sei percorsi in una composizione asimmetrica, servizi a fisarmonica e footer come colophon. Il carosello ha un comando di pausa e si arresta quando si seleziona manualmente uno scatto; con movimento ridotto non ruota automaticamente. Le gallerie presentano una foto di apertura e quattro scatti selezionati, poi una griglia compatta che carica 24 immagini alla volta. Le fotografie restano intere e contenute, con folio leggibili e separatori obliqui animati. Serie precedente e successiva mostrano titolo e immagine della destinazione. Il visualizzatore usa un dialogo modale, frecce da tastiera, Escape e ritorno del focus all'immagine di partenza.

Il suono ambientale è un accordo sintetizzato dal browser, spento per impostazione iniziale. Ha un volume regolabile e si arresta quando parte un video o si lascia la pagina. Non usa tracce musicali esterne. Il player video si carica dopo un clic; sottotitoli e testo sono disponibili separatamente.

## Build e pubblicazione

`npm run build` genera la build Vite e dieci documenti HTML con metadati specifici per le rotte principali. Non è un rendering completo del contenuto sul server. La configurazione Vercel serve prima i file reali e poi il fallback della SPA per gli altri URL. Le anteprime restano `noindex`; `robots.txt` blocca la scansione. Per il sito definitivo impostare dominio reale e `VITE_PREVIEW_MODE=false`: la build genererà anche la sitemap.

La pubblicazione richiesta riguarda un deploy di anteprima del branch. Acquisto del dominio, intestazione degli account e canoni di manutenzione restano decisioni commerciali da concordare; non sono stati attivati acquisti o abbonamenti.

## Verifica precedente alla revisione editoriale

Controlli automatici superati: TypeScript, build e `npm run check:portfolio` (presenza dei sei percorsi, quantità e unicità delle immagini, provenienza, dimensioni reali e varianti AVIF/WebP/JPEG, video e sottotitoli). La revisione `21st` segnala 0 errori e 0 avvisi; restano suggerimenti informativi sui valori visuali già presenti nel design.

Verifiche in browser sulla build locale: 45 combinazioni di pagina e larghezza (9 pagine a 1440, 1024, 768, 390 e 320 px), con un solo titolo principale per pagina, descrizioni presenti e nessun overflow dei titoli o sovrapposizione della testata. Superate anche 27 verifiche delle interazioni: galleria modale e focus, tastiera, caricamento progressivo, filtri e cronologia, video di 200 secondi e cinque sottotitoli, esclusione reciproca audio/video, copia del brief, menu mobile e movimento ridotto. Nessun errore JavaScript nelle prove sulla build.

Ulteriori sette verifiche superate sulla build finale: pausa manuale del carosello, i tre URL progetto precedenti, varianti di confronto V1, pulizia dei parametri V2 conservando l'ancora e player definitivo con sottotitoli. Screenshot desktop e mobile ispezionati; gli artefatti locali sono in `output/playwright/` (esclusi da Git).

## Revisione editoriale richiesta il 4 novembre

Il dettaglio delle modifiche e delle verifiche del nuovo design è in [REVISIONE_EDITORIALE.md](REVISIONE_EDITORIALE.md). I conteggi della sezione precedente riguardano la prima implementazione.
