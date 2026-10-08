import { type PropsWithChildren, type ReactNode, useRef } from 'react';
import {
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import {
  editorialEase,
  imageMaskTransition,
  imageScaleTransition,
  pageTransition,
  revealTransition,
  wordContainerTransition,
  wordTransition,
} from './motion';
import './motion.css';

type RevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
  amount?: number;
}>;

type WordRevealProps = {
  children: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p';
};

type ParallaxMediaProps = PropsWithChildren<{
  className?: string;
  distance?: number;
}>;

export function Versione2MotionSystem({ children }: PropsWithChildren) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.82, ease: editorialEase }}
    >
      <ScrollProgress />
      {children}
    </MotionConfig>
  );
}

export function ScrollProgress() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.25,
  });

  if (shouldReduceMotion) return null;

  return (
    <div className="v2-scroll-progress" aria-hidden="true">
      <motion.span style={{ scaleX }} />
    </div>
  );
}

export function PageTransition({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <motion.div
      className={className}
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}

export function EditorialReveal({ children, className, delay = 0, amount = 0.18 }: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={revealTransition}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

export function ImageReveal({ children, className, delay = 0, amount = 0.16 }: RevealProps) {
  return (
    <motion.div
      className={`v2-image-reveal${className ? ` ${className}` : ''}`}
      variants={imageMaskTransition}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
    >
      <motion.div
        className="v2-image-reveal-inner"
        variants={imageScaleTransition}
        custom={delay}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function WordReveal({ children, className, delay = 0, as = 'h2' }: WordRevealProps) {
  const MotionTag = motion[as];
  const words = children.trim().split(/\s+/);

  return (
    <MotionTag
      className={`v2-word-reveal${className ? ` ${className}` : ''}`}
      aria-label={children}
      variants={wordContainerTransition}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.65 }}
    >
      {words.map((word, index) => (
        <span className="v2-word-reveal-mask" aria-hidden="true" key={`${word}-${index}`}>
          <motion.span variants={wordTransition}>{word}</motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

export function ParallaxMedia({ children, className, distance = 42 }: ParallaxMediaProps) {
  const target = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);

  return (
    <div ref={target} className={`v2-parallax-frame${className ? ` ${className}` : ''}`}>
      <motion.div
        className="v2-parallax-media"
        style={{ y: shouldReduceMotion ? 0 : y }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function MotionCaption({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.58, ease: editorialEase }}
    >
      {children}
    </motion.div>
  );
}
