'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useMirror } from '../../store';
import { LanguageToggle } from '@/components/common/LanguageToggle';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import logo from '@/assets/milaknight-logo.jpg';

// Header: Reads only what it needs from store (no props)
export function Header() {
  // Subscribe to smallest possible slices
  const t = useMirror('t');
  const isRTL = useMirror('isRTL');
  const isMobileMenuOpen = useMirror('isMobileMenuOpen');
  const handleMobileMenuToggle = useMirror('handleMobileMenuToggle');
  const scrollToSection = useMirror('scrollToSection');

  const navLinks = [
    { href: '#features', label: t.nav.features },
    { href: '#how-it-works', label: t.nav.howItWorks },
    { href: '#testimonial', label: t.nav.testimonial },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={typeof logo === 'string' ? logo : logo.src || '/milaknight-logo.jpg'} alt="Milaknight" className="h-10 w-10 rounded-lg object-cover" />
            <span className="text-xl font-bold gradient-text">Milaknight</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className={`hidden md:flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <LanguageToggle />
            <ThemeToggle />
            <Link
              href="/login"
              className="btn-gradient text-sm"
            >
              {t.nav.login}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={handleMobileMenuToggle}
            className="md:hidden p-2 rounded-lg bg-secondary"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="block w-full text-start text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  {link.label}
                </button>
              ))}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <LanguageToggle />
                <ThemeToggle />
                <Link
                  href="/login"
                  className="btn-gradient text-sm flex-1 text-center"
                  onClick={handleMobileMenuToggle}
                >
                  {t.nav.login}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

