'use client';

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme";
import { LanguageProvider } from "@/lib/language";
import { GlobalPreloader } from "./(main)/ui/common/GlobalPreloader";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <GlobalPreloader />
          <Toaster />
          <Sonner />
          {children}
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

