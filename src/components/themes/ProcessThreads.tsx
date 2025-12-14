'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';
import type { Task } from '@/types';

/**
 * ProcessThreads Component - Visualizes multi-threaded processing
 * Theme: OS Process Threads
 * Single Responsibility: Display thread visualization based on task completion times
 */

interface ProcessThreadsProps {
  tasks?: Task[];
  count?: number;
  className?: string;
}

/**
 * Extract hours from developmentPeriod string
 * Example: "April 03 - April 09 (30 Hours)" -> 30
 */
function extractHours(developmentPeriod: string): number {
  const match = developmentPeriod.match(/\((\d+)\s*Hours?\)/i);
  return match ? parseInt(match[1], 10) : 0;
}

export default function ProcessThreads({ tasks, count = 4, className = '' }: ProcessThreadsProps) {
  const threads = useMemo(() => {
    if (tasks && tasks.length > 0) {
      // Extract hours from each task
      const taskData = tasks.slice(0, count).map((task) => ({
        ...task,
        hours: extractHours(task.developmentPeriod),
      }));
      
      // Find min and max hours for duration normalization
      const allHours = taskData.map(t => t.hours).filter(h => h > 0);
      const minHours = allHours.length > 0 ? Math.min(...allHours) : 1;
      const maxHours = allHours.length > 0 ? Math.max(...allHours) : 1;
      
      // All threads reach 100%, but animation duration is based on task hours
      // Longer tasks = slower animation (longer duration)
      // Shorter tasks = faster animation (shorter duration)
      const minDuration = 1; // Minimum animation duration (1 second)
      const maxDuration = 5; // Maximum animation duration (5 seconds)
      
      return taskData.map((task) => {
        // Calculate animation duration based on task hours
        // Normalize hours to duration range
        let duration = minDuration;
        if (task.hours > 0 && maxHours > minHours) {
          // Normalize: (hours - minHours) / (maxHours - minHours) maps to (minDuration, maxDuration)
          const normalized = (task.hours - minHours) / (maxHours - minHours);
          duration = minDuration + (normalized * (maxDuration - minDuration));
        } else if (task.hours > 0) {
          // All tasks have same hours, use middle duration
          duration = (minDuration + maxDuration) / 2;
        }
        
        return {
          id: task.taskNumber,
          title: task.title,
          progress: 100, // All threads reach 100%
          hours: task.hours,
          duration, // Animation duration based on task completion time
          status: 'completed' as const,
        };
      });
    }
    
    // Fallback: generate placeholder threads if no tasks provided
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      title: `Task-${i + 1}`,
      progress: 100,
      hours: 0,
      duration: 2,
      status: 'completed' as const,
    }));
  }, [tasks, count]);

  return (
    <div className={`space-y-3 w-full ${className}`}>
      {threads.map((thread, index) => (
        <div
          key={thread.id}
          className="w-full"
        >
          <div className="flex items-center justify-between mb-1.5 w-full gap-2">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <div className="w-2 h-2 rounded-full bg-gpu-primary flex-shrink-0" />
              <span className="text-xs font-mono text-terminal-fg/70 truncate">
                {thread.title || `Task-${thread.id}`}
              </span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 whitespace-nowrap">
              {thread.hours > 0 && (
                <span className="text-xs font-mono text-terminal-fg/50">
                  {thread.hours}h
                </span>
              )}
              <span className="text-xs font-mono text-terminal-green/70 min-w-[3rem] text-right">
                100%
              </span>
            </div>
          </div>
          <div className="w-full h-1.5 bg-terminal-bg border border-terminal-green/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-terminal-green to-gpu-primary rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ 
                duration: thread.duration || 1, 
                delay: index * 0.1, 
                ease: 'easeOut' 
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

