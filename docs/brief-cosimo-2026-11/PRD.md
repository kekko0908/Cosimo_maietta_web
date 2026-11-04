# PRD — portfolio fotografico di Cosimo Maietta

Stato: bozza da validare con il cliente · 4 novembre 2026

## 1. Contesto e obiettivo

Il cliente vuole presentare la propria fotografia per linguaggi riconoscibili e collegarla alla sua attività di geometra. Chiede una risposta chiara sulla fattibilità, sul numero di pagine, sulla quantità di immagini, su video e musica, sull'identità del sito, sui collegamenti esterni e sulla gestione dopo la pubblicazione.

**Obiettivo prodotto:** consentire a una persona di entrare dalla home, scegliere un tema fotografico, vedere una selezione ampia ma curata, comprendere il rapporto tra professione e passione fotografica e raggiungere i contatti o i profili professionali pertinenti.

**Pubblico ipotizzato, da confermare:** committenti di ritratti e servizi fotografici; persone interessate al lavoro visivo; potenziali clienti e partner dell'attività da geometra. Le due offerte vanno descritte con chiarezza, senza attribuire automaticamente servizi, qualifiche aggiuntive o risultati non documentati.

## 2. Ambito richiesto e struttura proposta

Il messaggio nomina **cinque pagine fotografiche tematiche più una pagina sui cantieri**, oltre alla prima pagina. Sono quindi **sette pagine principali** se ciascun tema ha una pagina dedicata. L'archivio trasversale oggi esistente può restare come **ottava pagina di consultazione**, previa conferma; non sostituisce le sei pagine richieste.

| Pagina / URL di lavoro | Richiesta del cliente | Funzione editoriale | Stato |
| --- | --- | --- | --- |
| Home `/` | Nome in primo piano solo nella pagina iniziale | Identità, immagine d'apertura, accesso ai sei percorsi, sintesi del profilo | Da adattare |
| Primi piani `/fotografia/primi-piani` | Dettagli fotografici ravvicinati | Sguardi, espressioni, dettagli, ritmo intimo | Nuova |
| Sala posa `/fotografia/sala-posa` | Profili e shooting in studio | Set, luce controllata, pose e relazione col soggetto | Nuova |
| In esterna `/fotografia/in-esterna` | Shooting fotografici fuori studio | Persona nel contesto, luce naturale, movimento | Nuova |
| Bianco e nero `/fotografia/bianco-e-nero` | Raccolta trasversale delle categorie precedenti | Selezione monocromatica per atmosfera e linguaggio | Nuova tassonomia e pagina |
| Paesaggi `/fotografia/paesaggi` | Paesaggi in esterna | Luoghi senza obbligo di soggetto umano; scala e luce | Nuova; materiale assente oggi |
| Cantieri `/geometra/cantieri` | Fotografie dei cantieri e professione | Racconto documentario del lavoro da geometra | Nuova; materiale assente oggi |
| Archivio `/archivio` | Non richiesto in modo esplicito | Accesso a tutte le immagini, con filtri o rimandi ai temi | Esiste; ruolo da decidere |

Gli URL sono proposti e modificabili. Evitare che «in esterna» e «paesaggi» diventino la stessa galleria: la prima racconta persone in un luogo, la seconda il luogo come soggetto. Il bianco e nero è una **selezione trasversale**: una foto può comparire in un tema e nella raccolta monocromatica tramite un unico record, senza duplicare file o creare versioni artificialmente filtrate senza approvazione.

## 3. Requisiti funzionali

