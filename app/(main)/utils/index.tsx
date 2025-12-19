'use client';

import { type PropsWithChildren } from 'react';
import { useMirrorRegistry, getStore } from '../store';

// Utils layer: Registers actions into store
export function Utils({ children }: PropsWithChildren) {
  // Register scrollToSection action
  useMirrorRegistry('scrollToSection', (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    const store = getStore();
    store.setState({ isMobileMenuOpen: false });
  });

  // Register handleMobileMenuToggle action
  useMirrorRegistry('handleMobileMenuToggle', () => {
    const store = getStore();
    const current = store.getState().isMobileMenuOpen;
    store.setState({ isMobileMenuOpen: !current });
  });

  return <>{children}</>;
}
