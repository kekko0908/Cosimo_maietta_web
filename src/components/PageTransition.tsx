import { motion } from 'motion/react';

export function PageTransition() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] pointer-events-none flex flex-col"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="flex-1 bg-neutral-950"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: 'top' }}
      />
    </motion.div>
  );
}

export function PageReveal() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] pointer-events-none bg-neutral-950"
      initial={{ scaleY: 1 }}
      animate={{ scaleY: 0 }}
      exit={{ scaleY: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: 'bottom' }}
    />
  );
}
