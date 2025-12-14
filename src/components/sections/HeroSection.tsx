'use client';

import { motion } from 'framer-motion';
import { Code, Cpu, Sparkles } from 'lucide-react';
import GPUKernels from '@/components/themes/GPUKernels';
import AIVisualization from '@/components/themes/AIVisualization';
import type { Personal, Meta } from '@/types';

interface HeroSectionProps {
  personal: Personal;
  meta: Meta;
}

export default function HeroSection({ personal, meta }: HeroSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 opacity-20">
        <GPUKernels gridSize={12} className="w-full h-full" />
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gradient font-mono">{personal.name}</span>
          </h1>
          <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
            <Code className="w-5 h-5 md:w-6 md:h-6 text-terminal-green flex-shrink-0" />
            <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-terminal-fg/90 font-mono text-center">
              {personal.currentRole}
            </p>
            <Cpu className="w-5 h-5 md:w-6 md:h-6 text-gpu-primary flex-shrink-0" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-4 md:gap-6 mb-4">
            <div className="hidden md:flex flex-shrink-0 items-center">
              <AIVisualization type="llm" className="scale-75" />
            </div>
            <p className="text-terminal-fg/70 text-base md:text-lg lg:text-xl max-w-2xl leading-relaxed text-center">
              {meta.summary || personal.experience}
            </p>
            <div className="hidden md:flex flex-shrink-0 items-center">
              <AIVisualization type="tts" className="scale-75" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-center gap-2 mt-6"
        >
          <Sparkles className="w-4 h-4 text-terminal-green animate-pulse flex-shrink-0" />
          <span className="px-4 py-2 rounded-full bg-terminal-green/10 border border-terminal-green/30 text-terminal-green text-sm font-mono whitespace-nowrap">
            {meta.lastStatusSummary.split(':')[0] || 'Active'}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-terminal-green/50 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-terminal-green rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

