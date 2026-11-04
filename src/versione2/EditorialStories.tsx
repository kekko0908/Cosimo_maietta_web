import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { portfolioCollections } from "./collections";
import { ResponsivePhoto } from "./ResponsivePhoto";

// Restore the layered photographic Stories composition selected by the user.
export function EditorialStories() {
  const { search } = useLocation();
  return (
    <section className="v2-works v2-works-stories" id="lavori">
      <div className="v2-section-heading v2-section-heading-dark v2-stories-heading">
        <span>Selected stories</span>
        <h2>Sei modi di guardare.</h2>
      </div>
      <div className="v2-story-panels">
        {portfolioCollections.map((project, index) => (
          <motion.article
            key={project.slug}
            className={`v2-story-panel story-${index + 1}`}
            initial={{ opacity: 0, y: 72 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.16 }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to={`${project.path}${search}`}
              aria-label={`Apri ${project.title}`}
            >
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
                    initial={{
                      opacity: 0,
                      y: 52 + photoIndex * 18,
                      scale: 1.035,
                    }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 1,
                      delay: photoIndex * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <ResponsivePhoto
                      photo={photo}
                      sizes="(max-width: 760px) 72vw, 34vw"
                    />
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
