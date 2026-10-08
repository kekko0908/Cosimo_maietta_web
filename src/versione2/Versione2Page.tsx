import { FormEvent, useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ResponsivePhoto } from './ResponsivePhoto';
import { Versione2Footer, Versione2Header } from './Versione2Chrome';
import {
  versione2Photos,
  versione2Projects,
  versione2Services,
  versione2Socials,
  type Versione2Project,
  type Versione2Variant,
} from './content';
import './versione2.css';

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
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (variant !== 'archivio' || shouldReduceMotion) return;
    const interval = window.setInterval(() => {
      setActivePhoto((current) => (current + 1) % archiveHeroPhotos.length);
    }, 5200);
    return () => window.clearInterval(interval);
  }, [variant, shouldReduceMotion]);

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
                onClick={() => setActivePhoto(index)}
              />
            ))}
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
  return `/progetti/${project.slug}${search}`;
}

function Works({ variant, immersive = false }: { variant: Versione2Variant; immersive?: boolean }) {
  const location = useLocation();

  if (immersive) {
    return (
      <section className="v2-works v2-works-stories" id="lavori">
        <div className="v2-section-heading v2-section-heading-dark v2-stories-heading">
          <span>Selected stories / V2</span>
          <h2>Tre modi di guardare.</h2>
        </div>
        <div className="v2-story-panels">
          {versione2Projects.map((project, index) => (
            <motion.article
              key={project.slug}
              className={`v2-story-panel story-${index + 1}`}
              initial={{ opacity: 0, y: 72 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.16 }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link to={ProjectLink({ project, search: location.search })} aria-label={`Apri ${project.title}`}>
                <div className="v2-story-copy">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <ArrowUpRight aria-hidden="true" />
                </div>
                <div className="v2-story-images">
                  {project.photos.slice(0, 3).map((photo, photoIndex) => (
                    <motion.div
                      key={photo.id}
                      className={`v2-story-image image-${photoIndex + 1}`}
                      initial={{ opacity: 0, y: 52 + photoIndex * 18, scale: 1.035 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 1, delay: photoIndex * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <ResponsivePhoto photo={photo} sizes="(max-width: 760px) 72vw, 34vw" />
                    </motion.div>
                  ))}
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>
    );
  }

  if (variant === 'archivio') {
    return (
      <section className="v2-works v2-works-archive" id="lavori">
        <div className="v2-section-heading v2-section-heading-dark">
          <h2>Archivio selezionato</h2>
        </div>
        <div className="v2-contact-sheet">
          {versione2Projects.flatMap((project) =>
            project.photos.map((photo, index) => (
              <Link key={photo.id} to={ProjectLink({ project, search: location.search })} className="v2-contact-item">
                <ResponsivePhoto photo={photo} sizes="(max-width: 600px) 50vw, (max-width: 1100px) 25vw, 16vw" />
                <span>{String(index + 1).padStart(2, '0')} / {photo.title}</span>
              </Link>
            )),
          )}
        </div>
      </section>
    );
  }

  if (variant === 'cinema') {
    return (
      <section className="v2-works v2-works-cinema" id="lavori">
        <div className="v2-section-heading v2-section-heading-dark v2-cinema-heading">
          <span>Selected stories</span>
          <h2>Tre modi di guardare.</h2>
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

const servicePhotos = [versione2Photos.ann02, versione2Photos.cricri01, versione2Photos.sea];

function Services({ interactive = false }: { interactive?: boolean }) {
  const [activeService, setActiveService] = useState(0);

  if (interactive) {
    return (
      <section className="v2-services v2-services-hover" id="servizi">
        <motion.div className="v2-services-title" {...reveal}>
          <h2>Una visione,<br /><em>costruita insieme.</em></h2>
          <p>Passa sui tre ambiti per cambiare ritmo, immagine e racconto. La produzione resta costruita attorno al progetto.</p>
          <a href="#contatti">Racconta il progetto <ArrowDown aria-hidden="true" /></a>
        </motion.div>
        <div className="v2-services-stage">
          <AnimatePresence initial={false} mode="sync">
            <motion.div
              className="v2-services-preview"
              key={servicePhotos[activeService].id}
              initial={{ opacity: 0, x: 28, scale: 1.025 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -22, scale: 1.01 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <ResponsivePhoto photo={servicePhotos[activeService]} sizes="(max-width: 760px) 92vw, 48vw" />
            </motion.div>
          </AnimatePresence>
          <div className="v2-services-hover-list">
            {versione2Services.map((service, index) => (
              <button
                type="button"
                key={service.index}
                className={index === activeService ? 'is-active' : ''}
                aria-pressed={index === activeService}
                onPointerEnter={() => setActiveService(index)}
                onFocus={() => setActiveService(index)}
                onClick={() => setActiveService(index)}
              >
                <span>{service.title}</span>
                <small>{service.details.join(' · ')}</small>
                <ArrowUpRight aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }

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

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const endpoint = import.meta.env.VITE_CONTACT_API_URL;

    if (!endpoint) {
      setStatus('error');
      setMessage('Il modulo è pronto, ma l’endpoint non è ancora configurato. Puoi contattare Cosimo su Instagram.');
      return;
    }

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    if (data.website) return;

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
          <label>Tipo di progetto<select name="projectType" defaultValue="Editoriale"><option>Editoriale</option><option>Ritratto</option><option>Fashion / Beauty</option><option>Evento / Backstage</option><option>Altro</option></select></label>
          <label>Periodo<input name="date" placeholder="Mese o data indicativa" /></label>
          <label>Budget indicativo<select name="budget" defaultValue="Da definire"><option>Da definire</option><option>Fino a €500</option><option>€500–1.500</option><option>€1.500–3.000</option><option>Oltre €3.000</option></select></label>
        </div>
        <label>Brief<textarea name="message" rows={5} required placeholder="Obiettivo, utilizzo delle immagini, location e numero di scatti." /></label>
        <label className="v2-honeypot" aria-hidden="true">Sito web<input name="website" tabIndex={-1} autoComplete="off" /></label>
        <label className="v2-consent"><input name="consent" type="checkbox" value="accepted" required /><span>Acconsento al trattamento dei dati per la gestione della mia richiesta.</span></label>
        <button type="submit" disabled={status === 'sending'}>Invia la richiesta <ArrowUpRight aria-hidden="true" /></button>
        <p className={`v2-form-status is-${status}`} role="status" aria-live="polite">{message}</p>
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
              {layout === 'v1' ? 'Attuale' : 'V2'}
            </button>
          ))}
        </div>
      ))}
    </aside>
  );
}

export default function Versione2Page() {
  const [searchParams, setSearchParams] = useSearchParams();
  const hero = readVariant(searchParams.get('hero'), 'archivio');
  const works = readVariant(searchParams.get('works'), 'cinema');
  const profile = readVariant(searchParams.get('profile'), 'cinema');
  const stories: SectionLayout = searchParams.get('stories') === 'v2' ? 'v2' : 'v1';
  const services: SectionLayout = searchParams.get('services') === 'v2' ? 'v2' : 'v1';
  const labOpen = searchParams.get('lab') === '1';

  useEffect(() => {
    document.title = 'Cosimo Maietta — Portrait & Editorial Photographer';
  }, []);

  useEffect(() => {
    const defaults = { stories: 'v2', services: 'v2' };
    if (Object.keys(defaults).every((key) => searchParams.has(key))) return;

    const next = new URLSearchParams(searchParams);
    Object.entries(defaults).forEach(([key, value]) => {
      if (!next.has(key)) next.set(key, value);
    });
    setSearchParams(next, { replace: true });
  }, [searchParams, setSearchParams]);

  const update = (section: 'hero' | 'works' | 'profile', variant: Versione2Variant) => {
    const next = new URLSearchParams(searchParams);
    next.set(section, variant);
    next.set('lab', '1');
    setSearchParams(next, { replace: true });
  };

  const updateLayout = (section: 'stories' | 'services', layout: SectionLayout) => {
    const next = new URLSearchParams(searchParams);
    next.set(section, layout);
    next.set('lab', '1');
    setSearchParams(next, { replace: true });
  };

  return (
    <div className="v2-site">
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
