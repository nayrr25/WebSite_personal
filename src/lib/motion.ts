import type { Variants } from "framer-motion";

export const easeSmooth = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeSmooth },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: easeSmooth },
  },
};

export const stagger = (childDelay = 0.06): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: childDelay,
      delayChildren: 0.05,
    },
  },
});
