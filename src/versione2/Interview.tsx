import { useState } from 'react';
import { Play } from 'lucide-react';
import { siteConfig } from './siteConfig';

export function Interview() {
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);
  const [duration, setDuration] = useState<string | null>(null);
  const preview = siteConfig.interview.isPreview;
  return (
    <section className="v2-interview" id="intervista" aria-labelledby="interview-title">
      <header>
        <span className="v2-kicker">Una conversazione</span>
        <h2 id="interview-title">
          Professione e<br />
          <em>fotografia.</em>
        </h2>
        <p>Il lavoro da geometra e la passione per le immagini, raccontati in prima persona.</p>
      </header>
      <div className="v2-interview-media">
        <div className="v2-video-frame">
          {started ? (
            <video
              controls
              autoPlay
              playsInline
              preload="metadata"
              crossOrigin="anonymous"
              poster="/media/cosimo/23206334480-1080.jpg"
              onError={() => setFailed(true)}
              onLoadedMetadata={(event) => {
                const seconds = Math.floor(event.currentTarget.duration);
                if (Number.isFinite(seconds)) setDuration(`${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`);
              }}
            >
              <source src={siteConfig.interview.src} type="video/mp4" onError={() => setFailed(true)} />
              {siteConfig.interview.captions && <track
                kind="captions"
                src={siteConfig.interview.captions}
                srcLang="it"
                label="Italiano"
                default
              />}
              Il browser non supporta il video. Puoi leggere il testo qui sotto.
            </video>
          ) : (
            <button
              type="button"
              onClick={() => setStarted(true)}
              aria-label={preview ? 'Riproduci il video di esempio' : 'Riproduci l’intervista'}
            >
              <img
                src="/media/cosimo/23206334480-1080.jpg"
                alt="Corte e facciate in pietra, anteprima del video"
                width="1080"
                height="720"
                loading="lazy"
              />
              <span>
                <Play aria-hidden="true" />
                {preview ? 'Guarda l’anteprima' : 'Guarda l’intervista'}
              </span>
            </button>
          )}
        </div>
        <div className="v2-video-caption">
          <span>
            {preview ? 'Video di esempio · selezione fotografica' : 'Intervista · Cosimo Maietta'}
          </span>
          <span>{duration ?? (preview ? '03:20' : 'Video')}</span>
        </div>
        {failed && (
          <p role="status">Il video non è disponibile. Puoi leggere il testo qui sotto.</p>
        )}
        <details className="v2-transcript">
          <summary>
            {preview ? 'Leggi la traccia dell’intervista' : 'Leggi la trascrizione'}
          </summary>
          <div>
            {preview ? (
              <>
                <p>Traccia di lavoro per una conversazione di 3–4 minuti.</p>
                <h3>Il lavoro da geometra</h3>
                <p>Di cosa ti occupi e cosa osservi quando entri in un cantiere?</p>
                <h3>La passione fotografica</h3>
                <p>Come è nata la fotografia e quali soggetti scegli di raccontare?</p>
                <h3>Uno sguardo sui luoghi</h3>
                <p>Quale relazione trovi tra il tuo lavoro, gli spazi e le immagini?</p>
                <h3>I prossimi progetti</h3>
                <p>
                  Quali storie vorresti fotografare e come possono contattarti le persone
                  interessate?
                </p>
              </>
            ) : (
              <p>
                {import.meta.env.VITE_INTERVIEW_TRANSCRIPT ||
                  'Cosimo Maietta racconta la propria attività da geometra e la passione per la fotografia.'}
              </p>
            )}
          </div>
        </details>
      </div>
    </section>
  );
}
