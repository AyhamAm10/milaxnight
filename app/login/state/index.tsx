'use client';

import { type PropsWithChildren } from 'react';

// State layer: Provides state bindings
// For static site, this is minimal - just pass through
export function State({ children }: PropsWithChildren) {
  return <>{children}</>;
}

