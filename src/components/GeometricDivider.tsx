import { motion } from 'motion/react';

export function GeometricDivider() {
  return (
    <div className="w-full max-w-xs mx-auto h-16 flex items-center justify-center relative">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="h-[1px] bg-white/30 absolute"
      />
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        whileInView={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: "backOut" }}
        className="w-4 h-4 border border-white/60 rotate-45 bg-neutral-900 z-10"
      />
    </div>
  );
}
