import { motion } from 'motion/react';

export function BrushStroke() {
  return (
    <div className="w-64 h-24 mx-auto relative flex items-center justify-center">
      <svg viewBox="0 0 300 100" className="w-full h-full overflow-visible">
        <defs>
          <filter id="displacement" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" />
          </filter>
        </defs>
        
        <motion.path
          d="M20,50 C80,20 150,80 280,40"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#displacement)"
          className="text-white/40"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          viewport={{ once: true }}
        />
        
        <motion.path
          d="M40,60 C100,30 170,90 260,50"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          filter="url(#displacement)"
          className="text-white/20"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
          viewport={{ once: true }}
        />
      </svg>
    </div>
  );
}
