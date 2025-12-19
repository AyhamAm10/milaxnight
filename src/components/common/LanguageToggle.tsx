'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/language';
import { Languages } from 'lucide-react';

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary hover:bg-surface-hover transition-colors"
      aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
    >
      <Languages className="h-4 w-4 text-foreground" />
      <span className="text-sm font-medium text-foreground">
        {language === 'en' ? 'AR' : 'EN'}
      </span>
    </motion.button>
  );
}

