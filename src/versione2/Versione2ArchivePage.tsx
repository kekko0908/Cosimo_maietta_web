import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import { Versione2Footer, Versione2Header } from "./Versione2Chrome";
import { ResponsivePhoto } from "./ResponsivePhoto";
import { EditorialRule } from "./EditorialRule";
import {
  portfolioCollections,
  type PortfolioPhoto,
  type PortfolioCollection,
} from "./collections";
import { SiteMeta } from "./SiteMeta";

// Follow each series' authored order. Shared photographs appear only once in All.
const archiveEntries: {
  photo: PortfolioPhoto;
  collection: PortfolioCollection;
}[] = [];
const included = new Set<string>();
for (const collection of portfolioCollections) {
  for (const photo of collection.photos) {
    if (included.has(photo.id)) continue;
    included.add(photo.id);
    archiveEntries.push({ photo, collection });
  }
}

export default function Versione2ArchivePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selected = portfolioCollections.find(
    (collection) => collection.slug === searchParams.get("tema"),
  );
  const [visible, setVisible] = useState(24);
  const entries = selected
    ? selected.photos.map((photo) => ({ photo, collection: selected }))
    : archiveEntries;
  const groups = portfolioCollections
    .map((collection) => ({
      collection,
      entries: entries
        .slice(0, visible)
        .filter((entry) => entry.collection.slug === collection.slug),
    }))
    .filter((group) => group.entries.length > 0);
  useEffect(() => {
    setVisible(24);
  }, [selected?.slug]);
  const filter = (theme: string) => {
    const next = new URLSearchParams(searchParams);
    if (theme) next.set("tema", theme);
    else next.delete("tema");
    setSearchParams(next, { replace: true });
  };

  return (
    <div className="v2-site ed-archive-page">
      <SiteMeta
        title="Archivio fotografico"
        description="Esplora tutte le fotografie di Cosimo Maietta per primi piani, sala posa, esterna, bianco e nero, paesaggi e architetture."
      />
      <Versione2Header />
      <main id="v2-content">
        <section className="ed-archive-opening" id="top">
          <span className="ed-eyebrow">Indice generale / Tutti i percorsi</span>
          <h1>
            Archivio
            <br />
            <em>fotografico.</em>
          </h1>
          <p>
            Ritratti, studi di luce e storie in esterna. Una lettura completa
            del lavoro oltre le singole serie.
          </p>
          <EditorialRule />
        </section>

        <section
          className="v2-archive-gallery"
          id="archivio-fotografico"
          aria-labelledby="archive-heading"
        >
          <header>
            <h2 id="archive-heading">Tutte le fotografie</h2>
            <p>
              Una lettura per serie, dal volto ai luoghi.
              <br />
              Seleziona un’immagine per aprire il percorso completo.
            </p>
          </header>
          <div
            className="v2-archive-filters"
            role="group"
            aria-label="Filtra l’archivio per tema"
          >
            <button
              type="button"
              aria-pressed={!selected}
              onClick={() => filter("")}
            >
              Tutte
            </button>
            {portfolioCollections.map((collection) => (
              <button
                type="button"
                key={collection.slug}
                aria-pressed={selected?.slug === collection.slug}
                onClick={() => filter(collection.slug)}
              >
                {collection.label}
              </button>
            ))}
          </div>
          <p className="v2-archive-count" role="status">
            {entries.length} fotografie
            {selected ? ` / ${selected.label}` : " / Tutti i percorsi"}
          </p>
          <div className="ed-archive-series">
            {groups.map(({ collection, entries: groupEntries }) => (
              <section
                className="ed-archive-series-group"
                key={collection.slug}
                aria-labelledby={`archive-${collection.slug}`}
              >
                <header>
                  <div>
                    <span className="ed-eyebrow">{collection.label}</span>
                    <h3 id={`archive-${collection.slug}`}>
                      {collection.title}
                    </h3>
                  </div>
                  <Link to={collection.path}>
                    Apri la serie <ArrowUpRight aria-hidden="true" />
                  </Link>
                </header>
                <div className="ed-archive-photo-grid">
                  {groupEntries.map(({ photo }, index) => (
                    <motion.div
                      key={photo.id}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.08 }}
                      transition={{ duration: 0.6, delay: (index % 4) * 0.04 }}
                    >
                      <Link
                        to={collection.path}
                        aria-label={`${photo.title} — esplora ${collection.title}`}
                      >
                        <figure>
                          <div className="ed-archive-photo-mount">
                            <ResponsivePhoto
                              photo={photo}
                              sizes="(max-width: 700px) 44vw, (max-width: 1100px) 28vw, (max-width: 1800px) 21vw, 420px"
                            />
                          </div>
                          <figcaption>
                            <span>{photo.title}</span>
                            <ArrowUpRight aria-hidden="true" />
                          </figcaption>
                        </figure>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </section>
            ))}
          </div>
          {visible < entries.length && (
            <button
              className="v2-load-more"
              type="button"
              onClick={() => setVisible((count) => count + 24)}
            >
              Mostra altre fotografie <ArrowDown aria-hidden="true" />
            </button>
          )}
        </section>
      </main>
      <Versione2Footer />
    </div>
  );
}
