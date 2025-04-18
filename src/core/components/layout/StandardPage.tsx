"use client";

import React from 'react';
import { PageLayout } from '@/core/components/layout/page-layout';
import { Container } from '@/core/components/ui/container';
import { cn } from '@/lib/utils';

interface StandardPageProps {
  /**
   * The main content of the page
   */
  children: React.ReactNode;
  
  /**
   * Optional title for the page
   */
  title?: string;
  
  /**
   * Optional description for the page
   */
  description?: string;
  
  /**
   * Optional className for the main content area
   */
  className?: string;
  
  /**
   * Whether to use a narrower content width
   * @default false
   */
  narrow?: boolean;
  
  /**
   * Whether to remove default padding
   * @default false
   */
  noPadding?: boolean;
}

/**
 * StandardPage template for consistent page layouts
 * 
 * This template provides a standard layout for most pages in the application,
 * with optional title and description sections.
 * 
 * @example
 * // Basic usage
 * <StandardPage title="Bars" description="Discover the best bars in Austin">
 *   <BarList bars={bars} />
 * </StandardPage>
 * 
 * @example
 * // Without title/description
 * <StandardPage>
 *   <CustomContent />
 * </StandardPage>
 */
export function StandardPage({
  children,
  title,
  description,
  className,
  narrow = false,
  noPadding = false,
}: StandardPageProps) {
  return (
    <PageLayout fullWidth={false} noPadding={noPadding}>
      {(title || description) && (
        <div className={cn("mb-6 sm:mb-8 md:mb-10", noPadding && "px-4 sm:px-6 md:px-8 lg:px-10")}>
          {title && (
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              {title}
            </h1>
          )}
          {description && (
            <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">
              {description}
            </p>
          )}
        </div>
      )}
      
      <div className={cn(
        "w-full",
        narrow && "max-w-3xl mx-auto",
        className
      )}>
        {children}
      </div>
    </PageLayout>
  );
}

export default StandardPage;
