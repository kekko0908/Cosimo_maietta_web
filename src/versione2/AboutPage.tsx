import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Versione2Header, Versione2Footer } from "./Versione2Chrome";
import { portfolioCollections } from "./collections";
import { versione2Photos } from "./content";
import { ResponsivePhoto } from "./ResponsivePhoto";
import { EditorialRule } from "./EditorialRule";
import { Interview } from "./Interview";
import { SiteMeta } from "./SiteMeta";

export default function AboutPage() {
  const architecture = portfolioCollections.find(
    (collection) => collection.slug === "cantieri",
  )!.photos[1];
  return (
    <div className="v2-site ed-about-page">
      <SiteMeta
        title="Chi sono"
        description="Fotografia e professione da geometra: uno sguardo sul volto, sulla luce e sui luoghi, con base a Napoli."
        image={`/media/cosimo/${architecture.id}-1080.jpg`}
      />
      <Versione2Header />
      <main id="v2-content">
        <section className="ed-about-opening" aria-labelledby="about-title">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="ed-eyebrow">Chi sono / Una nota personale</span>
            <h1 id="about-title">
              Tra misura
              <br />e <em>istinto.</em>
            </h1>
            <p>
              Geometra per professione.
              <br />
              Fotografo per passione.
            </p>
            <a href="#il-mio-sguardo">
              Il mio sguardo <ArrowDown aria-hidden="true" />
            </a>
          </motion.div>
          <div className="ed-about-images">
            <figure className="ed-about-architecture">
              <ResponsivePhoto
                photo={architecture}
                sizes="(max-width: 700px) 65vw, 30vw"
                priority
              />
              <figcaption>Spazi / dal portfolio</figcaption>
            </figure>
            <figure className="ed-about-portrait">
              <ResponsivePhoto
                photo={versione2Photos.ann03}
                sizes="(max-width: 700px) 45vw, 20vw"
                priority
              />
              <figcaption>Volti / dal portfolio</figcaption>
            </figure>
            <span aria-hidden="true" className="ed-about-slash">
              /
            </span>
          </div>
          <EditorialRule />
        </section>

        <section
          className="ed-about-manifesto"
          id="il-mio-sguardo"
          aria-labelledby="my-gaze-title"
        >
          <span className="ed-eyebrow">Il mio sguardo</span>
          <blockquote id="my-gaze-title">
            “Cerco l’istante in cui un volto
            <br />
            <em>smette di posare.</em>”
          </blockquote>
          <p>
            Fotografo con base a Napoli. Il mio lavoro attraversa ritratto,
            moda, scena e racconto dei luoghi, alternando rigore e intuizione.
          </p>
        </section>

        <div className="ed-about-chapters">
          <section className="ed-about-chapter" aria-labelledby="about-persona">
            <span className="ed-chapter-number" aria-hidden="true">
              01
            </span>
            <h2 id="about-persona">
              Prima
              <br />
              <em>la persona.</em>
            </h2>
            <div>
              <p>
                Il ritratto è il centro della mia ricerca. Mi interessano il
                volto, la luce e la presenza: quello che un gesto o uno sguardo
                riescono a raccontare dentro un’inquadratura.
              </p>
              <p>
                La direzione è precisa ma mai rigida. Lascio spazio alla persona
                e a ciò che accade tra uno scatto e l’altro, cercando un
                equilibrio tra precisione e spontaneità. Il primo piano, il
                profilo e la figura ambientata sono modi diversi di entrare
                nella stessa relazione.
              </p>
            </div>
          </section>
          <section className="ed-about-chapter" aria-labelledby="about-luce">
            <span className="ed-chapter-number" aria-hidden="true">
              02
            </span>
            <h2 id="about-luce">
              Poi,
              <br />
              <em>la luce.</em>
            </h2>
            <div>
              <p>
                In sala posa lavoro sul gesto, sul contrasto e sulla prossimità.
                In esterna il racconto si apre: le persone entrano in relazione
                con lo spazio e con la luce disponibile.
              </p>
              <p>
                Nel bianco e nero la scena si riduce all’essenziale. Nei
                paesaggi il luogo diventa il soggetto: il mare, le architetture
                e i dettagli prendono il posto del volto. Questi percorsi
                raccolgono le diverse parti del mio lavoro fotografico.
              </p>
            </div>
          </section>
          <section
            className="ed-about-chapter ed-about-work"
            aria-labelledby="about-misura"
          >
            <span className="ed-chapter-number" aria-hidden="true">
              03
            </span>
            <h2 id="about-misura">
              La misura
              <br />
              <em>dei luoghi.</em>
            </h2>
            <div>
              <p>
                La mia professione è quella di geometra. Nel portfolio ho scelto
                di dare spazio anche a questa parte della mia attività, accanto
                alla passione per la fotografia.
              </p>
              <p>
                Forme, materiali e proporzioni offrono un altro punto di
                osservazione. La pagina dedicata ai cantieri mette in relazione
                il lavoro, gli spazi e le immagini, mantenendo distinto il
                percorso professionale da quello fotografico.
              </p>
              <Link to="/geometra/cantieri">
                Esplora il percorso geometra <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
          </section>
        </div>

        <Interview />
        <section className="ed-about-ending" aria-labelledby="about-together">
          <span className="ed-eyebrow">Commissioni e collaborazioni</span>
          <h2 id="about-together">
            Un progetto,
            <br />
            <em>costruito insieme.</em>
          </h2>
          <div>
            <p>
              Ogni incarico parte da un confronto: obiettivo, linguaggio,
              destinazione delle immagini. La produzione prende forma attorno al
              progetto.
            </p>
            <Link to="/#contatti">
              Racconta il progetto <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <Versione2Footer />
    </div>
  );
}
