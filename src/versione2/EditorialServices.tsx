import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Plus } from "lucide-react";
import { versione2Photos, versione2Services } from "./content";
import { ResponsivePhoto } from "./ResponsivePhoto";
import { EditorialRule } from "./EditorialRule";

const photos = [
  versione2Photos.ann02,
  versione2Photos.cricri01,
  versione2Photos.sea,
];

export function EditorialServices() {
  const [active, setActive] = useState<number | null>(0);
  const reduced = useReducedMotion();
  return (
    <section
      className="ed-services"
      id="servizi"
      aria-labelledby="ed-services-title"
    >
      <EditorialRule />
      <header className="ed-services-heading">
        <span className="ed-eyebrow">Ambiti di lavoro</span>
        <h2 id="ed-services-title">
          Una visione,
          <br />
          <em>costruita insieme.</em>
        </h2>
        <p>
          Ogni incarico parte da un confronto: obiettivo, linguaggio,
          destinazione delle immagini.
        </p>
      </header>
      <div className="ed-service-folds">
        {versione2Services.map((service, index) => (
          <article
            key={service.index}
            className={`ed-service-fold ${active === index ? "is-active" : ""}`}
          >
            <h3>
              <button
                type="button"
                aria-expanded={active === index}
                aria-controls={`service-panel-${index}`}
                onClick={() => setActive(active === index ? null : index)}
              >
                <span className="ed-service-number" aria-hidden="true">
                  {service.index}
                </span>
                <span>{service.title}</span>
                <Plus aria-hidden="true" />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {active === index && (
                <motion.div
                  id={`service-panel-${index}`}
                  className="ed-service-panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: reduced ? 0 : 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="ed-service-panel-inner">
                    <ResponsivePhoto
                      photo={photos[index]}
                      sizes="(max-width: 700px) 70vw, 30vw"
                    />
                    <div>
                      <p>{service.copy}</p>
                      <ul aria-label={`Ambiti ${service.title}`}>
                        {service.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                      <a href="#contatti">
                        Racconta il progetto <ArrowUpRight aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </article>
        ))}
      </div>
    </section>
  );
}
