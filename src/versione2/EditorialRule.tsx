import { motion } from "motion/react";

export function EditorialRule({ className = "" }: { className?: string }) {
  return (
    <div className={`ed-rule ${className}`} aria-hidden="true">
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
