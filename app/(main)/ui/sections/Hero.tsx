'use client';

import { useState, Suspense, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useMirror } from '../../store';
import { Hero3DLoader } from './Hero3DLoader';
import { HeroParticles } from './HeroParticles';

// Dynamically import Hero3D with SSR disabled to prevent React Three Fiber from running on server
const Hero3D = dynamic(
  () => import('./Hero3D').then((mod) => ({ default: mod.Hero3D })),
  {
    ssr: false,
    loading: () => <Hero3DLoader isLoading={true} />,
  }
);

// Hero: Reads only what it needs from store (no props)
export function Hero() {
  const t = useMirror('t');
  const isRTL = useMirror('isRTL');
  const [modelLoaded, setModelLoaded] = useState(false);
  const isHeroReady = useMirror('isHeroReady');
  
  // Wait for preloader to finish before showing entrance animations
  const [showContent, setShowContent] = useState(false);
  
  useEffect(() => {
    if (isHeroReady) {
      // Small delay after preloader fades to start entrance animations
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isHeroReady]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 md:pt-20 pb-8 md:pb-0 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-mk-magenta/5 via-background to-mk-cyan/5" />
      
      {/* Animated Glow Orbs - Responsive sizes */}
      <div className="absolute top-1/4 start-1/4 w-48 h-48 md:w-96 md:h-96 bg-mk-purple/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 end-1/4 w-40 h-40 md:w-80 md:h-80 bg-mk-cyan/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Hero-wide floating particles (DOM-based) */}
      <HeroParticles />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* True 50/50 split on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center min-h-[500px] md:min-h-[600px] lg:h-[700px]">
          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
            animate={showContent ? { opacity: 1, x: 0, filter: 'blur(0px)' } : { opacity: 0, x: -50, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="flex flex-col justify-center space-y-4 sm:space-y-5 md:space-y-6 text-center md:text-start relative z-10 order-2 md:order-1"
          >
            {/* Tagline Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-secondary/80 backdrop-blur-sm border border-border w-fit mx-auto md:mx-0"
            >
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-mk-purple" />
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">{t.hero.tagline}</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight sm:leading-tight md:leading-tight text-balance"
            >
              {t.hero.headline.split('Milaknight').map((part, index, array) => (
                <span key={index}>
                  {part}
                  {index < array.length - 1 && (
                    <span className="gradient-text">Milaknight</span>
                  )}
                </span>
              ))}
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto md:mx-0"
            >
              {t.hero.subtext}
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-2 sm:pt-4"
            >
              <Link
                href="/login"
                className="inline-flex items-center gap-2 btn-gradient text-sm sm:text-base md:text-lg px-6 py-3 sm:px-8 sm:py-3.5 md:px-10 md:py-4 glow-effect-strong w-full sm:w-auto justify-center"
              >
                {t.hero.cta}
                <ArrowRight className={`h-4 w-4 sm:h-5 sm:w-5 ${isRTL ? 'rotate-180' : ''}`} />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column: 3D Model - True 50% width, centered on desktop */}
          <motion.div
            initial={{ opacity: 0, x: 100, rotateY: -0.5 }}
            animate={showContent ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: 100, rotateY: -0.5 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
            className="relative hidden md:flex md:items-center md:justify-center w-full h-full min-h-[500px] lg:h-[700px] order-1 md:order-2"
          >
            <Suspense fallback={<Hero3DLoader isLoading={true} />}>
              <div className="relative w-full h-full flex items-center justify-center">
                <Hero3D onLoad={setModelLoaded} />
                <Hero3DLoader isLoading={!modelLoaded} />
              </div>
            </Suspense>
          </motion.div>

          {/* Mobile: 3D Model (reduced size for performance) */}
          <div className="md:hidden relative h-48 sm:h-64 w-full order-1 opacity-60">
            <Suspense fallback={<Hero3DLoader isLoading={true} />}>
              <div className="relative w-full h-full flex items-center justify-center">
                <Hero3D onLoad={setModelLoaded} />
                <Hero3DLoader isLoading={!modelLoaded} />
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
