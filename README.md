# Cosimo Maietta

Portfolio fotografico di Cosimo Maietta, fotografo a Napoli, dedicato a ritratto, moda e beauty.

## Funzionalità

- Home predefinita su `/`, con Stories e Services V2 senza parametri nell'URL. Le varianti originali restano disponibili con `?stories=v1&services=v1&lab=1`.
- Sei percorsi: primi piani, sala posa, esterna, bianco e nero, paesaggi e cantieri.
- Archivio con filtri, gallerie editoriali e visualizzatore a schermo intero.
- Pagina geometra con video di esempio sottotitolato, testo e piattaforme professionali.
- Modulo per preparare e copiare un brief o inviarlo a un endpoint configurato.
- Varianti visuali selezionabili; gli strumenti di confronto si aprono solo con `lab=1` nell'URL.
- Immagini locali responsive in AVIF, WebP e JPEG.
- Layout responsive e animazioni con supporto alle preferenze di movimento ridotto.

## Tecnologie

React 19, TypeScript, Vite, React Router, Tailwind CSS 4, Motion e Lucide React.

## Avvio in locale

Prerequisiti: Node.js e npm.

```bash
git clone https://github.com/kekko0908/Cosimo_maietta_web.git
cd Cosimo_Maietta_Web
npm install
npm run dev
```

Vite avvia il sito su `http://localhost:3000`. Per creare la build di produzione:

```bash
npm run build
npm run preview
```

Per i controlli TypeScript:

```bash
npm run lint
```

## Configurazione

Il sito si avvia senza variabili obbligatorie. Senza endpoint il modulo copia un brief pronto da inviare al profilo Instagram di Cosimo. Per abilitare l'invio diretto, copia `.env.example` in `.env.local` e imposta `VITE_CONTACT_API_URL` con l’URL dell’API che riceve le richieste POST in formato JSON. Un esito positivo viene mostrato soltanto dopo una risposta HTTP riuscita.

La configurazione di anteprima usa un logo provvisorio, i link alle home delle piattaforme professionali e un video fotografico di esempio di 3:20. Le sostituzioni sono documentate in [IMPLEMENTAZIONE.md](docs/brief-cosimo-2026-11/IMPLEMENTAZIONE.md). I testi esistenti del portfolio sono stati mantenuti, aggiungendo solo le parti necessarie ai nuovi percorsi.

`npm run check:portfolio` verifica catalogo, provenienza e presenza delle varianti fotografiche. La build prepara i metadati delle pagine e il fallback per Vercel. Per impostazione iniziale il sito è `noindex`; dominio definitivo e indicizzazione si configurano tramite `VITE_SITE_URL` e `VITE_PREVIEW_MODE`.

Non inserire credenziali reali nei file versionati. `.env*` è escluso da Git, mentre `.env.example` contiene solo valori segnaposto.

## Struttura

```text
public/                 Risorse pubbliche e immagini ottimizzate
scripts/                Script di supporto alle immagini
src/
  assets/               Fotografie sorgente
  components/            Pagine e componenti del sito
  context/               Stato di carrello, ordini e sessione
  lib/                   Utility condivise
  versione2/             Portfolio fotografico Versione 2
index.html              Documento HTML iniziale
vite.config.ts          Configurazione Vite
```

## Note sulle immagini

Le immagini del portfolio sono presenti in `src/assets/versione2/source` e nelle varianti ottimizzate sotto `public/media/cosimo`. Prima della pubblicazione, verifica che i diritti d’uso delle fotografie e delle risorse siano coperti.
