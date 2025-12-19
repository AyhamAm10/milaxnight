'use client';

import { type PropsWithChildren } from 'react';

// Utils layer: Provides utility functions
// For static site, this is minimal - just pass through
export function Utils({ children }: PropsWithChildren) {
  return <>{children}</>;
}

