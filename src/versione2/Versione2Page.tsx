import { FormEvent, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Pause, Play } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ResponsivePhoto } from './ResponsivePhoto';
import { Versione2Footer, Versione2Header } from './Versione2Chrome';
import {
  versione2Photos,
  versione2Services,
  versione2Socials,
  type Versione2Project,
  type Versione2Variant,
} from './content';
import { portfolioCollections as versione2Projects, portfolioPhotos, collectionPath } from './collections';
import { SiteMeta } from './SiteMeta';
import { siteConfig } from './siteConfig';
import { ProfessionalLinks } from './ProfessionalLinks';
import { EditorialServices } from './EditorialServices';
import { EditorialStories } from './EditorialStories';

const variants: Versione2Variant[] = ['rivista', 'cinema', 'archivio'];
const variantNames: Record<Versione2Variant, string> = {
  rivista: 'Rivista',
  cinema: 'Cinema',
  archivio: 'Archivio',
};

const readVariant = (value: string | null, fallback: Versione2Variant): Versione2Variant =>
  variants.includes(value as Versione2Variant) ? (value as Versione2Variant) : fallback;

type SectionLayout = 'v1' | 'v2';

const archiveHeroPhotos = [
  versione2Photos.eyes02,
  versione2Photos.ann03,
  versione2Photos.cricri04,
  versione2Photos.sea,
];

const reveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
};

