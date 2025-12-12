'use client';

import SectionCard from '@/components/cards/SectionCard';
import { motion } from 'framer-motion';
import GPUKernels from '@/components/themes/GPUKernels';
import TerminalWindow from '@/components/themes/TerminalWindow';
import AIVisualization from '@/components/themes/AIVisualization';
import type { Skills } from '@/types';

interface SkillsSectionProps {
  skills: Skills;
}

/**
 * SkillsSection Component - Creative GPU/OS/AI Theme
 * Displays technical skills with theme visualizations
 */
export default function SkillsSection({ skills }: SkillsSectionProps) {
  const skillCategories = [
    {
      title: 'Technical',
      content: skills.technical,
      variant: 'gpu' as const,
      visualization: <GPUKernels gridSize={6} className="mt-4" />,
    },
    {
      title: 'Tools',
      content: skills.tools,
      variant: 'terminal' as const,
      visualization: (
        <TerminalWindow title="tools" className="mt-4" prompt=">">
          <span className="text-terminal-green">npm install</span>
          <span className="text-terminal-fg/70"> -g {skills.tools.split(',')[0]?.trim()}</span>
        </TerminalWindow>
      ),
    },
    {
      title: 'Soft Skills',
      content: skills.softSkills,
      variant: 'ai' as const,
      visualization: <AIVisualization type="llm" className="mt-4" />,
    },
  ];

  return (
    <SectionCard title="Skills" variant="gpu" id="skills">
      <div className="grid md:grid-cols-3 gap-6">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            className="p-6 rounded-lg bg-terminal-bg/50 border border-terminal-green/20 hover:border-terminal-green/40 transition-all"
          >
            <h3 className="text-lg font-semibold mb-3 text-terminal-green font-mono flex items-center gap-2">
              <span className="text-terminal-green">▶</span>
              {category.title}
            </h3>
            <p className="text-terminal-fg/80 text-sm leading-relaxed mb-4">
              {category.content}
            </p>
            {category.visualization}
          </motion.div>
        ))}
      </div>
    </SectionCard>
  );
}
