'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Lock } from 'lucide-react';
import type { TranslationType } from '../../types';
import { LanguageToggle } from '@/components/common/LanguageToggle';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import logo from '@/assets/milaknight-logo.jpg';

interface LoginFormProps {
  t: TranslationType;
  isRTL: boolean;
}

export function LoginForm({ t, isRTL }: LoginFormProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-4 flex items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className={`h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
          <span className="text-sm font-medium">Back</span>
        </Link>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-3 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={typeof logo === 'string' ? logo : logo.src || '/milaknight-logo.jpg'} alt="Milaknight" className="h-12 w-12 rounded-xl object-cover" />
              <span className="text-2xl font-bold gradient-text">Milaknight</span>
            </Link>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {t.login.title}
            </h1>
            <p className="text-muted-foreground">
              {t.login.subtitle}
            </p>
          </div>

          {/* Login Form */}
          <div className="gradient-border p-[1px]">
            <div className="bg-card rounded-xl p-8">
              {/* Coming Soon Badge */}
              <div className="text-center mb-6">
                <span className="inline-block px-4 py-1.5 rounded-full bg-mk-purple/10 text-mk-purple text-sm font-medium">
                  {t.login.comingSoon}
                </span>
              </div>

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t.login.email}
                  </label>
                  <div className="relative">
                    <Mail className={`absolute top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
                    <input
                      type="email"
                      disabled
                      className={`w-full bg-secondary border border-border rounded-lg py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-mk-purple/50 disabled:opacity-60 disabled:cursor-not-allowed ${isRTL ? 'pr-11 pl-4' : 'pl-11 pr-4'}`}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t.login.password}
                  </label>
                  <div className="relative">
                    <Lock className={`absolute top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
                    <input
                      type="password"
                      disabled
                      className={`w-full bg-secondary border border-border rounded-lg py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-mk-purple/50 disabled:opacity-60 disabled:cursor-not-allowed ${isRTL ? 'pr-11 pl-4' : 'pl-11 pr-4'}`}
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled
                  className="w-full btn-gradient py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {t.login.submit}
                </button>
              </form>

              {/* Sign Up Link */}
              <p className="text-center text-sm text-muted-foreground mt-6">
                {t.login.noAccount}{' '}
                <span className="gradient-text font-medium cursor-pointer">
                  {t.login.signUp}
                </span>
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