function Hero({ variant }: { variant: Versione2Variant }) {
  const [activePhoto, setActivePhoto] = useState(0);
  const [paused, setPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (variant !== 'archivio' || shouldReduceMotion || paused) return;
    const interval = window.setInterval(() => {
      setActivePhoto((current) => (current + 1) % archiveHeroPhotos.length);
    }, 5200);
    return () => window.clearInterval(interval);
  }, [variant, shouldReduceMotion, paused]);

  if (variant === 'cinema') {
    return (
      <section className="v2-hero v2-hero-cinema" id="top">
        <div className="v2-cinema-images" aria-hidden="true">
          <ResponsivePhoto photo={versione2Photos.ann01} sizes="50vw" priority />
          <ResponsivePhoto photo={versione2Photos.ann04} sizes="50vw" priority />
        </div>
        <motion.div
          className="v2-cinema-copy"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.15 }}
        >
          <span className="v2-kicker">Portrait & Editorial Photographer</span>
          <h1>La luce.<br />Il volto.<br /><em>La presenza.</em></h1>
          <a href="#lavori" className="v2-circle-link" aria-label="Scopri i lavori">
            <ArrowDown aria-hidden="true" />
          </a>
        </motion.div>
      </section>
    );
  }

  if (variant === 'archivio') {
    return (
      <section className="v2-hero v2-hero-archive" id="top">
        <motion.div className="v2-archive-title" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}>
          <h1>Cosimo<br /><em>Maietta</em></h1>
          <p>Fotografia di ritratto, beauty e storie in esterna.</p>
        </motion.div>
        <div className="v2-archive-hero-image">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              className="v2-archive-slide"
              key={archiveHeroPhotos[activePhoto].id}
              initial={{ clipPath: 'inset(0 0 0 100%)', scale: 1.025 }}
              animate={{ clipPath: 'inset(0 0 0 0%)', scale: 1 }}
              exit={{ clipPath: 'inset(0 100% 0 0)', scale: 1.015 }}
              transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <ResponsivePhoto
                photo={archiveHeroPhotos[activePhoto]}
                sizes="(max-width: 760px) 100vw, 64vw"
                priority={activePhoto === 0}
              />
            </motion.div>
          </AnimatePresence>
          <div className="v2-archive-pagination" aria-label="Seleziona fotografia in evidenza">
            {archiveHeroPhotos.map((photo, index) => (
              <button
                type="button"
                key={photo.id}
                className={index === activePhoto ? 'is-active' : ''}
                aria-label={`Mostra ${photo.title}`}
                aria-pressed={index === activePhoto}
                onClick={() => { setActivePhoto(index); setPaused(true); }}
              />
            ))}
            {!shouldReduceMotion && <button type="button" className="v2-hero-pause" onClick={() => setPaused((value) => !value)}
              aria-label={paused ? 'Riprendi la rotazione delle fotografie' : 'Metti in pausa la rotazione delle fotografie'}>
              {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
            </button>}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="v2-hero v2-hero-magazine" id="top">
      <motion.div className="v2-magazine-name" initial={{ opacity: 0, y: 46 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
        <h1>Cosimo<br /><em>Maietta</em></h1>
      </motion.div>
      <motion.div className="v2-magazine-photo" initial={{ clipPath: 'inset(100% 0 0 0)' }} animate={{ clipPath: 'inset(0% 0 0 0)' }} transition={{ duration: 1.05, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
        <ResponsivePhoto photo={versione2Photos.ann02} sizes="(max-width: 760px) 88vw, 42vw" priority />
        <span className="v2-photo-caption">Portrait / Editorial — Napoli</span>
      </motion.div>
      <motion.div className="v2-magazine-intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.55 }}>
        <span>Fotografo</span>
        <p>Ritratti essenziali, luce istintiva e una ricerca continua sulla presenza.</p>
        <a href="#lavori">Guarda la selezione <ArrowDown aria-hidden="true" /></a>
      </motion.div>
      <div className="v2-vertical-note">Independent photographer · Napoli</div>
    </section>
  );
}

function ProjectLink({ project, search }: { project: Versione2Project; search: string }) {
  return `${collectionPath(project)}${search}`;
}

function Works({ variant, immersive = false }: { variant: Versione2Variant; immersive?: boolean }) {
  const location = useLocation();

  if (immersive) return <EditorialStories />;

  if (variant === 'archivio') {
    return (
      <section className="v2-works v2-works-archive" id="lavori">
        <div className="v2-section-heading v2-section-heading-dark">
          <h2>Archivio selezionato</h2>
        </div>
        <div className="v2-contact-sheet">
          {portfolioPhotos.map((photo, index) => {
            const project = versione2Projects.find((item) => photo.themes.includes(item.slug))!;
            return (
              <Link key={photo.id} to={ProjectLink({ project, search: location.search })} className="v2-contact-item">
                <ResponsivePhoto photo={photo} sizes="(max-width: 600px) 50vw, (max-width: 1100px) 25vw, 16vw" />
                <span>{String(index + 1).padStart(2, '0')} / {photo.title}</span>
              </Link>
            );
          })}
        </div>
      </section>
    );
  }

  if (variant === 'cinema') {
    return (
      <section className="v2-works v2-works-cinema" id="lavori">
        <div className="v2-section-heading v2-section-heading-dark v2-cinema-heading">
          <span>Selected stories</span>
          <h2>Sei modi di guardare.</h2>
        </div>
        <div className="v2-cinema-projects">
          {versione2Projects.map((project) => (
            <motion.article key={project.slug} className="v2-cinema-project" {...reveal}>
              <Link to={ProjectLink({ project, search: location.search })} aria-label={`Apri ${project.title}`}>
                <div className="v2-cinema-project-images">
                  <ResponsivePhoto photo={project.photos[0]} sizes="(max-width: 760px) 100vw, 50vw" />
                  <ResponsivePhoto photo={project.photos[1]} sizes="(max-width: 760px) 45vw, 25vw" />
                </div>
                <div className="v2-cinema-project-copy">
                  <h3>{project.title}</h3>
                  <ArrowUpRight aria-hidden="true" />
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="v2-works v2-works-magazine" id="lavori">
      <motion.div className="v2-section-heading" {...reveal}>
        <h2>Immagini con<br /><em>una voce propria.</em></h2>
      </motion.div>
      <div className="v2-magazine-projects">
        {versione2Projects.map((project, index) => (
          <motion.article key={project.slug} className={`v2-magazine-project project-${index + 1}`} {...reveal}>
            <Link to={ProjectLink({ project, search: location.search })}>
              <div className="v2-project-image-wrap">
                <ResponsivePhoto photo={project.photos[0]} sizes="(max-width: 760px) 92vw, 54vw" />
                <span className="v2-project-number">({project.index})</span>
              </div>
              <div className="v2-project-copy">
                <span>{project.eyebrow}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <span className="v2-text-link">Apri il progetto <ArrowUpRight aria-hidden="true" /></span>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Profile({ variant }: { variant: Versione2Variant }) {
  if (variant === 'cinema') {
    return (
      <section className="v2-profile v2-profile-cinema" id="profilo">
        <motion.div className="v2-profile-cinema-heading" {...reveal}>
          <h2>About / <em>Cosimo</em></h2>
        </motion.div>
        <motion.blockquote {...reveal}>“Cerco l’istante in cui un volto smette di posare.”</motion.blockquote>
        <motion.div className="v2-profile-cinema-photo" {...reveal}>
          <ResponsivePhoto photo={versione2Photos.patrik} sizes="(max-width: 760px) 76vw, 28vw" />
        </motion.div>
        <motion.div className="v2-profile-cinema-copy" {...reveal}>
          <p>Fotografo con base a Napoli. Il suo lavoro attraversa ritratto, moda, scena e racconto dei luoghi, alternando rigore e intuizione.</p>
          <div><span>Base</span><strong>Napoli, Italia</strong></div>
          <div><span>Ricerca</span><strong>Volto, luce, presenza</strong></div>
          <Link className="v2-profile-profession" to="/chi-sono">Leggi chi sono <ArrowUpRight aria-hidden="true" /></Link>
        </motion.div>
      </section>
    );
  }

  if (variant === 'archivio') {
    return (
      <section className="v2-profile v2-profile-archive" id="profilo">
        <div className="v2-profile-index"><h2>Cosimo Maietta</h2></div>
        <div className="v2-profile-facts">
          <div><span>Base</span><strong>Napoli, Italia</strong></div>
          <div><span>Ambiti</span><strong>Ritratto, fashion, scena</strong></div>
          <div><span>Approccio</span><strong>Luce, forma, presenza</strong></div>
          <div><span>Disponibilità</span><strong>Commissioni e collaborazioni</strong></div>
        </div>
        <p className="v2-profile-archive-copy">Una pratica fotografica aperta a forme e colori diversi, con particolare attenzione al ritratto, alla scena teatrale, alla musica e al libro fotografico.</p>
      </section>
    );
  }

  return (
    <section className="v2-profile v2-profile-magazine" id="profilo">
      <motion.div className="v2-profile-portrait" {...reveal}>
        <ResponsivePhoto photo={versione2Photos.cricri04} sizes="(max-width: 760px) 86vw, 34vw" />
      </motion.div>
      <motion.div className="v2-profile-interview" {...reveal}>
        <span className="v2-kicker">Profilo / Nota dell’autore</span>
        <h2>Prima la persona.<br /><em>Poi la fotografia.</em></h2>
        <div className="v2-interview-row"><span>01</span><p>Cosimo Maietta vive e lavora a Napoli. Il ritratto è il centro di una ricerca che passa dalla moda alla scena, fino ai luoghi.</p></div>
        <div className="v2-interview-row"><span>02</span><p>La direzione è precisa ma mai rigida: spazio al gesto, alla luce disponibile e a ciò che accade tra uno scatto e l’altro.</p></div>
      </motion.div>
    </section>
  );
}

function Services({ interactive = false }: { interactive?: boolean }) {
  if (interactive) return <EditorialServices />;

  return (
    <section className="v2-services" id="servizi">
      <motion.div className="v2-services-title" {...reveal}>
        <h2>Una visione,<br /><em>costruita insieme.</em></h2>
        <p>Ogni incarico parte da un confronto: obiettivo, linguaggio, destinazione delle immagini. La produzione prende forma attorno al progetto, non a un pacchetto standard.</p>
        <a href="#contatti">Racconta il progetto <ArrowDown aria-hidden="true" /></a>
      </motion.div>
      <div className="v2-service-list">
        {versione2Services.map((service) => (
          <motion.article key={service.index} {...reveal}>
            <div>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
            </div>
            <ul aria-label={`Ambiti ${service.title}`}>
              {service.details.map((detail) => <li key={detail}>{detail}</li>)}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

function Contact() {
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [message, setMessage] = useState('');
  const [draft, setDraft] = useState('');
  const [searchParams] = useSearchParams();

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const endpoint = siteConfig.contactEndpoint;
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    if (data.website) return;
    if (!endpoint) {
      const text = `Richiesta per Cosimo Maietta\n\nNome: ${data.name}\nEmail: ${data.email}\nAmbito: ${data.projectType}\nBrand / Studio: ${data.brand || '—'}\nPeriodo: ${data.date || 'Da definire'}\nBudget: ${data.budget}\n\n${data.message}`;
      try {
        await navigator.clipboard.writeText(text);
        setDraft(''); setStatus('success');
        setMessage('Messaggio copiato. Puoi incollarlo nella conversazione su Instagram.');
      } catch {
        setDraft(text); setStatus('idle');
        setMessage('Il messaggio è pronto: copialo qui sotto e invialo a Cosimo.');
      }
      return;
    }

    setStatus('sending');
    setMessage('Invio in corso…');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Request failed');
      form.reset();
      setStatus('success');
      setMessage('Richiesta inviata. Grazie, ti risponderemo presto.');
    } catch {
      setStatus('error');
      setMessage('Invio non riuscito. Riprova oppure scrivi direttamente su Instagram.');
    }
  };

  return (
    <section className="v2-contact" id="contatti">
      <div className="v2-contact-intro">
        <h2>Hai un’immagine<br />in mente?</h2>
        <p>Racconta il progetto, le date e il contesto. Poche informazioni, una conversazione concreta.</p>
        <a href={versione2Socials[0].href} target="_blank" rel="noreferrer">Scrivi su Instagram <ArrowUpRight aria-hidden="true" /></a>
        <ProfessionalLinks />
      </div>
      <form className="v2-contact-form" onSubmit={submit}>
        <div className="v2-form-heading">
          <div><span>Brief di progetto</span><span>01 — 07</span></div>
          <h3>Invia una richiesta</h3>
          <p>I campi essenziali sono nome, email e brief. Le altre informazioni aiutano a preparare una risposta più precisa.</p>
        </div>
        <div className="v2-form-grid">
          <label>Nome<input name="name" autoComplete="name" required /></label>
          <label>Email<input name="email" type="email" autoComplete="email" required /></label>
          <label>Brand / Studio<input name="brand" autoComplete="organization" /></label>
          <label>Tipo di progetto<select key={searchParams.get('richiesta')} name="projectType" defaultValue={searchParams.get('richiesta') === 'geometra' ? 'Geometra / Cantiere' : 'Editoriale'}><option>Editoriale</option><option>Ritratto</option><option>Fashion / Beauty</option><option>Evento / Backstage</option><option>Geometra / Cantiere</option><option>Altro</option></select></label>
          <label>Periodo<input name="date" placeholder="Mese o data indicativa" /></label>
          <label>Budget indicativo<select name="budget" defaultValue="Da definire"><option>Da definire</option><option>Fino a €500</option><option>€500–1.500</option><option>€1.500–3.000</option><option>Oltre €3.000</option></select></label>
        </div>
        <label>Brief<textarea name="message" rows={5} required placeholder="Obiettivo, utilizzo delle immagini, location e numero di scatti." /></label>
        <label className="v2-honeypot" aria-hidden="true">Sito web<input name="website" tabIndex={-1} autoComplete="off" /></label>
        <label className="v2-consent"><input name="consent" type="checkbox" value="accepted" required /><span>Ho letto le <Link to="/privacy">informazioni sul trattamento dei dati</Link> per la gestione della mia richiesta.</span></label>
        <button type="submit" disabled={status === 'sending'}>{siteConfig.contactEndpoint ? 'Invia la richiesta' : 'Copia la richiesta'} <ArrowUpRight aria-hidden="true" /></button>
        {!siteConfig.contactEndpoint && <p className="v2-form-help">Prepara il messaggio e invialo a Cosimo su Instagram.</p>}
        <p className={`v2-form-status is-${status}`} role="status" aria-live="polite">{message}</p>
        {draft && <label>Messaggio pronto<textarea readOnly value={draft} rows={8} onFocus={(event) => event.currentTarget.select()} /></label>}
      </form>
    </section>
  );
}

function VersionLab({ values, layouts, update, updateLayout }: {
  values: Record<'hero' | 'works' | 'profile', Versione2Variant>;
  update: (section: 'hero' | 'works' | 'profile', variant: Versione2Variant) => void;
  layouts: Record<'stories' | 'services', SectionLayout>;
  updateLayout: (section: 'stories' | 'services', layout: SectionLayout) => void;
}) {
  return (
    <aside className="v2-lab" aria-label="Confronto varianti Versione 2">
      <strong>V2 / LAB</strong>
      {(['hero', 'works', 'profile'] as const).map((section) => (
        <div className="v2-lab-group" key={section}>
          <span>{section === 'works' ? 'lavori' : section === 'profile' ? 'profilo' : 'hero'}</span>
          {variants.map((variant) => (
            <button
              key={variant}
              type="button"
              className={values[section] === variant ? 'is-active' : ''}
              aria-pressed={values[section] === variant}
              onClick={() => update(section, variant)}
            >
              {variantNames[variant]}
            </button>
          ))}
        </div>
      ))}
      {(['stories', 'services'] as const).map((section) => (
        <div className="v2-lab-group v2-lab-group-two" key={section}>
          <span>{section === 'stories' ? 'stories' : 'servizi'}</span>
          {(['v1', 'v2'] as const).map((layout) => (
            <button
              key={layout}
              type="button"
              className={layouts[section] === layout ? 'is-active' : ''}
              aria-pressed={layouts[section] === layout}
              onClick={() => updateLayout(section, layout)}
            >
              {layout === 'v1' ? 'Originale' : 'V2'}
            </button>
          ))}
        </div>
      ))}
    </aside>
  );
}

export default function Versione2Page() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const hero = readVariant(searchParams.get('hero'), 'archivio');
  const works = readVariant(searchParams.get('works'), 'cinema');
  const profile = readVariant(searchParams.get('profile'), 'cinema');
  const stories: SectionLayout = searchParams.get('stories') === 'v1' ? 'v1' : 'v2';
  const services: SectionLayout = searchParams.get('services') === 'v1' ? 'v1' : 'v2';
  const labOpen = searchParams.get('lab') === '1';

  useEffect(() => {
    if (searchParams.get('stories') !== 'v2' && searchParams.get('services') !== 'v2') return;
    const next = new URLSearchParams(searchParams);
    if (next.get('stories') === 'v2') next.delete('stories');
    if (next.get('services') === 'v2') next.delete('services');
    navigate({ pathname: location.pathname, search: next.toString(), hash: location.hash }, { replace: true });
  }, [location.hash, location.pathname, navigate, searchParams]);

  const update = (section: 'hero' | 'works' | 'profile', variant: Versione2Variant) => {
    const next = new URLSearchParams(searchParams);
    next.set(section, variant);
    next.set('lab', '1');
    setSearchParams(next, { replace: true });
  };

  const updateLayout = (section: 'stories' | 'services', layout: SectionLayout) => {
    const next = new URLSearchParams(searchParams);
    if (layout === 'v2') next.delete(section);
    else next.set(section, layout);
    next.set('lab', '1');
    setSearchParams(next, { replace: true });
  };

  return (
    <div className="v2-site">
      <SiteMeta title="Portrait & Editorial Photographer" description="Cosimo Maietta: ritratti, sala posa, storie in esterna, bianco e nero, paesaggi e uno sguardo sulla professione da geometra." />
      <Versione2Header />
      <main id="v2-content">
        <Hero variant={hero} />
        <Works variant={works} immersive={stories === 'v2'} />
        <Profile variant={profile} />
        <Services interactive={services === 'v2'} />
        <Contact />
      </main>
      <Versione2Footer />
      {labOpen && (
        <VersionLab
          values={{ hero, works, profile }}
          layouts={{ stories, services }}
          update={update}
          updateLayout={updateLayout}
        />
      )}
    </div>
  );
}
