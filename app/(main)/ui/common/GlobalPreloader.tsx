'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useMirror } from '../../store';

export function GlobalPreloader() {
  const isHeroReady = useMirror('isHeroReady');
  const heroProgress = useMirror('heroProgress');
  const [isVisible, setIsVisible] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Check if fonts are loaded
  useEffect(() => {
    if (typeof document !== 'undefined') {
      // Wait for fonts to load
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          setFontsLoaded(true);
        });
      } else {
        // Fallback: wait a bit for fonts
        setTimeout(() => setFontsLoaded(true), 500);
      }
    }
  }, []);

  // Hide preloader when Hero is ready and fonts are loaded
  useEffect(() => {
    if (isHeroReady && fontsLoaded) {
      // Small delay for smooth transition
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isHeroReady, fontsLoaded]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-background flex items-center justify-center"
        >
          <div className="flex flex-col items-center gap-6">
            {/* Spinner */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <Loader2 className="h-12 w-12 text-mk-purple" />
            </motion.div>

            {/* Progress bar */}
            <div className="w-64 h-1 bg-secondary rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${heroProgress}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-gradient-to-r from-mk-magenta via-mk-purple to-mk-cyan"
              />
            </div>

            {/* Progress text */}
            <p className="text-sm text-muted-foreground">
              {heroProgress < 100 ? `Loading... ${heroProgress}%` : 'Almost ready...'}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

