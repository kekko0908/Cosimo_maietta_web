import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Versione2Footer, Versione2Header } from './Versione2Chrome';
import { ResponsivePhoto } from './ResponsivePhoto';
import { EditorialRule } from './EditorialRule';
import { portfolioCollections, portfolioPhotos } from './collections';
import { SiteMeta } from './SiteMeta';

export default function Versione2ArchivePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selected = portfolioCollections.find((collection) => collection.slug === searchParams.get('tema'));
  const [visible, setVisible] = useState(24);
  const photos = selected?.photos ?? portfolioPhotos;
  useEffect(() => { setVisible(24); }, [selected?.slug]);
  const filter = (theme: string) => {
    const next = new URLSearchParams(searchParams);
    if (theme) next.set('tema', theme); else next.delete('tema');
    setSearchParams(next, { replace: true });
  };

  return (
    <div className="v2-site ed-archive-page">
      <SiteMeta title="Archivio fotografico" description="Esplora tutte le fotografie di Cosimo Maietta per primi piani, sala posa, esterna, bianco e nero, paesaggi e architetture." />
      <Versione2Header />
      <main id="v2-content">
        <section className="ed-archive-opening" id="top">
          <span className="ed-eyebrow">Indice generale / Tutti i percorsi</span>
          <h1>Archivio<br /><em>fotografico.</em></h1>
          <p>Ritratti, studi di luce e storie in esterna. Una lettura completa del lavoro oltre le singole serie.</p>
          <EditorialRule />
        </section>

        <section className="v2-archive-gallery" id="archivio-fotografico" aria-labelledby="archive-heading">
          <header>
            <h2 id="archive-heading">Tutte le fotografie</h2>
            <p>Seleziona un’immagine per aprire la serie completa.</p>
          </header>
          <div className="v2-archive-filters" role="group" aria-label="Filtra l’archivio per tema">
            <button type="button" aria-pressed={!selected} onClick={() => filter('')}>Tutte</button>
            {portfolioCollections.map((collection) => <button type="button" key={collection.slug}
              aria-pressed={selected?.slug === collection.slug} onClick={() => filter(collection.slug)}>{collection.label}</button>)}
          </div>
          <p className="v2-archive-count" role="status">{photos.length} fotografie{selected ? ` / ${selected.label}` : ' / Tutti i percorsi'}</p>
          <div className="v2-contact-sheet v2-contact-sheet-page">
            {photos.slice(0, visible).map((photo, index) => {
              const project = selected ?? portfolioCollections.find((collection) => photo.themes.includes(collection.slug))!;
              return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.6, delay: (index % 6) * 0.04 }}
              >
                <Link to={project.path} className="v2-contact-item">
                  <ResponsivePhoto photo={photo} sizes="(max-width: 600px) 50vw, (max-width: 1100px) 25vw, 16vw" />
                  <span>{photo.title}<ArrowUpRight aria-hidden="true" /></span>
                  <small>{project.label}</small>
                </Link>
              </motion.div>
            ); })}
          </div>
          {visible < photos.length && <button className="v2-load-more" type="button" onClick={() => setVisible((count) => count + 24)}>Mostra altre fotografie <ArrowDown aria-hidden="true" /></button>}
        </section>
      </main>
      <Versione2Footer />
    </div>
  );
}
