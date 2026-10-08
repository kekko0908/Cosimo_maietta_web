# Cosimo Maietta — Portfolio fotografico

Versione 2 del portfolio web di Cosimo Maietta: un’esperienza editoriale dedicata alla fotografia di ritratto, moda e beauty, con progetti, archivio e contatti.

## Contenuti

- Homepage portfolio con tre direzioni visive selezionabili: `rivista`, `cinema` e `archivio`.
- Pagine di progetto con gallerie fotografiche e navigazione tra i lavori.
- Archivio fotografico, profilo, servizi e modulo di contatto.
- Layout responsive, animazioni progressive e supporto alle preferenze di movimento ridotto.

## Stack

React, TypeScript, React Router, Motion e Lucide React. Gli stili del portfolio sono inclusi in `src/versione2/versione2.css`.

## Struttura

```text
src/
└── versione2/
    ├── Versione2Page.tsx          # Homepage e sezioni del portfolio
    ├── Versione2ProjectPage.tsx   # Dettaglio dei progetti
    ├── Versione2ArchivePage.tsx   # Archivio fotografico
    ├── Versione2Chrome.tsx        # Header e footer
    ├── Versione2Motion.tsx        # Transizioni e sistema di movimento
    ├── ResponsivePhoto.tsx        # Immagini responsive
    ├── content.ts                 # Progetti, fotografie e contenuti
    ├── motion.ts                  # Varianti di animazione
    ├── motion.css                 # Stili per il movimento
    └── versione2.css              # Stili e layout
```

## Integrazione in un’app React

Questa cartella contiene le pagine e i componenti della versione 2, pensati per essere inseriti in un’app React esistente. L’app ospite deve avere React e le seguenti dipendenze:

```bash
npm install motion lucide-react react-router-dom
```

Configura un router React Router con queste rotte e importa le pagine tramite i rispettivi moduli:

```tsx
<Route path="/versione2" element={<Versione2Page />} />
<Route path="/versione2/archivio" element={<Versione2ArchivePage />} />
<Route path="/versione2/progetti/:slug" element={<Versione2ProjectPage />} />
```

Le pagine di dettaglio usano `versione2.css`; il sistema di transizione esportato da `Versione2Motion.tsx` può essere applicato al gruppo di rotte. Se l’app ospite usa già React Router, registra le rotte nel router esistente invece di crearne un secondo.

## Fotografie

I contenuti fotografici sono definiti in `src/versione2/content.ts` e puntano alle pagine Flickr associate alle immagini. Il rendering ottimizzato usa gli URL immagine costruiti dal componente `ResponsivePhoto`. Verifica disponibilità, diritti d’uso e configurazione delle immagini prima di pubblicare il sito.

## Sviluppo

Per eseguire e pubblicare il sito completo, integra `src/versione2` in un’app React configurata con Vite, React Router e le dipendenze sopra indicate. Questa repository distribuisce il modulo del portfolio e non include un progetto Vite autonomo.
