"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Container } from '@/core/components/ui/container';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  fullWidth?: boolean;
  noPadding?: boolean;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  className, 
  containerClassName, 
  fullWidth = false, 
  noPadding = false 
}) => {
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

interface MainSectionProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  fullWidth?: boolean;
  as?: React.ElementType;
}

export const MainSection: React.FC<MainSectionProps> = ({
  children,
  className,
  containerClassName,
  fullWidth = false,
  as: Component = 'section',
}) => {
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
