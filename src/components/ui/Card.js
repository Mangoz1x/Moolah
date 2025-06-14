'use client';

import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

const cardVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
};

const cardTransition = {
  type: 'spring',
  stiffness: 260,
  damping: 20,
  duration: 0.3,
};

export default function Card({ 
  children, 
  className = '', 
  hover = true,
  delay = 0,
  ...props 
}) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={cardVariants}
      transition={{ ...cardTransition, delay }}
      whileHover={hover ? { y: -2, scale: 1.02 } : {}}
      whileTap={hover ? { scale: 0.98 } : {}}
      className={twMerge(
        'bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-shadow duration-200 hover:shadow-md',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function CardHeader({ children, className = '' }) {
  return (
    <div className={twMerge('mb-4', className)}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '' }) {
  return (
    <h3 className={twMerge('text-lg font-semibold text-gray-900', className)}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = '' }) {
  return (
    <p className={twMerge('text-sm text-gray-600 mt-1', className)}>
      {children}
    </p>
  );
}

export function CardContent({ children, className = '' }) {
  return (
    <div className={twMerge('', className)}>
      {children}
    </div>
  );
}