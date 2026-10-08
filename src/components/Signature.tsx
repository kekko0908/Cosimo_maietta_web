import { motion } from 'motion/react';

export function Signature() {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        duration: 2, 
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse" as const,
        repeatDelay: 1
      }
    }
  };

  return (
    <div className="w-32 h-12">
      <svg viewBox="0 0 200 100" className="w-full h-full stroke-white fill-none stroke-2">
        <motion.path
          d="M10,50 Q50,10 90,50 T180,50"
          variants={pathVariants}
          initial="hidden"
          whileInView="visible"
        />
      </svg>
    </div>
  );
}
