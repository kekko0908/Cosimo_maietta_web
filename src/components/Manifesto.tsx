import { motion } from 'motion/react';

export function Manifesto() {
  return (
    <section className="py-32 px-8 bg-neutral-950 text-white flex justify-center items-center">
      <div className="max-w-4xl text-center">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-2xl md:text-4xl font-serif leading-relaxed text-white/80"
        >
          "L'arte non è ciò che vedi, ma ciò che fai vedere agli altri."
        </motion.p>
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="w-24 h-[1px] bg-white/30 mx-auto mt-12"
        />
      </div>
    </section>
  );
}
