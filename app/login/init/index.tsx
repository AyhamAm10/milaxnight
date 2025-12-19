'use client';

import { type PropsWithChildren } from 'react';

// Init layer: Registers static props/data into store
// For static site, this is minimal - just pass through
export function Init({ children }: PropsWithChildren) {
  return <>{children}</>;
}

