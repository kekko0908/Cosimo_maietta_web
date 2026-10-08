import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ARTISTS, ARTWORKS } from '../lib/utils';
import { PageReveal } from './PageTransition';
import { ArrowLeft } from 'lucide-react';
import { cn } from '../lib/utils';

export function ArtistDetails() {
  const { id } = useParams<{ id: string }>();
  const artist = ARTISTS.find(a => a.id === id);
  const [activeTab, setActiveTab] = useState<'collections' | 'artworks'>('collections');

  if (!artist) {
    return <div className="text-center py-32 text-white">Artista non trovato</div>;
  }

  const artistWorks = ARTWORKS.filter(work => work.artist === artist.name);
  const hasCollections = artist.collections && artist.collections.length > 0;

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <PageReveal />

      {/* Hero */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-neutral-900 animate-pulse" />
        <img 
          src={artist.coverImage} 
          alt={artist.name} 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <Link to="/artisti" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors font-sans text-xs tracking-widest uppercase">
            <ArrowLeft size={16} /> Torna agli Artisti
          </Link>
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-9xl font-serif leading-none"
          >
            {artist.name}
          </motion.h1>
          <div className="flex gap-6 mt-6 font-sans text-sm tracking-widest uppercase text-white/80">
            <span>{artist.location}</span>
            <span>•</span>
            <span>{artist.category}</span>
          </div>
        </div>
      </div>

      {/* Bio */}
      <section className="py-24 px-8 md:px-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="relative aspect-square md:aspect-[3/4] overflow-hidden">
           <img 
             src={artist.avatar} 
             alt={artist.name} 
             className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
           />
        </div>
        <div>
          <h2 className="text-4xl font-serif mb-8 italic text-neutral-400">Biografia</h2>
          <p className="text-xl leading-relaxed font-serif text-white/80">
            {artist.bio}
          </p>
          <p className="mt-8 text-neutral-500 font-sans text-sm leading-loose">
            L'arte di {artist.name} rappresenta un ponte tra tradizione e innovazione. 
            Ogni opera è un invito a esplorare nuove dimensioni emotive e concettuali.
          </p>
        </div>
      </section>

      {/* Navigation Tabs */}
      {hasCollections && (
        <div className="sticky top-[60px] z-30 bg-neutral-950/80 backdrop-blur-md border-y border-white/10 mb-16">
          <div className="max-w-7xl mx-auto px-8 md:px-16 flex justify-center">
            <button
              onClick={() => setActiveTab('collections')}
              className={cn(
                "px-8 py-6 font-sans text-xs tracking-widest uppercase transition-colors relative",
                activeTab === 'collections' ? "text-white" : "text-neutral-500 hover:text-white"
              )}
            >
              Collezioni
              {activeTab === 'collections' && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-white"
                />
              )}
            </button>
            <div className="w-px bg-white/10" />
            <button
              onClick={() => setActiveTab('artworks')}
              className={cn(
                "px-8 py-6 font-sans text-xs tracking-widest uppercase transition-colors relative",
                activeTab === 'artworks' ? "text-white" : "text-neutral-500 hover:text-white"
              )}
            >
              Tutte le Opere
              {activeTab === 'artworks' && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-white"
                />
              )}
            </button>
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="bg-neutral-900 min-h-[50vh]">
        <AnimatePresence mode="wait">
          {activeTab === 'collections' && hasCollections ? (
            <motion.div
              key="collections"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {artist.collections?.map((collection) => {
                const collectionWorks = artistWorks.filter(w => w.collectionId === collection.id);
                if (collectionWorks.length === 0) return null;

                return (
                  <section key={collection.id} className="py-24 border-b border-white/5 last:border-0">
                    <div className="px-8 md:px-16 max-w-7xl mx-auto mb-16">
                      <div className="flex flex-col md:flex-row gap-12 items-end">
                        <div className="flex-1">
                          <span className="font-sans text-xs tracking-widest uppercase text-neutral-500 mb-4 block">Collezione</span>
                          <h2 className="text-5xl md:text-7xl font-serif mb-6">{collection.title}</h2>
                          <p className="text-xl text-neutral-400 font-serif leading-relaxed max-w-2xl">
                            {collection.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="px-8 md:px-16">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {collectionWorks.map((work) => (
                          // @ts-ignore
                          <ArtworkCard key={work.id} work={work} />
                        ))}
                      </div>
                    </div>
                  </section>
                );
              })}
              
              {/* Show 'Other Works' if any exist outside collections */}
              {(() => {
                const collectionIds = artist.collections?.map(c => c.id) || [];
                const otherWorks = artistWorks.filter(w => !w.collectionId || !collectionIds.includes(w.collectionId));
                
                if (otherWorks.length === 0) return null;

                return (
                  <section className="py-24 px-8 md:px-16">
                    <h2 className="text-4xl md:text-6xl font-serif mb-16 text-center">Altre Opere</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {otherWorks.map((work) => (
                        // @ts-ignore
                        <ArtworkCard key={work.id} work={work} />
                      ))}
                    </div>
                  </section>
                );
              })()}
            </motion.div>
          ) : (
            <motion.div
              key="artworks"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="py-24 px-8 md:px-16"
            >
              <h2 className="text-4xl md:text-6xl font-serif mb-16 text-center">Tutte le Opere</h2>
              {artistWorks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {artistWorks.map((work) => (
                    // @ts-ignore
                    <ArtworkCard key={work.id} work={work} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 text-neutral-500 font-serif">
                  Nessuna opera disponibile al momento.
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ArtworkCard({ work }: { work: any }) {
  return (
    <Link to={`/opera/${work.id}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden mb-4 bg-neutral-800">
        <img 
          src={work.image} 
          alt={work.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="border border-white px-6 py-2 text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-colors">
            Vedi Opera
          </span>
        </div>
      </div>
      <h3 className="text-xl font-serif italic">{work.title}</h3>
      <p className="text-neutral-500 text-xs font-sans tracking-widest mt-1">{work.year} • {work.medium}</p>
    </Link>
  );
}
