'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { Terminal } from 'lucide-react';

/**
 * TerminalWindow Component - OS Terminal Theme
 * Theme: Operating System Terminal
 * Single Responsibility: Display terminal-styled content
 */
interface TerminalWindowProps {
  title?: string;
  children: ReactNode;
  className?: string;
  prompt?: string;
}

export default function TerminalWindow({
  title = 'terminal',
  children,
  className = '',
  prompt = '$',
}: TerminalWindowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`terminal-window ${className}`}
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-terminal-green/20">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-terminal-orange/50" />
          <div className="w-3 h-3 rounded-full bg-terminal-yellow/50" />
          <div className="w-3 h-3 rounded-full bg-terminal-green/50" />
        </div>
        <div className="flex items-center gap-2 ml-2">
          <Terminal size={14} className="text-terminal-green" />
          <span className="text-xs font-mono text-terminal-fg/70">{title}</span>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="font-mono text-sm">
        <div className="flex items-start gap-2 mb-2">
          <span className="text-terminal-green select-none">{prompt}</span>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </motion.div>
  );
}

