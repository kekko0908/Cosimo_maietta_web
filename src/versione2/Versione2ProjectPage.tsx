import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Versione2Footer } from './Versione2Chrome';
import { ResponsivePhoto } from './ResponsivePhoto';
import { versione2Projects, type Versione2Project } from './content';
import { SiteMeta } from './SiteMeta';

type GalleryVariant = 'editoriale' | 'dittico' | 'sequenza';

const galleryVariants: GalleryVariant[] = ['editoriale', 'dittico', 'sequenza'];
const galleryNames: Record<GalleryVariant, string> = {
  editoriale: 'Mosaico',
  dittico: 'Dittico',
  sequenza: 'Sequenza',
};

const readGalleryVariant = (value: string | null): GalleryVariant =>
  galleryVariants.includes(value as GalleryVariant) ? (value as GalleryVariant) : 'editoriale';

function ProjectHero({ project }: { project: Versione2Project }) {
  return (
    <section className="v2-project-hero">
      <motion.div
        className="v2-project-hero-copy"
        initial={{ opacity: 0, y: 34 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1>{project.title}</h1>
        <p>{project.description}</p>
      </motion.div>
      <motion.div
        className="v2-project-hero-image"
        initial={{ clipPath: 'inset(100% 0 0 0)', scale: 1.035 }}
        animate={{ clipPath: 'inset(0% 0 0 0)', scale: 1 }}
        transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <ResponsivePhoto photo={project.photos[0]} sizes="(max-width: 760px) 100vw, 58vw" priority />
      </motion.div>
    </section>
  );
}

export default function Versione2ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const project = versione2Projects.find((item) => item.slug === slug);
  const gallery = readGalleryVariant(searchParams.get('gallery'));
  const labOpen = searchParams.get('lab') === '1';

  if (!project) {
    return (
      <main className="v2-site v2-project-missing">
        <SiteMeta title="Progetto non trovato" description="Questa storia non è disponibile. Esplora il portfolio fotografico di Cosimo Maietta." />
        <span>404 / Progetto non trovato</span>
        <h1>Questa storia non è disponibile.</h1>
        <Link to={`/${location.search}`}>Torna al portfolio</Link>
      </main>
    );
  }

  const otherProjects = versione2Projects.filter((item) => item.slug !== project.slug);
  const updateGallery = (variant: GalleryVariant) => {
    const next = new URLSearchParams(searchParams);
    next.set('gallery', variant);
    next.set('lab', '1');
    setSearchParams(next, { replace: true });
  };

  return (
    <div className="v2-site v2-project-page" id="top">
      <SiteMeta title={project.title} description={project.description} image={`/media/cosimo/${project.photos[0].id}-1080.jpg`} />
      <header className="v2-project-header">
        <Link to={`/${location.search}`}><ArrowLeft aria-hidden="true" /> Portfolio</Link>
        <span>Cosimo Maietta</span>
      </header>

      <main>
        <ProjectHero project={project} />

        <motion.section
          key={gallery}
          className={`v2-project-gallery v2-project-gallery-${gallery}`}
          aria-label={`Galleria ${project.title}, layout ${galleryNames[gallery]}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
        >
          {project.photos.slice(1).map((photo, index) => (
            <motion.figure
              key={photo.id}
              className={`v2-project-frame frame-${(index % 3) + 1} frame-index-${index + 1}`}
              initial={gallery === 'dittico'
                ? { opacity: 0, x: index % 2 === 0 ? -48 : 48 }
                : gallery === 'sequenza'
                  ? { opacity: 0, scale: 0.96 }
                  : { opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              <ResponsivePhoto photo={photo} sizes={gallery === 'dittico' ? '(max-width: 760px) 92vw, 44vw' : '(max-width: 760px) 92vw, 68vw'} />
              <figcaption><span>{photo.title}</span><span>© Cosimo Maietta</span></figcaption>
            </motion.figure>
          ))}
        </motion.section>

        <section className="v2-project-credits">
          <div><span>Fotografia</span><strong>Cosimo Maietta</strong></div>
          <div><span>Base</span><strong>Napoli, Italia</strong></div>
          <div><span>Ambito</span><strong>{project.eyebrow}</strong></div>
          <a href={project.photos[0].sourceUrl} target="_blank" rel="noreferrer">Fonte fotografica <ArrowUpRight aria-hidden="true" /></a>
        </section>

        <nav className="v2-next-projects" aria-label="Altri progetti">
          <div className="v2-next-projects-heading">
            <h2>Continua a<br /><em>guardare.</em></h2>
          </div>
          <div className="v2-next-project-cards">
            {otherProjects.map((item) => (
              <Link key={item.slug} to={`/progetti/${item.slug}${location.search}`}>
                <div className="v2-next-project-image">
                  <ResponsivePhoto photo={item.photos[0]} sizes="(max-width: 760px) 92vw, 42vw" />
                </div>
                <div className="v2-next-project-copy">
                  <h3>{item.title}</h3>
                  <ArrowUpRight aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </nav>
      </main>

      <Versione2Footer />
      {labOpen && (
        <aside className="v2-lab v2-project-lab" aria-label="Confronto layout della galleria">
          <strong>PROGETTO / LAB</strong>
          <div className="v2-lab-group">
            <span>Galleria</span>
            {galleryVariants.map((variant) => (
              <button
                key={variant}
                type="button"
                className={gallery === variant ? 'is-active' : ''}
                aria-pressed={gallery === variant}
                onClick={() => updateGallery(variant)}
              >
                {galleryNames[variant]}
              </button>
            ))}
          </div>
        </aside>
      )}
    </div>
  );
}
