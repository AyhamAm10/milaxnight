'use client';

import { useLanguage } from '@/lib/language';
import { LoginForm } from './LoginForm';

export function LoginRenderUi() {
  const { t, isRTL } = useLanguage();

  return <LoginForm t={t} isRTL={isRTL} />;
}

