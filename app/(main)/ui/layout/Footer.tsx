'use client';

import Link from 'next/link';
import { useMirror } from '../../store';
import logo from '@/assets/milaknight-logo.jpg';

// Footer: Reads only what it needs from store (no props)
export function Footer() {
  const t = useMirror('t');

  return (
    <footer className="py-12 border-t border-border bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={typeof logo === 'string' ? logo : logo.src || '/milaknight-logo.jpg'} alt="Milaknight" className="h-10 w-10 rounded-lg object-cover" />
            <div>
              <span className="text-lg font-bold gradient-text">Milaknight</span>
              <p className="text-sm text-muted-foreground">{t.footer.tagline}</p>
            </div>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6">
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              {t.footer.links.about}
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              {t.footer.links.contact}
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              {t.footer.links.privacy}
            </Link>
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}

