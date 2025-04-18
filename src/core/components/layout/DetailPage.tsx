"use client";

import React from 'react';
import { PageLayout } from '@/core/components/layout/PageLayout';
import { cn } from '@/lib/utils';

interface DetailPageProps {
  /**
   * The main content of the page
   */
  children: React.ReactNode;

  /**
   * Hero section content (typically an image with overlay and title)
   */
  hero: React.ReactNode;

  /**
   * Optional className for the content area
   */
  className?: string;

  /**
   * Optional className for the hero section
   */
  heroClassName?: string;

  /**
   * Whether to use a narrower content width
   * @default false
   */
  narrow?: boolean;
}

/**
 * DetailPage template for entity detail pages (bars, restaurants, etc.)
 *
 * This template provides a standard layout for detail pages with a hero section
 * at the top and content below.
 *
 * @example
 * <DetailPage
 *   hero={
 *     <HeroSection
 *       image={bar.imageUrl}
 *       title={bar.name}
 *       badges={bar.tags}
 *     />
 *   }
 * >
 *   <BarDetailContent bar={bar} />
 * </DetailPage>
 */
export function DetailPage({
  children,
  hero,
  className,
  heroClassName,
  narrow = false,
}: DetailPageProps) {
  return (
    <PageLayout fullWidth={false} noPadding={true}>
      {/* Hero section */}
      <div className={cn(
        "w-full -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-10",
        heroClassName
      )}>
        {hero}
      </div>

      {/* Main content */}
      <div className={cn(
        "py-8 sm:py-10 md:py-12",
        narrow && "max-w-3xl mx-auto",
        className
      )}>
        {children}
      </div>
    </PageLayout>
  );
}

export default DetailPage;
