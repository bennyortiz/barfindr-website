/**
 * PageLayout Component
 *
 * Main layout component for all pages in the application.
 * Includes Navbar, main content area, and Footer.
 *
 * @component
 */

"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

interface PageLayoutProps {
  /** Page content */
  children: React.ReactNode;
  /** Optional className for the main element */
  className?: string;
  /** Optional className for the container */
  containerClassName?: string;
  /** Whether to use full width layout without container */
  fullWidth?: boolean;
  /** Whether to remove padding from the container */
  noPadding?: boolean;
}

const PageLayout = ({
  children,
  className,
  containerClassName,
  fullWidth = false,
  noPadding = false
}: PageLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className={cn("flex-1", className)}>
        {fullWidth ? (
          children
        ) : (
          <Container
            className={cn(
              !noPadding && "py-6 sm:py-8 md:py-10",
              containerClassName
            )}
          >
            {children}
          </Container>
        )}
      </main>
      <Footer />
    </div>
  );
};

interface SectionProps {
  /** Section content */
  children: React.ReactNode;
  /** Optional className for the section element */
  className?: string;
  /** Optional className for the container */
  containerClassName?: string;
  /** Whether to use full width layout without container */
  fullWidth?: boolean;
  /** HTML element to use for the section */
  as?: React.ElementType;
}

const Section = ({
  children,
  className,
  containerClassName,
  fullWidth = false,
  as: Component = 'section',
}: SectionProps) => {
  return (
    <Component className={cn("py-8 sm:py-12 md:py-16", className)}>
      {fullWidth ? (
        children
      ) : (
        <Container className={containerClassName}>
          {children}
        </Container>
      )}
    </Component>
  );
};

export { PageLayout, Section };
