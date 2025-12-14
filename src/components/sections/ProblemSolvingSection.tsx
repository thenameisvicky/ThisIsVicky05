'use client';

import SectionCard from '@/components/cards/SectionCard';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, Target } from 'lucide-react';
import GPUKernels from '@/components/themes/GPUKernels';
import type { ProblemSolving } from '@/types';

interface ProblemSolvingSectionProps {
  problemSolving: ProblemSolving;
}

/**
 * ProblemSolvingSection Component - GPU Kernels Theme
 * Displays problem-solving skills with kernel visualization
 */
export default function ProblemSolvingSection({
  problemSolving,
}: ProblemSolvingSectionProps) {
  const recentProblems = problemSolving.problems
    .filter((p) => p.recentlyAdded)
    .slice(0, 8);

  return (
    <SectionCard title="Problem Solving" variant="kernel" id="problem-solving">
      <div className="space-y-6">
        {/* Header with GPU Kernels */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-start gap-3">
            <Brain className="w-6 h-6 text-terminal-green mt-1 flex-shrink-0" />
            <div>
              <p className="text-terminal-fg/90 mb-2 leading-relaxed">{problemSolving.currentLevel}</p>
              <p className="text-terminal-fg/60 text-sm font-mono">
                Last updated: {problemSolving.lastSolvedStrategyDate}
              </p>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="p-4 rounded-lg bg-terminal-bg/50 border border-terminal-green/20">
              <p className="text-xs font-mono text-terminal-green/70 mb-3 flex items-center gap-2">
                <Target className="w-3 h-3" />
                Active Kernels
              </p>
              <GPUKernels gridSize={6} />
            </div>
          </div>
        </div>

        {recentProblems.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-terminal-green flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Recent Solutions
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {recentProblems.map((problem, index) => (
                <motion.div
                  key={problem.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 rounded-lg bg-terminal-bg/50 border border-terminal-green/20 hover:border-terminal-green/40 transition-all group"
                >
                  <h4 className="font-bold text-terminal-fg mb-1 text-sm group-hover:text-terminal-green transition-colors">
                    {problem.name}
                  </h4>
                  <p className="text-terminal-green/70 font-mono text-xs mb-2">
                    {problem.approach}
                  </p>
                  <p className="text-terminal-fg/60 text-xs line-clamp-2">
                    {problem.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {problemSolving.areasOfImprovement.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3 text-terminal-green flex items-center gap-2">
              <Target className="w-5 h-5" />
              Areas for Improvement
            </h3>
            <div className="flex flex-wrap gap-2">
              {problemSolving.areasOfImprovement.slice(0, 6).map((area, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="px-3 py-1 rounded-full bg-terminal-green/10 border border-terminal-green/30 text-terminal-green text-xs font-mono hover:bg-terminal-green/20 transition-colors cursor-default"
                >
                  {area}
                </motion.span>
              ))}
            </div>
          </div>
        )}
      </div>
    </SectionCard>
  );
}
