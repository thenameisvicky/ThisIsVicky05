'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type CardVariant = 'terminal' | 'kernel' | 'gpu' | 'ai';

interface SectionCardProps {
  children: ReactNode;
  title: string;
  variant?: CardVariant;
  className?: string;
  id?: string;
}

/**
 * SectionCard Component - Strategy Pattern for card variants
 * Open/Closed Principle: Easy to extend with new variants
 */
const variantClasses: Record<CardVariant, string> = {
  terminal: 'terminal-window',
  kernel: 'kernel-card',
  gpu: 'gpu-card',
  ai: 'ai-card',
};

export default function SectionCard({
  children,
  title,
  variant = 'terminal',
  className = '',
  id,
}: SectionCardProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
      className={`${variantClasses[variant]} ${className} my-8`}
    >
      <h2 className="text-2xl font-bold mb-6 text-gradient flex items-center gap-2">
        <span className="text-terminal-green font-mono">$</span>
        {title}
      </h2>
      {children}
    </motion.section>
  );
}

