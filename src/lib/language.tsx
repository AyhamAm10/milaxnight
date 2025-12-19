'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Language, getTranslation } from './i18n';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: ReturnType<typeof getTranslation>;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('milaknight-lang') as Language;
      if (stored) return stored;
    }
    return 'en';
  });

  const isRTL = language === 'ar';

  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    root.setAttribute('lang', language);
    localStorage.setItem('milaknight-lang', language);
  }, [language, isRTL]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const t = getTranslation(language);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
