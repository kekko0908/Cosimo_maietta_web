import { motion } from 'motion/react';
import { Signature } from './Signature';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-black text-white py-24 px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-3xl font-serif mb-6">L'Arte Viva</h2>
          <p className="text-white/50 max-w-sm font-sans text-sm leading-relaxed mb-6">
            Un santuario digitale per l'arte contemporanea. Crediamo che la piattaforma stessa debba essere curata tanto quanto le opere che espone.
          </p>
          <Signature />
        </div>
        
        <div>
          <h3 className="font-sans text-xs tracking-widest uppercase text-white/40 mb-6">Navigazione</h3>
          <ul className="space-y-4 font-serif text-lg text-white/80">
            <li><Link to="/" className="hover:text-white transition-colors">Galleria</Link></li>
            <li><Link to="/artisti" className="hover:text-white transition-colors">Artisti</Link></li>
            <li><Link to="/mostre" className="hover:text-white transition-colors">Mostre</Link></li>
            <li><Link to="/contatti" className="hover:text-white transition-colors">Contatti</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-sans text-xs tracking-widest uppercase text-white/40 mb-6">Legale</h3>
          <ul className="space-y-4 font-serif text-lg text-white/80">
            <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link></li>
            <li><Link to="/termini-e-condizioni" className="hover:text-white transition-colors">Termini e Condizioni</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-white/30 font-sans uppercase tracking-widest">
        <p>&copy; 2024 L'Arte Viva S.r.l. - P.IVA 12345678901 - Via dei Mille, 60, Napoli</p>
        <p>Progettato con Passione</p>
      </div>
    </footer>
  );
}
