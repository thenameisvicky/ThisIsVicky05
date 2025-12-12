'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Sparkles, Brain, Image as ImageIcon, Video } from 'lucide-react';

/**
 * AIVisualization Component - AI/LLM Theme
 * Theme: AI, LLM, TTS, Image/Video Generation
 * Single Responsibility: Display AI-themed visualizations
 */
interface AIVisualizationProps {
  type?: 'llm' | 'tts' | 'image' | 'video';
  className?: string;
}

const icons = {
  llm: Brain,
  tts: Sparkles,
  image: ImageIcon,
  video: Video,
};

export default function AIVisualization({ type = 'llm', className = '' }: AIVisualizationProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const Icon = icons[type];

  useEffect(() => {
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Central Icon */}
      <div className="relative flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative z-10"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ai-primary to-ai-secondary flex items-center justify-center border-2 border-ai-primary/50">
            <Icon className="w-8 h-8 text-white" />
          </div>
        </motion.div>

        {/* Orbiting Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full bg-ai-primary/60"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              scale: [0.5, 1, 0.5],
              opacity: [0.3, 1, 0.3],
              boxShadow: [
                '0 0 4px rgba(139, 92, 246, 0.5)',
                '0 0 12px rgba(139, 92, 246, 0.8)',
                '0 0 4px rgba(139, 92, 246, 0.5)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Pulsing Rings */}
        {[0, 1, 2].map((ring) => (
          <motion.div
            key={ring}
            className="absolute inset-0 rounded-full border border-ai-primary/30"
            style={{
              scale: 0.5 + ring * 0.3,
            }}
            animate={{
              scale: [0.5 + ring * 0.3, 0.8 + ring * 0.3, 0.5 + ring * 0.3],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2 + ring * 0.5,
              repeat: Infinity,
              delay: ring * 0.3,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>
    </div>
  );
}

