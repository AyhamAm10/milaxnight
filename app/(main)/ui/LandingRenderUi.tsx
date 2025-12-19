'use client';

import { Header } from './layout/Header';
import { Hero } from './sections/Hero';
import { Features } from './sections/Features';
import { HowItWorks } from './sections/HowItWorks';
import { Testimonial } from './sections/Testimonial';
import { Footer } from './layout/Footer';

// LandingRenderUi: Composes UI components - NO prop drilling, reads from store
export function LandingRenderUi() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonial />
      </main>
      <Footer />
    </div>
  );
}

