'use client';

import SectionCard from '@/components/cards/SectionCard';
import { GraduationCap } from 'lucide-react';
import type { Education } from '@/types';

interface EducationSectionProps {
  education: Education;
}

export default function EducationSection({ education }: EducationSectionProps) {
  return (
    <SectionCard title="Education" variant="terminal" id="education">
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-terminal-green/10 border border-terminal-green/30">
            <GraduationCap className="w-6 h-6 text-terminal-green" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-terminal-fg mb-1">
              {education.degree}
            </h3>
            <p className="text-terminal-green font-mono text-sm mb-2">
              {education.institution}
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-terminal-fg/70">
              <span className="font-mono">{education.duration}</span>
              <span className="font-mono">CGPA: {education.cgpa}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="px-2 py-1 rounded bg-terminal-green/10 border border-terminal-green/20 text-terminal-green font-mono">
                Class 12: {education.class12}
              </span>
              <span className="px-2 py-1 rounded bg-terminal-green/10 border border-terminal-green/20 text-terminal-green font-mono">
                Class 10: {education.class10}
              </span>
            </div>
            <p className="mt-3 text-terminal-fg/60 text-sm">
              {education.learningProgress}
            </p>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

