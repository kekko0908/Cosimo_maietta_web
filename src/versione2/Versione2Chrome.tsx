import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { versione2Photos, versione2Socials } from "./content";
import { portfolioCollections } from "./collections";
import { siteConfig } from "./siteConfig";
import { AmbientSound } from "./AmbientSound";
import { ResponsivePhoto } from "./ResponsivePhoto";
import { ArrowUpRight } from "lucide-react";
import "./versione2.css";
import "./portfolio.css";
import "./editorial.css";
import "./portfolio-refinements.css";

export function Versione2Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isArchive = location.pathname === "/archivio";
  const sectionHref = (section: string) =>
    isHome ? `#${section}` : `/#${section}`;
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);

  return (
    <header className="v2-header">
      <a className="v2-skip-link" href="#v2-content">
        Vai al contenuto
      </a>
      <Link className="v2-wordmark" to="/" aria-label="Torna alla home">
        <img src="/logo-cm.svg" alt="" width="28" height="28" />
        {isHome ? "Cosimo Maietta" : "Fotografia / Portfolio"}
      </Link>
      <button
        ref={menuButton}
        className="v2-menu-button"
        type="button"
        aria-label={open ? "Chiudi menu" : "Apri menu"}
        aria-expanded={open}
        aria-controls="v2-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      <nav
        id="v2-navigation"
        className={`v2-nav ${open ? "is-open" : ""}`}
        aria-label="Navigazione principale"
      >
        <a href={sectionHref("lavori")} onClick={() => setOpen(false)}>
          Lavori
        </a>
        <Link
          className={isArchive ? "is-active" : ""}
          aria-current={isArchive ? "page" : undefined}
          to={{ pathname: "/archivio", search: location.search }}
          onClick={() => setOpen(false)}
        >
          Archivio
        </Link>
        <Link
          to="/chi-sono"
          onClick={() => setOpen(false)}
          aria-current={location.pathname === "/chi-sono" ? "page" : undefined}
        >
          Chi sono
        </Link>
        <a href={sectionHref("servizi")} onClick={() => setOpen(false)}>
          Servizi
        </a>
        <Link
          to="/geometra/cantieri"
          onClick={() => setOpen(false)}
          aria-current={
            location.pathname === "/geometra/cantieri" ? "page" : undefined
          }
        >
          Geometra
        </Link>
        <a href={sectionHref("contatti")} onClick={() => setOpen(false)}>
          Contatti
        </a>
      </nav>
      <span className="v2-header-place">Napoli · IT</span>
    </header>
  );
}

export function Versione2Footer() {
  return (
    <footer className="ed-closing">
      <div className="ed-closing-inner">
        <div className="ed-closing-masthead">
          <span>Fotografia / Napoli</span>
          <span>Portfolio & contatti</span>
        </div>
        <div className="ed-closing-spread">
          <figure className="ed-closing-photo">
            <ResponsivePhoto
              photo={versione2Photos.eyes01}
              sizes="(max-width: 700px) 38vw, 260px"
            />
            <figcaption>Dal portfolio / Eyes I</figcaption>
          </figure>
          <div className="ed-closing-statement">
            <h2>
              Ritratti, moda
              <br />e <em>storie visive.</em>
            </h2>
            <p>A Napoli e ovunque il progetto prenda forma.</p>
          </div>
          <span className="ed-closing-slash" aria-hidden="true">
            /
          </span>
        </div>
        <div className="ed-closing-directory">
          <nav aria-label="Esplora il sito">
            <span>Esplora</span>
            <Link to="/archivio">
              Archivio fotografico <ArrowUpRight aria-hidden="true" />
            </Link>
            <Link to="/chi-sono">
              Chi sono <ArrowUpRight aria-hidden="true" />
            </Link>
            <a href="/#contatti">
              Contatti <ArrowUpRight aria-hidden="true" />
            </a>
          </nav>
          <nav aria-label="Percorsi del portfolio">
            <span>Le serie</span>
            <div className="ed-closing-series">
              {portfolioCollections.map((collection) => (
                <Link key={collection.slug} to={collection.path}>
                  {collection.label}
                </Link>
              ))}
            </div>
          </nav>
          <nav aria-label="Canali social">
            <span>Altrove</span>
            {versione2Socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
              >
                {social.label} <ArrowUpRight aria-hidden="true" />
              </a>
            ))}
          </nav>
          <nav aria-label="Piattaforme di lavoro">
            <span>Professione</span>
            {siteConfig.professionalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
                {link.label} <ArrowUpRight aria-hidden="true" />
              </a>
            ))}
          </nav>
        </div>
        <div className="ed-closing-bottom">
          <span>© {new Date().getFullYear()} / Fotografie dell’autore</span>
          <Link to="/privacy">Privacy e contatti</Link>
          <AmbientSound />
        </div>
      </div>
    </footer>
  );
}