| ID | Priorità | Requisito e criterio di accettazione |
| --- | --- | --- |
| RF-01 | Alta | La home mostra il nome come titolo principale e offre accesso chiaro ai sei percorsi. Le pagine interne hanno un `h1` tematico, per esempio «Volti monocromatici», e una breve introduzione approvata dal cliente. |
| RF-02 | Alta | Le cinque gallerie fotografiche e la pagina cantieri hanno URL diretti, navigazione tra temi, immagini ottimizzate e titoli coerenti in menu, pagina e anteprime. |
| RF-03 | Alta | Ogni foto ha almeno ID, titolo o didascalia, testo alternativo, dimensioni, tema, ordine e stato dei diritti d'uso; l'eventuale appartenenza al bianco e nero è un attributo separato. |
| RF-04 | Alta | La pagina cantieri distingue il ruolo professionale dagli incarichi fotografici e usa immagini autorizzate. Ospita una presentazione testuale della professione e del legame con la fotografia. |
| RF-05 | Media, condizionata | Un'intervista di **massimo 3–4 minuti** compare in posizione prominente nella pagina cantieri o nel profilo; teaser in home solo se approvato. Riproduzione su azione dell'utente, poster, sottotitoli e trascrizione leggibile. Produzione e montaggio sono attività da definire. |
| RF-06 | Alta | I contatti mostrano i link verificati a siti personali e piattaforme professionali, inclusi ProntoPro e StarOfService se il cliente fornisce gli URL corretti. I link fotografici e professionali sono distinguibili. |
| RF-07 | Alta | Il modulo contatti, se mantenuto, invia davvero a una destinazione configurata, mostra successo/errore attendibili e collega le informative necessarie; in alternativa si sceglie un canale di contatto funzionante. |
| RF-08 | Media, condizionata | L'identità usa il logo fornito dal cliente dopo verifica della qualità del file e del modo in cui si integra con tipografia, favicon e anteprime social. |
| RF-09 | Bassa, opzionale | Eventuale musica solo su attivazione esplicita, con controlli chiari per pausa e volume e con licenza d'uso verificata. La scelta iniziale proposta è un sito senza musica di sottofondo. |
| RF-10 | Alta | Prima del lancio sono definiti dominio esatto, intestatario, hosting, accessi, responsabile pubblicazione, durata e perimetro dell'eventuale manutenzione; costi ricorrenti formalizzati separatamente. |

## 4. Quantità e gestione delle foto

Non esiste un limite tecnico fisso per pagina. **Proposta editoriale iniziale:** 8–15 immagini forti per tema, variando il ritmo e lasciando spazio alle foto grandi. Un tema con meno immagini valide può partire più corto. Oltre 20 immagini conviene usare una galleria progressiva o una seconda selezione, verificando tempi di caricamento e qualità visiva. Il limite finale dipende dal materiale consegnato, dal peso dei file, dalla licenza d'uso e dal lavoro di selezione.

Il cliente deve poter fornire nuovi scatti senza rifare la struttura del sito. Per la prima consegna basta un catalogo dati mantenuto nel progetto; un pannello di caricamento autonomo richiederebbe sviluppo, sicurezza, gestione file e costi aggiuntivi. **Da confermare:** chi aggiorna le gallerie dopo il lancio e con quale frequenza.

## 5. Requisiti di qualità e pubblicazione

- Design editoriale sobrio con foto grandi, buona resa da 320 px a desktop, testi leggibili e gerarchia dei titoli chiara.
- Immagini responsive con dimensioni dichiarate, formati moderni e caricamento progressivo; originali adatti anche a schermi ad alta densità.
- Navigazione completa da tastiera, alternative testuali, contrasto leggibile, controllo per movimento ridotto, video con sottotitoli/trascrizione.
- Metadati distinti per ogni pagina, URL condivisibili e gestione corretta dei collegamenti diretti all'hosting.
- Verifica dei diritti per fotografie, persone riconoscibili, cantieri, logo, musica e video prima della pubblicazione.
- Pagine/informative per il trattamento dei dati e configurazione dei servizi esterni da verificare prima del lancio con i dati reali del titolare.
- Build, controllo TypeScript, prova in browser desktop e mobile, test del form e prova degli URL profondi sull'ambiente scelto.

## 6. Fuori ambito della prima fase, salvo accordo

E-commerce, prenotazioni, area privata, caricamento autonomo tramite CMS, produzione del video, acquisto del dominio, canoni di hosting e manutenzione continuativa non sono impliciti nel messaggio del cliente. Possono diventare attività esplicite con tempi, responsabilità e preventivo dedicati.

## 7. Decisioni che sbloccano il lavoro

1. Confermare la mappa delle **sei** pagine interne e decidere se mantenere l'archivio come pagina aggiuntiva.
2. Consegnare e selezionare fotografie per ogni tema, in particolare paesaggi e cantieri, con autorizzazioni e originali.
3. Approvare i titoli definitivi e il testo biografico; confermare se il nome deve restare nel solo titolo home o sparire anche da testata e footer.
4. Definire luogo, produzione, testo, riprese e responsabilità per intervista e trascrizione.
5. Fornire logo originale, URL esatti dei contatti e dominio desiderato in forma completa.
6. Concordare responsabile della pubblicazione, proprietà degli account, canoni e manutenzione.
