'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * GPUKernels Component - Visualizes parallel GPU kernel execution
 * Theme: GPU Kernels
 * Single Responsibility: Display GPU kernel grid visualization
 */
interface Kernel {
  id: number;
  active: boolean;
  intensity: number;
}

interface GPUKernelsProps {
  gridSize?: number;
  className?: string;
}

export default function GPUKernels({ gridSize = 8, className = '' }: GPUKernelsProps) {
  const [kernels, setKernels] = useState<Kernel[]>([]);

  useEffect(() => {
    const totalKernels = gridSize * gridSize;
    const initialKernels: Kernel[] = Array.from({ length: totalKernels }, (_, i) => ({
      id: i,
      active: Math.random() > 0.3,
      intensity: Math.random(),
    }));

    setKernels(initialKernels);

    const interval = setInterval(() => {
      setKernels((prev) =>
        prev.map((kernel) => ({
          ...kernel,
          active: Math.random() > 0.2,
          intensity: Math.random(),
        }))
      );
    }, 300);

    return () => clearInterval(interval);
  }, [gridSize]);

  return (
    <div className={`grid gap-1 ${className}`} style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}>
      {kernels.map((kernel, index) => (
        <motion.div
          key={kernel.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: kernel.active ? 1 : 0.3,
            scale: kernel.active ? 1 : 0.9,
            boxShadow: kernel.active
              ? `0 0 ${10 + kernel.intensity * 10}px rgba(118, 185, 0, ${0.3 + kernel.intensity * 0.4})`
              : 'none',
          }}
          transition={{
            duration: 0.3,
            delay: (index % gridSize) * 0.01,
          }}
          className={`aspect-square rounded border ${
            kernel.active
              ? 'bg-gradient-to-br from-gpu-primary/40 to-gpu-secondary/40 border-gpu-primary/50'
              : 'bg-gpu-dark/50 border-gpu-primary/20'
          }`}
        />
      ))}
    </div>
  );
}

