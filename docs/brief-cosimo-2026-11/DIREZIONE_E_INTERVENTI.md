# Direzione editoriale, design e interventi

Stato: proposta progettuale, non implementazione · 4 novembre 2026

## Idea guida

**«Uno sguardo, sei percorsi.»** La fotografia resta la protagonista. Le prime cinque sezioni mostrano modi differenti di guardare persone e luoghi; la sesta lega lo sguardo alla professione da geometra attraverso i cantieri. La home presenta Cosimo, le pagine successive portano il nome del tema. L'attuale gusto editoriale, con foto grandi e margini generosi, è il punto di partenza.

Non usare immagini generiche per riempire i temi mancanti. Il passaggio ai cantieri deve risultare autentico: dettagli di materiali, geometrie, scala dei luoghi e lavoro documentato, con didascalie che spieghino ciò che si vede quando il cliente le fornisce.

## Struttura narrativa

```text
Home: Cosimo Maietta
  ├─ Primi piani
  ├─ Sala posa
  ├─ In esterna
  ├─ Bianco e nero (selezione trasversale)
  ├─ Paesaggi
  └─ Cantieri / Geometra
Archivio generale: opzionale, percorso secondario
Contatti: accessibili da ogni pagina
```

### Home

Mantenere il nome come unico titolo identitario grande. Aprire con uno scatto forte scelto con il cliente, non con una foto casuale della rotazione. Presentare i sei percorsi con anteprime riconoscibili e un ordine narrativo: volto ravvicinato → persona in studio → persona nel luogo → monocromia → paesaggio → cantiere. Un breve passaggio di testo collega fotografia e professione. I servizi fotografici e il contatto restano chiari; il percorso «Geometra» può avere un invito distinto per evitare richieste indirizzate alla voce sbagliata.

**Decisione proposta:** ridurre la rotazione automatica dell'hero a una foto scelta con controllo manuale, o aggiungere una pausa visibile. Il carosello attuale avanza ogni 5,2 secondi e può sottrarre attenzione al primo scatto.

### Primi piani

Titolo di lavoro: **«A distanza di sguardo»**. Sequenza breve e intensa: un'immagine d'apertura quasi a piena pagina, dettagli di sguardo/espressione e pause di carta tra gruppi di due o tre immagini. Didascalie minime, solo quando aggiungono contesto. Servono foto realmente ravvicinate e originali adatti a tagli ampi.

### Sala posa

Titolo di lavoro: **«Dentro la luce»**. Mostrare differenze tra luce, posa e profilo, alternando interi e dettagli. Valutare dittici solo se le due foto dialogano; non obbligare tutte le immagini in una griglia uniforme. Se il cliente distingue «profili» da «shooting», raccogliere esempi e affinare il titolo.

### In esterna

Titolo di lavoro: **«Figure e luoghi»**. Le persone restano il soggetto, l'ambiente dà contesto. Alternare un'immagine ampia e una più vicina per costruire un racconto spaziale. Evitare di inserire qui paesaggi puri solo per aumentare il numero di immagini.

### Bianco e nero

Titolo di lavoro: **«Volti monocromatici»**, se la selezione è davvero centrata sui volti. Se include anche paesaggi e cantieri, usare un titolo più ampio, per esempio **«Luce e ombra»**. Curare per tono, contrasto e ritmo, non per provenienza dalla pagina originale. La medesima foto può essere richiamata in due percorsi senza duplicare il file. Non applicare automaticamente un filtro CSS a fotografie a colori per simularne una versione in bianco e nero.

### Paesaggi

Titolo di lavoro: **«Orizzonti vicini»**. Qui il paesaggio è il soggetto. Aprire con una fotografia orizzontale ampia; proseguire con variazioni di distanza, luce e stagione, se esistono. È una pagina nuova che oggi non dispone di asset adeguati: il layout finale dipende dalla selezione consegnata.

### Cantieri / Geometra

Titolo di lavoro: **«Geometrie del lavoro»**. Apertura con un'immagine reale di cantiere e una frase fattuale sul ruolo di Cosimo. Seguire con il **video intervista da 3–4 minuti** in posizione prominente, poi testo approvato dal cliente, fotografie con eventuali didascalie contestuali e link alle piattaforme professionali. Separare visivamente i contatti per fotografia dai contatti per attività da geometra, se hanno canali diversi.

**Scaletta proposta per l'intervista:** 1) attività da geometra; 2) come osserva spazi e dettagli; 3) nascita della passione fotografica; 4) relazione tra le due pratiche; 5) invito finale a vedere i lavori o a contattarlo. Domande, riprese, montaggio e approvazione della trascrizione richiedono un accordo di produzione. Curare audio comprensibile, sottotitoli sincronizzati e versione testuale completa. Evitare riprese che mostrino persone, indirizzi, documenti o cantieri senza le necessarie autorizzazioni.

### Archivio

Se resta, intitolarlo **«Archivio fotografico»** o altro titolo tematico. Usarlo come indice filtrabile o ordinabile per tema, distinto dalle pagine raccontate. Con molte immagini, mostrarle progressivamente. Il cliente deve sapere che è una pagina in più rispetto alle sette principali.

## Linguaggio visivo

