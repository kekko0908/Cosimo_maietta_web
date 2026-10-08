import { useEffect } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Versione2Footer, Versione2Header } from './Versione2Chrome';
import { ResponsivePhoto } from './ResponsivePhoto';
import { versione2Photos, versione2Projects } from './content';
import './versione2.css';

const archiveItems = versione2Projects.flatMap((project) =>
  project.photos.map((photo) => ({ photo, project })),
);

export default function Versione2ArchivePage() {
  useEffect(() => {
    document.title = 'Archivio — Cosimo Maietta';
  }, []);

  return (
    <div className="v2-site v2-archive-page">
      <Versione2Header />
      <main id="v2-content">
        <section className="v2-archive-page-hero" id="top">
          <motion.div
            className="v2-archive-page-title"
            initial={{ opacity: 0, y: 38 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1>Cosimo<br /><em>Maietta</em></h1>
          </motion.div>
          <div className="v2-archive-page-collage" aria-label="Anteprima dell’archivio">
            <motion.div className="v2-archive-collage-main" initial={{ clipPath: 'inset(0 100% 0 0)' }} animate={{ clipPath: 'inset(0 0% 0 0)' }} transition={{ duration: 1.05, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
              <ResponsivePhoto photo={versione2Photos.ann03} sizes="(max-width: 760px) 76vw, 34vw" priority />
            </motion.div>
            <motion.div className="v2-archive-collage-landscape" initial={{ opacity: 0, x: 42 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.85, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}>
              <ResponsivePhoto photo={versione2Photos.eyes02} sizes="(max-width: 760px) 58vw, 25vw" priority />
            </motion.div>
            <motion.div className="v2-archive-collage-small" initial={{ opacity: 0, y: 42 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}>
              <ResponsivePhoto photo={versione2Photos.cricri04} sizes="(max-width: 760px) 34vw, 13vw" priority />
            </motion.div>
          </div>
          <div className="v2-archive-page-note">
            <p>Ritratti, studi di luce e storie in esterna. Una lettura completa del lavoro oltre le singole serie.</p>
            <a href="#archivio-fotografico">Esplora tutte le immagini <ArrowDown aria-hidden="true" /></a>
          </div>
        </section>

        <section className="v2-archive-gallery" id="archivio-fotografico" aria-labelledby="archive-heading">
          <header>
            <h2 id="archive-heading">Tutte le fotografie</h2>
            <p>Seleziona un’immagine per aprire la serie completa.</p>
          </header>
          <div className="v2-contact-sheet v2-contact-sheet-page">
            {archiveItems.map(({ photo, project }, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.6, delay: (index % 6) * 0.04 }}
              >
                <Link to={`/versione2/progetti/${project.slug}`} className="v2-contact-item">
                  <ResponsivePhoto photo={photo} sizes="(max-width: 600px) 50vw, (max-width: 1100px) 25vw, 16vw" />
                  <span>{photo.title}<ArrowUpRight aria-hidden="true" /></span>
                  <small>{project.title}</small>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Versione2Footer />
    </div>
  );
}
