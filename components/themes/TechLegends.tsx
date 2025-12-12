'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

/**
 * TechLegends Component - Linus Torvalds & Jensen Huang Theme
 * Theme: Tech Legends
 * Single Responsibility: Display tech legend quotes/inspiration
 */
interface TechLegendsProps {
  className?: string;
}

const quotes = [
  {
    author: 'Linus Torvalds',
    text: 'Talk is cheap. Show me the code.',
    color: 'terminal-green',
  },
  {
    author: 'Jensen Huang',
    text: 'The more you buy, the more you save.',
    color: 'gpu-primary',
  },
];

export default function TechLegends({ className = '' }: TechLegendsProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {quotes.map((quote, index) => (
        <motion.div
          key={quote.author}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 }}
          className="relative p-4 rounded-lg border border-terminal-green/20 bg-terminal-bg/50 backdrop-blur-sm"
        >
          <Quote className="absolute top-2 left-2 w-6 h-6 text-terminal-green/30" />
          <p className="text-terminal-fg/90 italic pl-6 mb-2">{quote.text}</p>
          <p className={`text-sm font-mono pl-6 ${
            quote.color === 'terminal-green' ? 'text-terminal-green' : 'text-gpu-primary'
          }`}>— {quote.author}</p>
        </motion.div>
      ))}
    </div>
  );
}

