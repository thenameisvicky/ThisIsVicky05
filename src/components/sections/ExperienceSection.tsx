'use client';

import SectionCard from '@/components/cards/SectionCard';
import { motion } from 'framer-motion';
import { CheckCircle2, Code, Zap } from 'lucide-react';
import ProcessThreads from '@/components/themes/ProcessThreads';
import type { Experience } from '@/types';

interface ExperienceSectionProps {
  experience: Experience;
}

/**
 * ExperienceSection Component - OS Process Threads Theme
 * Displays work experience with thread visualization
 */
export default function ExperienceSection({ experience }: ExperienceSectionProps) {
  const { currentPosition, previousPosition } = experience;

  return (
    <SectionCard title="Experience" variant="terminal" id="experience">
      <div className="space-y-8">
        {/* Current Position with Thread Visualization */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6"
        >
          <div className="border-l-2 border-terminal-green pl-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-xl font-bold text-terminal-fg flex items-center gap-2">
                  <Code className="w-5 h-5 text-terminal-green" />
                  {currentPosition.role}
                </h3>
                <p className="text-terminal-green font-mono text-sm mt-1">
                  {currentPosition.company}
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-terminal-green/20 text-terminal-green text-xs font-mono border border-terminal-green/30 whitespace-nowrap">
                {currentPosition.duration}
              </span>
            </div>
            {currentPosition.totalTasksCompleted && (
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-4 h-4 text-gpu-primary" />
                <p className="text-terminal-fg/60 text-sm">
                  Completed <span className="text-terminal-green font-mono">{currentPosition.totalTasksCompleted}</span> tasks
                </p>
              </div>
            )}
            <ul className="space-y-2">
              {currentPosition.achievements.slice(0, 5).map((achievement, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-2 text-terminal-fg/80 text-sm"
                >
                  <CheckCircle2 className="w-4 h-4 text-terminal-green mt-0.5 flex-shrink-0" />
                  <span>{achievement}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="hidden md:block w-full">
            <div className="p-4 rounded-lg bg-terminal-bg/50 border border-terminal-green/20 w-full">
              <p className="text-xs font-mono text-terminal-green/70 mb-3">Process Threads</p>
              <ProcessThreads 
                tasks={currentPosition.detailedTasks} 
                count={currentPosition.totalTasksCompleted || 4} 
              />
            </div>
          </div>
        </motion.div>

        {/* Previous Position */}
        {previousPosition && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="border-l-2 border-terminal-green/50 pl-4"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-lg font-bold text-terminal-fg">
                  {previousPosition.role}
                </h3>
                <p className="text-terminal-green/70 font-mono text-sm">
                  {previousPosition.company}
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-terminal-green/10 text-terminal-green/70 text-xs font-mono border border-terminal-green/20">
                {previousPosition.duration}
              </span>
            </div>
            <ul className="space-y-2">
              {previousPosition.achievements.map((achievement, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-terminal-fg/70 text-sm"
                >
                  <CheckCircle2 className="w-4 h-4 text-terminal-green/50 mt-0.5 flex-shrink-0" />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </SectionCard>
  );
}
