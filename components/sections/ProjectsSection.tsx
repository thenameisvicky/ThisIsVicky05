'use client';

import SectionCard from '@/components/cards/SectionCard';
import { motion } from 'framer-motion';
import { Code2, Sparkles, Cpu } from 'lucide-react';
import AIVisualization from '@/components/themes/AIVisualization';
import type { Project } from '@/types';

interface ProjectsSectionProps {
  projects: Record<string, Project>;
}

/**
 * ProjectsSection Component - AI/Engineering Theme
 * Displays portfolio projects with creative visualizations
 */
export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const projectList = Object.values(projects);
  const visualizationTypes: Array<'llm' | 'tts' | 'image' | 'video'> = ['llm', 'tts', 'image', 'video'];

  return (
    <SectionCard title="Projects" variant="ai" id="projects">
      <div className="grid md:grid-cols-2 gap-6">
        {projectList.map((project, index) => {
          const vizType = visualizationTypes[index % visualizationTypes.length];
          return (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="p-6 rounded-lg bg-terminal-bg/50 border border-ai-primary/30 hover:border-ai-primary/50 transition-all group relative overflow-hidden"
            >
              {/* Background Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-ai-primary/5 to-ai-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-ai-primary/20 border border-ai-primary/30">
                      <Code2 className="w-5 h-5 text-ai-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-terminal-fg">
                      {project.name}
                    </h3>
                  </div>
                </div>
                <p className="text-terminal-fg/70 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                {/* AI Visualization */}
                <div className="mb-4 flex justify-center">
                  <AIVisualization type={vizType} className="scale-75" />
                </div>

                {project.features && project.features.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-ai-primary/70 font-mono">
                      <Sparkles className="w-3 h-3" />
                      <span>Features</span>
                    </div>
                    <ul className="space-y-1.5">
                      {project.features.slice(0, 3).map((feature, idx) => (
                        <li
                          key={idx}
                          className="text-terminal-fg/60 text-xs flex items-start gap-2"
                        >
                          <span className="text-ai-primary mt-1">▸</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionCard>
  );
}
