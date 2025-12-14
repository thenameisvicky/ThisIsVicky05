'use client';

import SectionCard from '@/components/cards/SectionCard';
import { motion } from 'framer-motion';
import TerminalWindow from '@/components/themes/TerminalWindow';
import type { Personal, Meta } from '@/types';

interface AboutSectionProps {
  personal: Personal;
  meta: Meta;
}

/**
 * AboutSection Component - OS Terminal Theme
 * Displays about information in terminal style
 */
export default function AboutSection({ personal, meta }: AboutSectionProps) {
  return (
    <SectionCard title="About" variant="kernel" id="about">
      <div className="space-y-6">
        <TerminalWindow title="about.sh" prompt="$">
          <div className="space-y-3">
            <div>
              <span className="text-terminal-green">echo</span>
              <span className="text-terminal-fg/70"> {`"${personal.experience}"`}</span>
            </div>
            {meta.summary && (
              <div className="mt-4">
                <span className="text-terminal-green">cat</span>
                <span className="text-terminal-fg/70"> summary.txt</span>
                <p className="text-terminal-fg/80 mt-2 pl-4 leading-relaxed">{meta.summary}</p>
              </div>
            )}
          </div>
        </TerminalWindow>

        <div className="flex flex-wrap gap-2 mt-4">
          {personal.email && (
            <motion.a
              href={`mailto:${personal.email}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1 rounded-full bg-terminal-green/10 border border-terminal-green/30 text-terminal-green text-sm font-mono hover:bg-terminal-green/20 transition-colors"
            >
              {personal.email}
            </motion.a>
          )}
          {personal.phone && (
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1 rounded-full bg-terminal-green/10 border border-terminal-green/30 text-terminal-green text-sm font-mono"
            >
              {personal.phone}
            </motion.span>
          )}
        </div>
      </div>
    </SectionCard>
  );
}
