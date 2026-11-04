import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { versione2Socials } from './content';

export function Versione2Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isArchive = location.pathname === '/archivio';
  const sectionHref = (section: string) => isHome ? `#${section}` : `/#${section}`;

  return (
    <header className="v2-header">
      <a className="v2-skip-link" href="#v2-content">Vai al contenuto</a>
      <Link className="v2-wordmark" to="/" aria-label="Cosimo Maietta, torna all'inizio">
        Cosimo Maietta
      </Link>
      <button
        className="v2-menu-button"
        type="button"
        aria-label={open ? 'Chiudi menu' : 'Apri menu'}
        aria-expanded={open}
        aria-controls="v2-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      <nav id="v2-navigation" className={`v2-nav ${open ? 'is-open' : ''}`} aria-label="Navigazione principale">
        <a href={sectionHref('lavori')} onClick={() => setOpen(false)}>Lavori</a>
        <Link className={isArchive ? 'is-active' : ''} aria-current={isArchive ? 'page' : undefined} to={{ pathname: '/archivio', search: location.search }} onClick={() => setOpen(false)}>Archivio</Link>
        <a href={sectionHref('profilo')} onClick={() => setOpen(false)}>Profilo</a>
        <a href={sectionHref('servizi')} onClick={() => setOpen(false)}>Servizi</a>
        <a href={sectionHref('contatti')} onClick={() => setOpen(false)}>Contatti</a>
      </nav>
      <span className="v2-header-place">Napoli · IT</span>
    </header>
  );
}

export function Versione2Footer() {
  return (
    <footer className="v2-footer">
      <div className="v2-footer-lead">
        <div>
          <span className="v2-footer-eyebrow">Cosimo Maietta / Fotografia</span>
          <p>Ogni storia inizia<br /><em>da uno sguardo.</em></p>
        </div>
        <p className="v2-footer-description">Ritratti, moda e storie visive. A Napoli e ovunque il progetto prenda forma.</p>
      </div>

      <div className="v2-footer-name" aria-label="Cosimo Maietta">
        Cosimo <em>Maietta</em>
      </div>

      <div className="v2-footer-bottom">
        <div className="v2-footer-groups">
          <nav aria-label="Esplora il sito">
            <span>Esplora</span>
            <Link to="/">Home</Link>
            <a href="/#lavori">Lavori</a>
            <Link to="/archivio">Archivio</Link>
            <a href="/#profilo">Profilo</a>
            <a href="/#servizi">Servizi</a>
          </nav>
          <nav aria-label="Contatti">
            <span>Contatti</span>
            <a href="/#contatti">Modulo contatti</a>
            <a href={versione2Socials[0].href} target="_blank" rel="noreferrer">Scrivi su Instagram</a>
            <span className="v2-footer-location">Napoli, Italia</span>
          </nav>
          <nav aria-label="Canali social">
            <span>Social</span>
            {versione2Socials.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer">{social.label}</a>
            ))}
          </nav>
        </div>
        <div className="v2-footer-legal">
          <span>© {new Date().getFullYear()} Cosimo Maietta</span>
          <span>Fotografia / Napoli</span>
        </div>
      </div>
    </footer>
  );
}