- **Palette:** mantenere carta chiara `#f0ece3`, testo scuro `#151311` e rosso scuro `#6b2026` come accento misurato. Una pagina in bianco e nero può avere un fondo più scuro se le foto lo richiedono, mantenendo contrasto e coerenza.
- **Tipografia:** conservare la coppia serif/sans attuale, ma dare ai titoli interni una scala calibrata sul contenuto. Il nome rimane un gesto tipografico della home; sui temi la fotografia e il titolo di serie guidano la pagina.
- **Composizione:** una fotografia dominante per apertura, poi una sequenza irregolare controllata. L'eventuale layout a dittico si usa quando c'è una relazione visiva reale. Griglie regolari per l'archivio, non come soluzione unica per ogni serie.
- **Didascalie:** titolo, serie, luogo/anno solo se forniti e verificati. I crediti visibili vanno armonizzati con i diritti e con l'eventuale watermark incorporato. Evitare testi inventati.
- **Logo:** provarlo in testata, favicon e anteprima social solo dopo aver ricevuto il file. Non far competere un logo complesso con le foto o con il nome tipografico della home.

## Movimento e transizioni

| Contesto | Movimento proposto | Regola di qualità |
| --- | --- | --- |
| Entrata pagina | Dissolvenza e piccolo spostamento, durata indicativa 0,4–0,7 s. | Mostrare subito titolo e struttura; niente attese per leggere il contenuto. |
| Immagine di apertura | Reveal morbido una volta, senza deformare il soggetto. | La foto deve restare visibile anche con movimento ridotto o JavaScript lento. |
| Scorrimento galleria | Comparsa leggera di gruppi, non un'animazione diversa per ogni immagine. | Evitare ritardi cumulativi su pagine lunghe. |
| Passaggio tra temi | Transizione coerente con la pagina corrente, con ritorno e percorso successivo evidenti. | URL e cronologia funzionano normalmente; nessun blocco dello scroll. |
| Archivio | Hover/focus sulla didascalia e collegamento alla serie; niente parallax aggressivo. | Stessa informazione disponibile a tastiera e touch. |
| Video | Nessun autoplay; poster statico e pulsante play riconoscibile. | Audio e controllo nelle mani del visitatore. |
| Musica opzionale | Solo dopo gesto esplicito; controllo persistente e raggiungibile. | Non sovrapporla all'audio del video; valutare prima licenza e utilità. |

Conservare il supporto esistente a `prefers-reduced-motion` e verificare che tutti i nuovi effetti lo rispettino. Le durate sono un riferimento di progetto, da rifinire in browser con le foto definitive. Il gesto principale del sito è **guardare e scegliere**, quindi le animazioni devono guidare l'attenzione senza trattenere il visitatore.

## Interventi tecnici nel repository

| Ordine | Intervento | Punto di partenza | Dipendenza / verifica |
| --- | --- | --- | --- |
| 1 | Definire titoli, URL, ordine dei temi e ruolo dell'archivio. | `src/App.tsx`, `src/versione2/content.ts` | Approvazione mappa pagine. |
| 2 | Modellare foto e gallerie per tag multipli (`primi-piani`, `sala-posa`, `in-esterna`, `bianco-e-nero`, `paesaggi`, `cantieri`), metadati e stato dei diritti. | `content.ts`, `ResponsivePhoto.tsx`, `scripts/build-versione2-images.mjs` | Originali e selezione. |
| 3 | Creare template riusabile di pagina tematica con hero, introduzione, galleria, crediti e navigazione tra temi. | `Versione2ProjectPage.tsx`, `versione2.css` | Design approvato e asset per ciascun tema. |
| 4 | Aggiornare home, navigazione e archivio ai sei percorsi; mantenere le varianti `lab=1` solo come strumenti di confronto finché utili. | `Versione2Page.tsx`, `Versione2ArchivePage.tsx`, `Versione2Chrome.tsx` | Titoli e tassonomia finali. |
| 5 | Progettare pagina cantieri con video, trascrizione e link professionali; differenziare eventuali richieste di contatto. | Nuova pagina, `src/App.tsx`, `content.ts` | Foto, testo, video, link, autorizzazioni. |
| 6 | Collegare il form o semplificare il contatto; inserire informativa verificata. | `Versione2Page.tsx`, `.env.example` | Destinazione delle richieste e dati del titolare. |
| 7 | Integrare logo e metadati per pagina; controllare favicon, titolo e condivisione. | `index.html`, `public/favicon.svg`, pagine React | Logo e dominio definitivo. |
| 8 | Verificare qualità e lancio. | `npm run lint`, `npm run build`, browser locale e hosting | Prova desktop/mobile, tastiera, form, video, URL diretti, immagini e link. |

## Ordine di consegna proposto

**Fase 1 — definizione:** approvare struttura, titoli, responsabilità di pubblicazione e inventario dei materiali. **Fase 2 — contenuti:** ricevere fotografie finali, testi, logo, URL e intervista; selezionare e ordinare. **Fase 3 — sito:** implementare template, pagine, navigazione, video e contatti. **Fase 4 — verifica e pubblicazione:** controlli tecnici e visivi, correzioni, configurazione del dominio e passaggio degli accessi secondo accordo.

La prima release può pubblicare soltanto pagine con contenuto reale e approvato. La data di lancio e l'eventuale rilascio scaglionato si decidono dopo aver visto la disponibilità dei materiali, senza riempire le categorie mancanti con segnaposto.
