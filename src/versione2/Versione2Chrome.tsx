import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { versione2Socials } from "./content";
import { portfolioCollections } from "./collections";
import { siteConfig } from "./siteConfig";
import { AmbientSound } from "./AmbientSound";
import { EditorialRule } from "./EditorialRule";
import { ArrowUpRight } from "lucide-react";
import "./versione2.css";
import "./portfolio.css";
import "./editorial.css";

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
    <footer className="ed-colophon">
      <EditorialRule />
      <div className="ed-colophon-top">
        <span>Portfolio fotografico</span>
        <span>Napoli / Italia</span>
        <span>Colophon</span>
      </div>
      <div className="ed-colophon-body">
        <div className="ed-colophon-title">
          <h2>
            Indice <em>&</em>
            <br />
            contatti.
          </h2>
          <p>
            Ritratti, moda e storie visive. A Napoli e ovunque il progetto
            prenda forma.
          </p>
        </div>
        <nav className="ed-colophon-index" aria-label="Percorsi del portfolio">
          {portfolioCollections.map((collection) => (
            <Link key={collection.slug} to={collection.path}>
              <span>{collection.label}</span>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          ))}
        </nav>
        <div className="ed-colophon-notes">
          <nav aria-label="Esplora il sito">
            <Link to="/chi-sono">Chi sono</Link>
            <Link to="/archivio">Archivio completo</Link>
            <a href="/#contatti">
              Scrivi un messaggio <ArrowUpRight aria-hidden="true" />
            </a>
          </nav>
          <nav aria-label="Canali social">
            {versione2Socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
              >
                {social.label}
              </a>
            ))}
          </nav>
          <nav aria-label="Piattaforme di lavoro">
            {siteConfig.professionalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
      <div className="ed-colophon-bottom">
        <span>© {new Date().getFullYear()} / Fotografie dell’autore</span>
        <Link to="/privacy">Privacy e contatti</Link>
        <AmbientSound />
      </div>
    </footer>
  );
}
