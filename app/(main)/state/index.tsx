'use client';

import { type PropsWithChildren, useState } from 'react';
import { useLanguage } from '@/lib/language';
import { useMirrorRegistry } from '../store';

// State layer: Registers reactive state into store
export function State({ children }: PropsWithChildren) {
  const { t, isRTL } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHeroReady, setIsHeroReady] = useState(false);
  const [heroProgress, setHeroProgress] = useState(0);

  // Register state values into store
  useMirrorRegistry('isMobileMenuOpen', isMobileMenuOpen);
  useMirrorRegistry('setIsMobileMenuOpen', setIsMobileMenuOpen);
  useMirrorRegistry('t', t, 'value');
  useMirrorRegistry('isRTL', isRTL);
  useMirrorRegistry('isHeroReady', isHeroReady);
  useMirrorRegistry('setIsHeroReady', setIsHeroReady);
  useMirrorRegistry('heroProgress', heroProgress);
  useMirrorRegistry('setHeroProgress', setHeroProgress);

  return <>{children}</>;
}
