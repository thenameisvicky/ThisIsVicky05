'use client';

import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Problem Solving', href: '#problem-solving' },
  { label: 'Goals', href: '#goals' },
  { label: 'Contact', href: '#contact' },
];

/**
 * Header Component - Strategy Pattern for navigation
 * Single Responsibility: Navigation and branding
 */
export default function Header({ name, role }: { name: string; role: string }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 backdrop-blur-md bg-terminal-bg/80 border-b border-terminal-green/20"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Brand - Kernel Boot Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-terminal-green to-gpu-primary flex items-center justify-center font-bold text-kernel-dark matrix-text text-xl border border-terminal-green/30 glow-green">
              VB
            </div>
            <div>
              <h1 className="text-xl font-bold text-terminal-fg">{name}</h1>
              <p className="text-sm text-terminal-green/70 font-mono">{role}</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="px-4 py-2 rounded-lg text-sm font-medium text-terminal-fg hover:text-terminal-green hover:bg-terminal-green/10 transition-all border border-transparent hover:border-terminal-green/20"
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-terminal-fg hover:text-terminal-green transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 space-y-2 pb-4"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2 rounded-lg text-terminal-fg hover:text-terminal-green hover:bg-terminal-green/10 transition-all border border-terminal-green/20"
              >
                {item.label}
              </a>
            ))}
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
}

