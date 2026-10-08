import { motion } from 'motion/react';

export function FeaturedArtist() {
  return (
    <section className="py-32 bg-stone-200 text-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-neutral-500 mb-4 block">Artista in Evidenza</span>
          <h2 className="font-serif text-5xl md:text-7xl mb-8 leading-tight">
            Elena <br/><span className="italic text-neutral-400">Vance</span>
          </h2>
          <p className="font-serif text-lg leading-relaxed text-neutral-600 mb-8 max-w-md">
            "Il mio lavoro esplora il silenzio tra i pensieri, gli spazi vuoti dove la realtà si dissolve in pura emozione."
          </p>
          <button className="px-8 py-3 border border-black hover:bg-black hover:text-white transition-all duration-300 font-sans text-xs tracking-widest uppercase">
            Scopri la Collezione
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative aspect-square lg:aspect-[4/5]"
        >
          <div className="absolute inset-0 bg-stone-300 -rotate-3 z-0" />
          <img 
            src="https://images.unsplash.com/photo-1581337204873-ef36aa186caa?q=80&w=1000&auto=format&fit=crop" 
            alt="Elena Vance in studio" 
            className="absolute inset-0 w-full h-full object-cover z-10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
          />
        </motion.div>
      </div>
    </section>
  );
}
