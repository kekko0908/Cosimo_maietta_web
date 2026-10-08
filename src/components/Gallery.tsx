import { motion, AnimatePresence } from 'motion/react';
import { ARTWORKS, Artwork } from '../lib/utils';
import { useState, useMemo } from 'react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { GeometricDivider } from './GeometricDivider';

export function Gallery() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'Oil' | 'Acrylic' | 'Mixed Media' | 'Digital'>('all');

  const filteredArtworks = useMemo(() => {
    if (filter === 'all') return ARTWORKS;
    return ARTWORKS.filter(art => art.medium.includes(filter));
  }, [filter]);

  return (
    <section className="py-24 px-8 md:px-16 bg-neutral-900 text-white min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center"
      >
        <h2 className="text-4xl md:text-6xl font-serif italic mb-4">La Collezione</h2>
        <div className="w-full flex justify-center my-8">
           <GeometricDivider />
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 font-sans text-xs tracking-widest uppercase text-white/60">
          {['all', 'Oil', 'Acrylic', 'Mixed Media', 'Digital'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`pb-1 border-b transition-colors ${filter === f ? 'text-white border-white' : 'border-transparent hover:text-white'}`}
            >
              {f === 'all' ? 'Tutti' : f}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
      >
        <AnimatePresence>
          {filteredArtworks.map((art, index) => (
            <ArtworkCard 
              key={art.id} 
              artwork={art} 
              index={index} 
              isHovered={hoveredId === art.id}
              onHover={setHoveredId}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

interface ArtworkCardProps {
  artwork: Artwork;
  index: number;
  isHovered: boolean;
  onHover: (id: string | null) => void;
}

const ArtworkCard: FC<ArtworkCardProps> = ({ artwork, index, isHovered, onHover }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.8 }}
      className="group relative cursor-pointer"
      onMouseEnter={() => onHover(artwork.id)}
      onMouseLeave={() => onHover(null)}
    >
      <Link to={`/opera/${artwork.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-800">
          <motion.img
            src={artwork.image}
            alt={artwork.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out"
            style={{ scale: isHovered ? 1.05 : 1 }}
          />
          
          {/* Overlay on hover */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/40 flex items-center justify-center p-6 text-center"
          >
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <p className="font-serif text-2xl italic mb-2">{artwork.title}</p>
              <p className="font-sans text-xs tracking-widest uppercase text-white/70 mb-4">{artwork.artist}</p>
              <span className="px-6 py-2 border border-white/30 hover:bg-white hover:text-black transition-colors font-sans text-xs tracking-widest uppercase inline-block">
                Vedi Dettagli
              </span>
            </div>
          </motion.div>
        </div>

        <div className="mt-4 flex justify-between items-end opacity-70 group-hover:opacity-100 transition-opacity duration-500">
          <div>
            <h3 className="font-serif text-lg leading-tight">{artwork.title}</h3>
            <p className="text-xs font-sans text-white/50 mt-1">{artwork.year}</p>
          </div>
          <p className="font-mono text-sm">€{artwork.price}</p>
        </div>
      </Link>
    </motion.div>
  );
}
