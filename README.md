# Cosimo Maietta

Portfolio fotografico di Cosimo Maietta, fotografo a Napoli, dedicato a ritratto, moda e beauty.

## Funzionalità

- Home predefinita su `/`, con Stories e Services V2 senza parametri nell'URL. Le varianti originali restano disponibili con `?stories=v1&services=v1&lab=1`.
- Archivio fotografico, pagine progetto e modulo contatti.
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

Il sito si avvia senza variabili obbligatorie. Per collegare il modulo contatti della Versione 2 a un endpoint, copia `.env.example` in `.env.local` e imposta `VITE_CONTACT_API_URL` con l’URL dell’API che riceve le richieste in formato JSON. Senza endpoint configurato, il modulo usa la risposta di fallback prevista dal frontend.

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
