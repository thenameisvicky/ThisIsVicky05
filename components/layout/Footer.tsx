'use client';

import type { Meta } from '@/types';

interface FooterProps {
  meta: Meta;
}

export default function Footer({ meta }: FooterProps) {
  return (
    <footer className="border-t border-terminal-green/20 mt-16 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-terminal-fg/60 text-center md:text-left">
            {meta.summary}
          </p>
          <p className="text-terminal-green/50 font-mono text-xs">
            Last Updated: {meta.lastUpdated}
          </p>
        </div>
        <div className="mt-4 text-center text-terminal-fg/40 text-xs font-mono">
          Built with Next.js, TypeScript, and Engineering Principles
        </div>
      </div>
    </footer>
  );
}

