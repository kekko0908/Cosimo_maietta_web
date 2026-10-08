import { motion } from 'motion/react';

const PHILOSOPHY_ITEMS = [
  {
    title: "Curatela",
    desc: "Ogni opera è selezionata a mano per la sua voce unica.",
    img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Autenticità",
    desc: "Certificati di autenticità verificati per ogni acquisizione.",
    img: "https://images.unsplash.com/photo-1544207240-8b10b5eb80b0?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Eternità",
    desc: "Arte costruita per durare e ispirare generazioni.",
    img: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=1000&auto=format&fit=crop"
  }
];

export function Philosophy() {
  return (
    <section className="py-32 bg-neutral-900 text-white px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="font-serif text-4xl md:text-5xl italic mb-6">La Nostra Filosofia</h2>
          <p className="font-sans text-white/50 max-w-2xl mx-auto">
            Non vendiamo solo oggetti. Vendiamo finestre su altri mondi, frammenti di anima e conversazioni silenziose.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PHILOSOPHY_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="group relative h-[400px] overflow-hidden"
            >
              <img 
                src={item.img} 
                alt={item.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/90 to-transparent">
                <h3 className="font-serif text-2xl mb-2">{item.title}</h3>
                <p className="font-sans text-sm text-white/70 leading-relaxed translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
