'use client';

import SectionCard from '@/components/cards/SectionCard';
import { motion } from 'framer-motion';
import { Target, Rocket, TrendingUp } from 'lucide-react';
import TechLegends from '@/components/themes/TechLegends';
import type { Goals } from '@/types';

interface GoalsSectionProps {
  goals: Goals;
}

/**
 * GoalsSection Component - Tech Legends Theme
 * Displays goals with Linus/Jensen inspiration
 */
export default function GoalsSection({ goals }: GoalsSectionProps) {
  return (
    <SectionCard title="Goals & Growth" variant="gpu" id="goals">
      <div className="space-y-6">
        {/* Dream */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-4 rounded-lg bg-terminal-bg/50 border border-gpu-primary/30"
        >
          <div className="flex items-start gap-3 mb-2">
            <Rocket className="w-5 h-5 text-gpu-primary mt-0.5 flex-shrink-0" />
            <h3 className="text-lg font-bold text-terminal-fg">Dream</h3>
          </div>
          <p className="text-terminal-fg/80 leading-relaxed">{goals.ambition.dream}</p>
        </motion.div>

        {/* Goals Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-4 rounded-lg bg-terminal-bg/50 border border-terminal-green/20"
          >
            <h3 className="text-md font-semibold mb-3 text-terminal-green flex items-center gap-2">
              <Target className="w-4 h-4" />
              Short Term
            </h3>
            <ul className="space-y-2">
              {goals.ambition.shortTermGoals.map((goal, index) => (
                <li
                  key={index}
                  className="text-terminal-fg/70 text-sm flex items-start gap-2"
                >
                  <span className="text-terminal-green mt-1">▸</span>
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-4 rounded-lg bg-terminal-bg/50 border border-terminal-green/20"
          >
            <h3 className="text-md font-semibold mb-3 text-terminal-green flex items-center gap-2">
              <Target className="w-4 h-4" />
              Long Term
            </h3>
            <ul className="space-y-2">
              {goals.ambition.longTermGoals.map((goal, index) => (
                <li
                  key={index}
                  className="text-terminal-fg/70 text-sm flex items-start gap-2"
                >
                  <span className="text-terminal-green mt-1">▸</span>
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Tech Legends Inspiration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold mb-3 text-terminal-green flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Inspiration
          </h3>
          <TechLegends />
        </motion.div>

        {/* Growth History */}
        {goals.growthHistory.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3 text-terminal-green flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Growth History
            </h3>
            <div className="space-y-3">
              {goals.growthHistory.slice(0, 3).map((entry, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 rounded-lg bg-terminal-bg/50 border-l-2 border-terminal-green pl-4"
                >
                  <p className="text-terminal-green font-mono text-xs mb-1">
                    {entry.date}
                  </p>
                  <p className="text-terminal-fg/80 text-sm">{entry.summary}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Areas for Improvement */}
        {goals.areasForImprovement.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3 text-terminal-green">
              Areas for Improvement
            </h3>
            <div className="flex flex-wrap gap-2">
              {goals.areasForImprovement.slice(0, 6).map((area, index) => (
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
