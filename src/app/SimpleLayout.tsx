"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

interface SimpleLayoutProps {
  children: React.ReactNode;
  fullWidth?: boolean;
}

export default function SimpleLayout({ children, fullWidth = false }: SimpleLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {fullWidth ? children : <Container>{children}</Container>}
      </main>
      <Footer />
    </div>
  );
}

interface SimpleSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function SimpleSection({ children, className }: SimpleSectionProps) {
  return (
    <section className={cn("py-8", className)}>
      <Container>
        {children}
      </Container>
    </section>
  );
}
