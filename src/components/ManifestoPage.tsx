import { motion, useTransform, useMotionValue } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { PageReveal } from './PageTransition';
import { ArrowDown } from 'lucide-react';

const PRINCIPLES = [
  {
    title: "Autenticità Radicale",
    desc: "Ogni opera è verificata. Ogni artista è reale. Nessuna copia, nessun compromesso.",
    img: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=2000&auto=format&fit=crop" // Abstract texture
  },
  {
    title: "Curatela Emotiva",
    desc: "Non selezioniamo per trend, ma per impatto. Cerchiamo opere che ti fermino il cuore.",
    img: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=2000&auto=format&fit=crop" // The impactful hero image style
  },
  {
    title: "Eternità Digitale",
    desc: "Il sito è effimero, l'arte è per sempre. Garantiamo la preservazione della bellezza.",
    img: "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=2000&auto=format&fit=crop" // Dark abstract 3d shapes
  }
];

export function ManifestoPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollY = useMotionValue(0);
  const [windowHeight, setWindowHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 0);

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    const handleScroll = () => scrollY.set(window.scrollY);

    // Initial set
    setWindowHeight(window.innerHeight);
    scrollY.set(window.scrollY);

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]);

  // Map scrollY (pixels) to animation values
  // Use a default large value if windowHeight is 0 to avoid invalid range [0, 0]
  const rangeEnd = windowHeight > 0 ? windowHeight * 0.5 : 1000;
  const x1 = useTransform(scrollY, [0, rangeEnd], ["0%", "-50%"]);
  const x2 = useTransform(scrollY, [0, rangeEnd], ["0%", "50%"]);

  return (
    <div ref={containerRef} className="bg-neutral-950 text-white relative">
      <PageReveal />
      
      {/* Fixed Background with Grain */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20 filter blur-3xl scale-110" />
         <div className="absolute inset-0 bg-neutral-950/50" />
      </div>

      {/* Section 1: Intro */}
      <section className="h-screen flex flex-col items-center justify-center relative z-10 overflow-hidden">
        <motion.div style={{ x: x1 }} className="w-full">
          <h1 className="text-[15vw] leading-none font-serif whitespace-nowrap text-white/10 select-none">
            ARTE VIVA ARTE VIVA
          </h1>
        </motion.div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-6xl md:text-9xl font-serif text-center mix-blend-difference z-20"
          >
            CHI <br /> <span className="italic text-white">SIAMO</span>
          </motion.h1>
        </div>

        <motion.div style={{ x: x2 }} className="w-full">
          <h1 className="text-[15vw] leading-none font-serif whitespace-nowrap text-white/10 select-none text-right">
            ARTE VIVA ARTE VIVA
          </h1>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ArrowDown className="text-white/50" />
        </motion.div>
      </section>

      {/* Section 2: The Vision */}
      <section className="min-h-screen flex items-center justify-center relative z-10 py-32">
        <div className="max-w-4xl px-8 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ margin: "-20%" }}
            className="text-3xl md:text-5xl font-serif leading-tight"
          >
            "Non stiamo costruendo un negozio.<br/>
            Stiamo costruendo un <span className="italic text-white">tempio</span>."
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-12 text-lg font-sans text-white/60 leading-relaxed max-w-2xl mx-auto"
          >
            In un mondo di rumore digitale, L'Arte Viva è il silenzio. 
            È lo spazio dove l'opera respira, dove il pixel incontra il pigmento.
            Crediamo che l'acquisto di un'opera d'arte debba essere un atto sacro, 
            un momento di connessione profonda tra creatore e custode.
          </motion.p>
        </div>
      </section>

      {/* Section 3: The Principles (Full Screen Images) */}
      <div className="relative z-10">
        {PRINCIPLES.map((item, i) => (
            <section key={i} className="h-screen sticky top-0 flex items-center justify-center overflow-hidden bg-neutral-900">
                <div className="absolute inset-0">
                    <motion.img 
                      initial={{ scale: 1.2 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      src={item.img} 
                      alt={item.title} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>
                <div className="relative z-20 text-center px-8 max-w-4xl">
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <h2 className="text-5xl md:text-8xl font-serif mb-8 mix-blend-overlay text-white">
                          {item.title}
                      </h2>
                      <div className="w-24 h-[1px] bg-white/50 mx-auto mb-8" />
                    </motion.div>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-xl md:text-3xl font-sans text-white/90 leading-relaxed drop-shadow-lg max-w-2xl mx-auto"
                    >
                        {item.desc}
                    </motion.p>
                </div>
            </section>
        ))}
      </div>

      {/* Section 4: Call to Action */}
      <section className="h-screen flex items-center justify-center relative z-10 bg-neutral-950 text-white">
        <div className="text-center">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="font-sans text-sm tracking-[0.3em] uppercase mb-8 text-white/50"
          >
            Unisciti al movimento
          </motion.p>
          <motion.h2 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-8xl font-serif italic mb-12"
          >
            Vivi l'Arte
          </motion.h2>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href="/" className="inline-block px-12 py-4 border border-white hover:bg-white hover:text-black transition-colors font-sans text-sm tracking-widest uppercase">
              Torna alla Galleria
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
