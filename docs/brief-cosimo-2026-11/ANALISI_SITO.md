# Analisi del sito esistente

Rilevazione: 4 novembre 2026. Fonti: codice della working tree, inventario dei file, build/TypeScript e browser locale a `http://127.0.0.1:3000/`. Le osservazioni visive riguardano home desktop, archivio desktop e pagina progetto su mobile a 390 × 844 px; non costituiscono una verifica completa di tutte le combinazioni.

## Inventario verificato

| Ambito | Stato osservato | Evidenza nel progetto |
| --- | --- | --- |
| Rotte | Home `/`, archivio `/archivio`, progetto `/progetti/:slug`; redirect legacy `/versione2/*`. Nessuna rotta per i sei temi richiesti. | `src/App.tsx` |
| Selezioni | Tre progetti: `Volti / Monochrome` (5 foto), `Editorial Portraits` (6), `Light / Outside` (5). L'archivio mostra tutte le 16 foto. | `src/versione2/content.ts`, `Versione2ArchivePage.tsx` |
| File fotografici | 16 JPEG sorgente, 2,32 MB complessivi. Il lato lungo dei file sorgente presenti è 1024 px; le varianti pubbliche sono JPEG, WebP e AVIF. | `src/assets/versione2/source/`, `public/media/cosimo/`, `ResponsivePhoto.tsx` |
| Contenuto fotografico | La contact sheet mostra prevalentemente ritratti, alcuni in esterna. Non è presente una selezione di paesaggi autonomi né materiale di cantiere. Alcune immagini incorporano watermark. | Ispezione visiva dei 16 JPEG |
| Home | Hero con nome, quattro foto a rotazione ogni 5,2 secondi, tre pannelli di progetto, profilo, servizi e contatti. | `Versione2Page.tsx` |
| Titoli interni | L'archivio usa di nuovo «Cosimo Maietta» come `h1`; i progetti hanno un titolo tematico. Nome molto grande anche nel footer. | `Versione2ArchivePage.tsx`, `Versione2ProjectPage.tsx`, `Versione2Chrome.tsx` |
| Navigazione | Testata con Lavori, Archivio, Profilo, Servizi, Contatti; le pagine progetto usano una testata diversa con ritorno al portfolio. | `Versione2Chrome.tsx`, `Versione2ProjectPage.tsx` |
| Contatti | Instagram, Flickr e TikTok sono linkati. ProntoPro, StarOfService e altri siti non sono presenti. Il form richiede `VITE_CONTACT_API_URL`; senza endpoint segnala errore e invita a usare Instagram. | `content.ts`, `Versione2Page.tsx`, `.env.example` |
| Video e musica | Nessun file video/audio nel materiale pubblico; nessun player o controllo musicale nelle pagine attive. | `public/`, `src/versione2/` |
| Logo | Favicon SVG con «C» stilizzata e wordmark tipografico. Il logo citato dal cliente non è disponibile nel progetto. | `public/favicon.svg`, `Versione2Chrome.tsx` |
| Identità visuale | Carta `#f0ece3`, inchiostro `#151311`, rosso `#6b2026`; Inter e Playfair Display; layout editoriali con immagini grandi. | `src/versione2/versione2.css`, `src/index.css` |
| Movimento | Transizione di pagina, reveal, maschere immagini, sequenza di parole, indicatore di scroll; CSS e componenti includono gestione del movimento ridotto. | `Versione2Motion.tsx`, `motion.ts`, `motion.css`, `versione2.css` |
| Contenuto storico | Restano file `src/components` e `src/context` del precedente sito Arte Viva, non richiamati dalle rotte pubbliche correnti. Non toccarli in questa fase documentale. | `src/App.tsx`, inventario `src/` |

## Scostamenti e priorità

| Priorità | Scostamento | Impatto / intervento |
| --- | --- | --- |
| P0 | Form non collegato a un endpoint nella configurazione di esempio. | Nessuna richiesta può essere recapitata tramite il form senza configurazione e prova completa. Scegliere endpoint reale o canale alternativo prima del lancio. |
| P0 | Mancano foto e contenuti per paesaggi e cantieri. | Le due pagine non possono essere pubblicate con contenuti autentici oggi. Servono originali, selezione, didascalie e autorizzazioni. |
| P1 | La tassonomia attuale accorpa primo piano, studio, esterna e bianco e nero in tre progetti. | Creare i sei percorsi richiesti e assegnare ogni foto secondo tema e linguaggio. |
| P1 | L'archivio ripete il nome come titolo principale. | Sostituire con titolo tematico dopo conferma del significato di «nome solo nella prima pagina». |
| P1 | Mancano video, trascrizione, logo e link professionali. | Acquisire materiali e URL; progettare la pagina cantieri e la sezione contatti. |
| P1 | Gli originali presenti arrivano a 1024 px sul lato lungo. | Chiedere file ad alta risoluzione per foto a tutta larghezza e schermi ad alta densità; evitare di interpolare i JPEG esistenti. |
| P1 | Il sito non definisce dominio, hosting, proprietario degli account o manutenzione. | Documentare accordi commerciali e responsabilità prima di promettere pubblicazione o abbonamenti. |
| P2 | Testi, servizi e titoli oggi enfatizzano ritratto/moda/beauty; l'attività da geometra non compare. | Aggiornare profilo e percorso professionale con fatti approvati, senza confondere le due attività. |
| P2 | L'archivio è una contact sheet unica di 16 foto. | Con sei temi e più immagini valutare filtri, raggruppamento o caricamento progressivo. |
| P2 | Alcune fotografie mostrano watermark incorporati. | Chiedere versioni finali e decidere se il watermark è una scelta intenzionale per il sito. |

## Valutazione della UI attuale

La home desktop ha un'impostazione editoriale riconoscibile: tipografia ampia, palette coerente e fotografia dominante. L'archivio mantiene lo stesso linguaggio, ma usa il nome personale come secondo grande titolo. La pagina progetto mobile osservata è leggibile e dedica quasi tutta la larghezza all'immagine; la foto principale mostra un watermark visibile. La navigazione semantica e i testi alternativi sono presenti nel browser locale. La console non ha riportato errori nelle pagine verificate.

**Da verificare durante l'implementazione:** navigazione mobile completa, comportamento di tutte le varianti, focus e tastiera, pause del carosello, form con endpoint reale, controllo del movimento ridotto, tempi di caricamento con nuovi asset, link e metadati di tutte le nuove pagine. La revisione automatica `21st review` non è stata eseguita perché il comando non è disponibile nell'ambiente; non attribuire a questo documento un punteggio automatico.

## Controlli eseguiti

- `npm run lint` (`tsc --noEmit`): superato.
- `npm run build` (Vite): superato.
- Browser locale: home, archivio e `/progetti/volti-monochrome` aperti; screenshot ispezionati su desktop e su mobile per il progetto; nessun errore console riportato nel controllo della home.

Questi controlli confermano lo stato attuale del sito; non verificano i requisiti futuri né la pubblicazione online.
