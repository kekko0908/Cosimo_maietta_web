import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from './siteConfig';

export function ProfessionalLinks() {
  return (
    <nav className="v2-professional-links" aria-label="Piattaforme professionali">
      <span>Piattaforme di lavoro</span>
      {siteConfig.professionalLinks.map((link) => (
        <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
          {link.label}
          <ArrowUpRight aria-hidden="true" />
        </a>
      ))}
    </nav>
  );
}
