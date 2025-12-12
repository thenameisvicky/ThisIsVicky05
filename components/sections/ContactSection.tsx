'use client';

import SectionCard from '@/components/cards/SectionCard';
import { Mail, Phone } from 'lucide-react';
import type { Personal } from '@/types';

interface ContactSectionProps {
  personal: Personal;
}

export default function ContactSection({ personal }: ContactSectionProps) {
  return (
    <SectionCard title="Contact" variant="terminal" id="contact">
      <div className="space-y-4">
        <p className="text-terminal-fg/80">
          Let's connect and build something amazing together.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          {personal.email && (
            <a
              href={`mailto:${personal.email}`}
              className="flex items-center gap-3 p-4 rounded-lg bg-terminal-bg/50 border border-terminal-green/30 hover:border-terminal-green/50 transition-all group"
            >
              <Mail className="w-5 h-5 text-terminal-green group-hover:scale-110 transition-transform" />
              <span className="text-terminal-fg font-mono">{personal.email}</span>
            </a>
          )}
          {personal.phone && (
            <a
              href={`tel:${personal.phone}`}
              className="flex items-center gap-3 p-4 rounded-lg bg-terminal-bg/50 border border-terminal-green/30 hover:border-terminal-green/50 transition-all group"
            >
              <Phone className="w-5 h-5 text-terminal-green group-hover:scale-110 transition-transform" />
              <span className="text-terminal-fg font-mono">{personal.phone}</span>
            </a>
          )}
        </div>
      </div>
    </SectionCard>
  );
}

