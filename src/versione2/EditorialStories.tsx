import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { portfolioCollections } from "./collections";
import { ResponsivePhoto } from "./ResponsivePhoto";
import { EditorialRule } from "./EditorialRule";

export function EditorialStories() {
  const { search } = useLocation();
  return (
    <section
      className="ed-stories"
      id="lavori"
      aria-labelledby="ed-stories-title"
    >
      <header>
        <span className="ed-eyebrow">Selected stories</span>
        <h2 id="ed-stories-title">
          Sei modi
          <br />
          <em>di guardare.</em>
        </h2>
        <Link to="/archivio">
          Archivio completo <ArrowUpRight aria-hidden="true" />
        </Link>
      </header>
      <div className="ed-story-spread">
        {portfolioCollections.map((collection, index) => (
          <motion.article
            key={collection.slug}
            className={`ed-story-entry ed-story-entry-${index + 1}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.7 }}
          >
            <Link
              to={`${collection.path}${search}`}
              aria-label={`Apri ${collection.title}`}
            >
              <div className="ed-story-cover">
                <span>{collection.index}</span>
                <ResponsivePhoto
                  photo={collection.photos[0]}
                  sizes="(max-width: 700px) 80vw, 40vw"
                />
                <ArrowUpRight aria-hidden="true" />
              </div>
              <div className="ed-story-text">
                <span className="ed-eyebrow">{collection.label}</span>
                <h3>{collection.title}</h3>
                <p>{collection.description}</p>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
      <EditorialRule />
    </section>
  );
}
