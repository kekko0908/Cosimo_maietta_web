import { useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import { motion } from "motion/react";
import { ResponsivePhoto } from "./ResponsivePhoto";
import type { Versione2Photo } from "./content";

// Five photographs open the story; subsequent images form a compact contact sheet.
export function CollectionGallery({
  photos,
  label,
  onOpen,
}: {
  photos: Versione2Photo[];
  label: string;
  onOpen: (index: number) => void;
}) {
  const [visible, setVisible] = useState(24);
  const remaining = photos.slice(5);
  return (
    <>
      <section
        className="ed-selection"
        id="selezione"
        aria-labelledby="selection-title"
      >
        <header className="ed-section-label">
          <h2 id="selection-title">La selezione</h2>
          <span>
            01 — {String(Math.min(5, photos.length)).padStart(2, "0")}
          </span>
        </header>
        <div className="ed-five-spread">
          {photos.slice(1, 5).map((photo, index) => (
            <motion.figure
              key={photo.id}
              className={`ed-selected-photo ed-selected-${index + 2}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.65 }}
            >
              <button
                type="button"
                onClick={() => onOpen(index + 1)}
                aria-label={`Apri ${photo.title} a schermo intero`}
              >
                <ResponsivePhoto
                  photo={photo}
                  sizes="(max-width: 650px) 80vw, 35vw"
                />
                <Plus className="ed-photo-open" aria-hidden="true" />
              </button>
              <figcaption>
                <span className="ed-photo-folio">
                  {String(index + 2).padStart(2, "0")}
                </span>
                <span>{photo.title}</span>
              </figcaption>
            </motion.figure>
          ))}
          <div className="ed-spread-margin" aria-hidden="true">
            <span>{label}</span>
            <i />
          </div>
        </div>
      </section>
      {remaining.length > 0 && (
        <section
          className="ed-contact-archive"
          id="fotografie"
          aria-labelledby="contact-archive-title"
        >
          <header className="ed-archive-heading">
            <div>
              <span className="ed-eyebrow">La serie continua</span>
              <h2 id="contact-archive-title">Altre immagini.</h2>
            </div>
            <p>
              {remaining.length} fotografie da esplorare.
              <br />
              Apri uno scatto per guardarlo da vicino.
            </p>
          </header>
          <div className="ed-contact-grid">
            {remaining.slice(0, visible).map((photo, index) => (
              <figure key={photo.id} className="ed-contact-photo">
                <button
                  type="button"
                  onClick={() => onOpen(index + 5)}
                  aria-label={`Apri ${photo.title} a schermo intero`}
                >
                  <ResponsivePhoto
                    photo={photo}
                    sizes="(max-width: 650px) 28vw, (max-width: 1000px) 22vw, 15vw"
                  />
                  <ArrowUpRight aria-hidden="true" />
                </button>
                <figcaption>
                  <span>{String(index + 6).padStart(2, "0")}</span>
                  <span>{photo.title}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          {visible < remaining.length && (
            <button
              type="button"
              className="ed-more-images"
              onClick={() => setVisible((count) => count + 24)}
            >
              Mostra altre {Math.min(24, remaining.length - visible)} immagini{" "}
              <Plus aria-hidden="true" />
            </button>
          )}
          <div className="ed-archive-end">
            <span>
              {Math.min(visible, remaining.length) + 5} / {photos.length}
            </span>
            <span>Fine della selezione caricata</span>
          </div>
        </section>
      )}
    </>
  );
}
