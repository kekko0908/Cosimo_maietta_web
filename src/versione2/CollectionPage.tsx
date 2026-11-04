import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Plus,
} from "lucide-react";
import { motion } from "motion/react";
import { portfolioCollections } from "./collections";
import { Versione2Footer, Versione2Header } from "./Versione2Chrome";
import { ResponsivePhoto } from "./ResponsivePhoto";
import { PhotoViewer } from "./PhotoViewer";
import { CollectionNavigation } from "./CollectionNavigation";
import { CollectionGallery } from "./CollectionGallery";
import { EditorialRule } from "./EditorialRule";
import { ProfessionalLinks } from "./ProfessionalLinks";
import { Interview } from "./Interview";
import { SiteMeta } from "./SiteMeta";

export default function CollectionPage({
  collectionSlug,
}: {
  collectionSlug?: string;
}) {
  const { slug } = useParams<{ slug: string }>();
  const collection = portfolioCollections.find(
    (item) => item.slug === (collectionSlug ?? slug),
  );
  const [viewer, setViewer] = useState<number | null>(null);
  useEffect(() => {
    setViewer(null);
  }, [collection?.slug]);
  if (!collection)
    return (
      <div className="v2-site">
        <SiteMeta
          title="Pagina non trovata"
          description="Questo percorso non è disponibile. Esplora l’archivio fotografico."
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
  const work = collection.slug === "cantieri";
  const currentIndex = portfolioCollections.indexOf(collection);
  const adjacent = [
    portfolioCollections[
      (currentIndex - 1 + portfolioCollections.length) %
        portfolioCollections.length
    ],
    portfolioCollections[(currentIndex + 1) % portfolioCollections.length],
  ];
  const hero = collection.photos[0];
  return (
    <div className={`v2-site ed-collection-page ed-theme-${collection.layout}`}>
      <SiteMeta
        title={collection.title}
        description={collection.description}
        image={`/media/cosimo/${hero.id}-1080.jpg`}
      />
      <Versione2Header />
      <main id="v2-content">
        <CollectionNavigation />
        <section
          className="ed-collection-opening"
          aria-labelledby="collection-title"
        >
          <motion.div
            className="ed-opening-copy"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <span className="ed-eyebrow">{collection.eyebrow}</span>
            <h1 id="collection-title">{collection.title}</h1>
            <p>{collection.description}</p>
            {collection.previewNote && <small>{collection.previewNote}</small>}
            <div className="ed-opening-links">
              <a href="#selezione">
                La selezione <ArrowDown aria-hidden="true" />
              </a>
              <a href="#fotografie">
                Tutte le fotografie <span>({collection.photos.length})</span>
              </a>
            </div>
          </motion.div>
          <figure className="ed-opening-photo">
            <span className="ed-opening-folio" aria-hidden="true">
              01
            </span>
            <button
              type="button"
              onClick={() => setViewer(0)}
              aria-label={`Apri ${hero.title} a schermo intero`}
            >
              <ResponsivePhoto
                photo={hero}
                sizes="(max-width: 700px) 80vw, 42vw"
                priority
              />
              <Plus className="ed-photo-open" aria-hidden="true" />
            </button>
            <figcaption>{hero.title}</figcaption>
          </figure>
          <EditorialRule />
        </section>
        <div key={collection.slug}>
          <CollectionGallery
            photos={collection.photos}
            label={collection.label}
            onOpen={setViewer}
          />
        </div>
        {work && (
          <>
            <Interview />
            <section
              className="v2-profession-contact"
              aria-labelledby="profession-contact-title"
            >
              <div>
                <span className="ed-eyebrow">Geometra / Contatti</span>
                <h2 id="profession-contact-title">
                  Parliamo del
                  <br />
                  <em>tuo progetto.</em>
                </h2>
                <Link to="/?richiesta=geometra#contatti">
                  Scrivi per l’attività da geometra{" "}
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              </div>
              <ProfessionalLinks />
            </section>
          </>
        )}
        <section
          className="ed-other-stories"
          aria-labelledby="other-stories-title"
        >
          <header>
            <span className="ed-eyebrow">Cambiare prospettiva</span>
            <h2 id="other-stories-title">Altri percorsi.</h2>
            <Link to="/archivio">
              Torna all’archivio <ArrowUpRight aria-hidden="true" />
            </Link>
          </header>
          <nav
            aria-label="Serie precedente e successiva"
            className="ed-story-directions"
          >
            {adjacent.map((item, index) => (
              <Link
                key={item.slug}
                to={item.path}
                className="ed-story-direction"
              >
                <span className="ed-story-direction-label">
                  {index === 0 ? (
                    <ArrowLeft aria-hidden="true" />
                  ) : (
                    <ArrowRight aria-hidden="true" />
                  )}
                  {index === 0 ? "Serie precedente" : "Serie successiva"}
                </span>
                <div className="ed-story-direction-copy">
                  <span>{item.index}</span>
                  <h3>{item.title}</h3>
                </div>
                <ResponsivePhoto
                  photo={item.photos[0]}
                  sizes="(max-width: 700px) 25vw, 16vw"
                />
              </Link>
            ))}
          </nav>
        </section>
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
