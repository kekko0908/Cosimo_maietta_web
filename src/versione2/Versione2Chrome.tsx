import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { versione2Socials } from './content';

export function Versione2Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/versione2';
  const isArchive = location.pathname === '/versione2/archivio';
  const sectionHref = (section: string) => isHome ? `#${section}` : `/versione2#${section}`;

  return (
    <header className="v2-header">
      <a className="v2-skip-link" href="#v2-content">Vai al contenuto</a>
      <Link className="v2-wordmark" to="/versione2" aria-label="Cosimo Maietta, torna all'inizio">
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
      <nav id="v2-navigation" className={`v2-nav ${open ? 'is-open' : ''}`} aria-label="Navigazione Versione 2">
        <a href={sectionHref('lavori')} onClick={() => setOpen(false)}>Lavori</a>
        <Link className={isArchive ? 'is-active' : ''} aria-current={isArchive ? 'page' : undefined} to="/versione2/archivio" onClick={() => setOpen(false)}>Archivio</Link>
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
        <p>Costruiamo il prossimo<br /><em>racconto visivo.</em></p>
        <a href={versione2Socials[0].href} target="_blank" rel="noreferrer">
          Inizia una conversazione <ArrowUpRight aria-hidden="true" />
        </a>
      </div>

      <div className="v2-footer-name" aria-label="Cosimo Maietta">
        Cosimo <em>Maietta</em>
      </div>

      <div className="v2-footer-bottom">
        <div className="v2-footer-groups">
          <nav aria-label="Esplora il sito">
            <span>Esplora</span>
            <Link to="/versione2">Home</Link>
            <a href="/versione2#lavori">Lavori</a>
            <Link to="/versione2/archivio">Archivio</Link>
            <a href="/versione2#profilo">Profilo</a>
          </nav>
          <nav aria-label="Canali social">
            <span>Social</span>
            {versione2Socials.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer">{social.label}</a>
            ))}
          </nav>
          <nav aria-label="Informazioni legali">
            <span>Legale</span>
            <Link to="/privacy-policy">Privacy</Link>
            <Link to="/cookie-policy">Cookie</Link>
            <Link to="/termini-e-condizioni">Termini</Link>
          </nav>
        </div>
        <a className="v2-footer-top" href="#top">Torna su <ArrowUpRight aria-hidden="true" /></a>
      </div>
    </footer>
  );
}
