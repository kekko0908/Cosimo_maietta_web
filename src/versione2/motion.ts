import type { Transition, Variants } from 'motion/react';

export const editorialEase = [0.22, 1, 0.36, 1] as const;

export const editorialTransition: Transition = {
  duration: 0.9,
  ease: editorialEase,
};

export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: editorialEase },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.32, ease: editorialEase },
  },
};

export const revealTransition: Variants = {
  hidden: { opacity: 0, y: 34 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.82, delay, ease: editorialEase },
  }),
};

export const imageMaskTransition: Variants = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: (delay = 0) => ({
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 1.05, delay, ease: editorialEase },
  }),
};

export const imageScaleTransition: Variants = {
  hidden: { scale: 1.08 },
  visible: (delay = 0) => ({
    scale: 1,
    transition: { duration: 1.35, delay, ease: editorialEase },
  }),
};

export const wordContainerTransition: Variants = {
  hidden: {},
  visible: (delay = 0) => ({
    transition: {
      delayChildren: delay,
      staggerChildren: 0.055,
    },
  }),
};

export const wordTransition: Variants = {
  hidden: { y: '112%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.72, ease: editorialEase },
  },
};
