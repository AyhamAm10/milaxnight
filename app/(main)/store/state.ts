/* eslint-disable @typescript-eslint/no-explicit-any */
import { getTranslation } from '@/lib/i18n';

type StateParams = {
  // Mobile menu state
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (value: boolean) => void;
  
  // Language/translation state (from global provider, but we can access via store)
  t: ReturnType<typeof getTranslation>; // TranslationType - will be registered from useLanguage
  isRTL: boolean;
  
  // Hero loading state (for preloader)
  isHeroReady: boolean;
  heroProgress: number;
  setIsHeroReady: (ready: boolean) => void;
  setHeroProgress: (progress: number) => void;
};

// Initialize with default English translations to prevent undefined errors
const defaultT = getTranslation('en');

const stateStore = (): StateParams => ({
  isMobileMenuOpen: false,
  setIsMobileMenuOpen: () => {},
  t: defaultT,
  isRTL: false,
  isHeroReady: false,
  heroProgress: 0,
  setIsHeroReady: () => {},
  setHeroProgress: () => {},
});

export { stateStore };
export type { StateParams };

