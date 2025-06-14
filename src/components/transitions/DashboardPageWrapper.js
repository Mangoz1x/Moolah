'use client';

import { motion } from 'framer-motion';

const fadeUpVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -20,
  },
};

const fadeUpTransition = {
  type: 'tween',
  ease: [0.25, 0.46, 0.45, 0.94],
  duration: 0.3,
};

export default function DashboardPageWrapper({ children, className = '' }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeUpVariants}
      transition={fadeUpTransition}
      className={`w-full ${className}`}
    >
      {children}
    </motion.div>
  );
}