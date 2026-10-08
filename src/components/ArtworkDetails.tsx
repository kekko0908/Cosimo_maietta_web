import { useParams, Link } from 'react-router-dom';
import { ARTWORKS } from '../lib/utils';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PageReveal } from './PageTransition';

export function ArtworkDetails() {
  const { id } = useParams();
  const artwork = ARTWORKS.find(a => a.id === id);
  const { addToCart } = useCart();

  if (!artwork) {
    return <div className="min-h-screen flex items-center justify-center text-white">Opera non trovata</div>;
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-32 pb-20 px-8">
      <PageReveal />
      <Link to="/" className="inline-flex items-center text-white/60 hover:text-white transition-colors mb-12 uppercase text-xs tracking-widest">
        <ArrowLeft size={16} className="mr-2" /> Torna alla Galleria
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[3/4] bg-neutral-900 overflow-hidden"
        >
          <img 
            src={artwork.image} 
            alt={artwork.title} 
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col justify-center"
        >
          <h1 className="text-5xl md:text-7xl font-serif italic mb-4">{artwork.title}</h1>
          <p className="text-xl font-sans tracking-widest uppercase text-white/60 mb-8">{artwork.artist}</p>
          
          <div className="w-24 h-[1px] bg-white/20 mb-8" />

          <p className="text-lg leading-relaxed text-white/80 mb-12 font-serif">
            {artwork.description}
          </p>

          <div className="grid grid-cols-2 gap-8 mb-12 text-sm font-sans tracking-wide text-white/60">
            <div>
              <p className="uppercase text-xs text-white/40 mb-1">Anno</p>
              <p className="text-white">{artwork.year}</p>
            </div>
            <div>
              <p className="uppercase text-xs text-white/40 mb-1">Tecnica</p>
              <p className="text-white">{artwork.medium}</p>
            </div>
            <div>
              <p className="uppercase text-xs text-white/40 mb-1">Dimensioni</p>
              <p className="text-white">{artwork.dimensions}</p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-auto pt-8 border-t border-white/10">
            <p className="text-3xl font-mono">€{artwork.price}</p>
            <button 
              onClick={() => addToCart(artwork)}
              className="bg-white text-black px-8 py-4 uppercase tracking-widest text-xs hover:bg-neutral-200 transition-colors"
            >
              Aggiungi al Carrello
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
