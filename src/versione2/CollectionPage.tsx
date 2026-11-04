import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowDown, ArrowLeft, ArrowUpRight, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { portfolioCollections } from './collections';
import { Versione2Footer, Versione2Header } from './Versione2Chrome';
import { ResponsivePhoto } from './ResponsivePhoto';
import { PhotoViewer } from './PhotoViewer';
import { CollectionNavigation } from './CollectionNavigation';
import { ProfessionalLinks } from './ProfessionalLinks';
import { Interview } from './Interview';
import { SiteMeta } from './SiteMeta';

export default function CollectionPage({ collectionSlug }: { collectionSlug?: string }) {
  const { slug } = useParams<{ slug: string }>();
  const collection = portfolioCollections.find((item) => item.slug === (collectionSlug ?? slug));
  const [viewer, setViewer] = useState<number | null>(null);
  const [visible, setVisible] = useState(8);
  useEffect(() => {
    setVisible(8);
    setViewer(null);
  }, [collection?.slug]);

  if (!collection)
    return (
      <div className="v2-site">
        <SiteMeta
          title="Pagina non trovata"
          description="Questo percorso non è disponibile. Esplora l’archivio fotografico di Cosimo Maietta."
        />
        <Versione2Header />
        <main id="v2-content" className="v2-project-missing">
          <span>404 / Percorso non trovato</span>
          <h1>Questa storia non è disponibile.</h1>
          <Link to="/archivio">Esplora l’archivio</Link>
        </main>
        <Versione2Footer />
      </div>
    );

  const work = collection.slug === 'cantieri';
  const currentIndex = portfolioCollections.indexOf(collection);
  const next = portfolioCollections[(currentIndex + 1) % portfolioCollections.length];
  const previous =
    portfolioCollections[
      (currentIndex - 1 + portfolioCollections.length) % portfolioCollections.length
    ];
  const hero = collection.photos[0];
  return (
    <div className={`v2-site v2-collection-page collection-${collection.layout}`}>
      <SiteMeta
        title={collection.title}
        description={collection.description}
        image={`/media/cosimo/${hero.id}-1080.jpg`}
      />
      <Versione2Header />
      <main id="v2-content">
        <CollectionNavigation />
        <section className="v2-collection-hero" aria-labelledby="collection-title">
          <motion.div
            className="v2-collection-intro"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <span className="v2-kicker">
              {collection.index} / {collection.eyebrow}
            </span>
            <h1 id="collection-title">{collection.title}</h1>
            <p>{collection.description}</p>
            {collection.previewNote && (
              <small className="v2-collection-note">{collection.previewNote}</small>
            )}
            <a href="#fotografie" className="v2-collection-explore">
              {String(collection.photos.length).padStart(2, '0')} fotografie
              <ArrowDown aria-hidden="true" />
            </a>
            {work && (
              <a className="v2-interview-jump" href="#intervista">
                Guarda la conversazione <ArrowUpRight aria-hidden="true" />
              </a>
            )}
          </motion.div>
          <motion.figure
            className="v2-collection-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <button
              type="button"
              onClick={() => setViewer(0)}
              aria-label={`Apri ${hero.title} a schermo intero`}
            >
              <ResponsivePhoto photo={hero} sizes="(max-width: 900px) 92vw, 55vw" priority />
              <Plus className="v2-enlarge" aria-hidden="true" />
            </button>
            <figcaption>
              <span>{hero.title}</span>
              <span>© Cosimo Maietta</span>
            </figcaption>
          </motion.figure>
        </section>

        {work && <Interview />}

        <section id="fotografie" className="v2-editorial-gallery" aria-labelledby="gallery-heading">
          <div className="v2-gallery-heading">
            <h2 id="gallery-heading">{collection.label}</h2>
            <span>Una selezione / {collection.photos.length} immagini</span>
          </div>
          <div className="v2-editorial-frames">
            {collection.photos.slice(1, visible).map((photo, index) => (
              <motion.figure
                key={photo.id}
                className={`v2-editorial-frame frame-${index % 5} ${photo.width > photo.height ? 'is-landscape' : 'is-portrait'}`}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.6 }}
              >
                <button
                  type="button"
                  onClick={() => setViewer(index + 1)}
                  aria-label={`Apri ${photo.title} a schermo intero`}
                >
                  <ResponsivePhoto photo={photo} sizes="(max-width: 700px) 92vw, 55vw" />
                  <Plus className="v2-enlarge" aria-hidden="true" />
                </button>
                <figcaption>
                  <span>
                    {String(index + 2).padStart(2, '0')} / {photo.title}
                  </span>
                  <span>© Cosimo Maietta</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
          {visible < collection.photos.length && (
            <button
              className="v2-load-more"
              type="button"
              onClick={() => setVisible((count) => count + 8)}
            >
              Altre fotografie <Plus aria-hidden="true" />
              <span>{collection.photos.length - visible} da guardare</span>
            </button>
          )}
        </section>

        {work && (
          <section className="v2-profession-contact" aria-labelledby="profession-contact-title">
            <div>
              <span className="v2-kicker">Geometra / Contatti</span>
              <h2 id="profession-contact-title">
                Parliamo del
                <br />
                <em>tuo progetto.</em>
              </h2>
              <Link to="/?richiesta=geometra#contatti">
                Scrivi per l’attività da geometra <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
            <ProfessionalLinks />
          </section>
        )}

        <nav className="v2-collection-next" aria-label="Continua tra i percorsi">
          <Link to={previous.path} className="v2-previous-collection">
            <ArrowLeft aria-hidden="true" />
            <span>
              Precedente<em>{previous.label}</em>
            </span>
          </Link>
          <Link to={next.path} className="v2-next-collection">
            <div>
              <span>Prossimo percorso / {next.index}</span>
              <h2>{next.title}</h2>
              <ArrowUpRight aria-hidden="true" />
            </div>
            <ResponsivePhoto photo={next.photos[0]} sizes="(max-width: 700px) 42vw, 30vw" />
          </Link>
        </nav>
      </main>
      <Versione2Footer />
      <PhotoViewer
        photos={collection.photos}
        index={viewer}
        onChange={setViewer}
        onClose={() => setViewer(null)}
      />
    </div>
  );
}
