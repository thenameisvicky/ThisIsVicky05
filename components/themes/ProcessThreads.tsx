'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * ProcessThreads Component - Visualizes multi-threaded processing
 * Theme: OS Process Threads
 * Single Responsibility: Display thread visualization
 */
interface Thread {
  id: number;
  progress: number;
  status: 'running' | 'waiting' | 'completed';
}

interface ProcessThreadsProps {
  count?: number;
  className?: string;
}

export default function ProcessThreads({ count = 4, className = '' }: ProcessThreadsProps) {
  const [threads, setThreads] = useState<Thread[]>([]);

  useEffect(() => {
    const initialThreads: Thread[] = Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      progress: Math.random() * 100,
      status: Math.random() > 0.5 ? 'running' : 'waiting',
    }));

    setThreads(initialThreads);

    const interval = setInterval(() => {
      setThreads((prev) =>
        prev.map((thread) => ({
          ...thread,
          progress: Math.min(100, thread.progress + Math.random() * 5),
          status: thread.progress >= 100 ? 'completed' : thread.status,
        }))
      );
    }, 500);

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className={`space-y-3 ${className}`}>
      {threads.map((thread, index) => (
        <motion.div
          key={thread.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative"
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  thread.status === 'running'
                    ? 'bg-terminal-green animate-pulse'
                    : thread.status === 'completed'
                    ? 'bg-gpu-primary'
                    : 'bg-terminal-orange'
                }`}
              />
              <span className="text-xs font-mono text-terminal-fg/70">
                Thread-{thread.id}
              </span>
            </div>
            <span className="text-xs font-mono text-terminal-green/70">
              {Math.round(thread.progress)}%
            </span>
          </div>
          <div className="h-1.5 bg-terminal-bg border border-terminal-green/20 rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${
                thread.status === 'running'
                  ? 'bg-gradient-to-r from-terminal-green to-gpu-primary'
                  : thread.status === 'completed'
                  ? 'bg-gpu-primary'
                  : 'bg-terminal-orange'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${thread.progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

