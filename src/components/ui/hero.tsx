"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { designSystem } from '@/lib/design-system';
import Image from 'next/image';

interface HeroProps {
  /**
   * Background image URL
   */
  imageUrl: string;
  
  /**
   * Alt text for the image
   */
  imageAlt?: string;
  
  /**
   * Content to display in the hero section
   */
  children: React.ReactNode;
  
  /**
   * Optional className for the hero container
   */
  className?: string;
  
  /**
   * Optional className for the content area
   */
  contentClassName?: string;
  
  /**
   * Height of the hero section
   * @default "40vh"
   */
  height?: string;
  
  /**
   * Whether to add a gradient overlay
   * @default true
   */
  overlay?: boolean;
  
  /**
   * Overlay gradient direction
   * @default "to-t" (bottom to top)
   */
  overlayDirection?: "to-t" | "to-b" | "to-l" | "to-r";
  
  /**
   * Overlay opacity (0-100)
   * @default 50
   */
  overlayOpacity?: number;
  
  /**
   * Content position
   * @default "bottom"
   */
  contentPosition?: "top" | "center" | "bottom";
}

/**
 * Hero component for page headers with background images
 * 
 * This component provides a consistent way to create hero sections
 * with background images, overlays, and positioned content.
 * 
 * @example
 * <Hero
 *   imageUrl="/images/bar-hero.jpg"
 *   imageAlt="Bar interior"
 *   height="50vh"
 * >
 *   <h1 className="text-4xl font-bold">Bar Name</h1>
 *   <p>Bar description goes here</p>
 * </Hero>
 */
export function Hero({
  imageUrl,
  imageAlt = "",
  children,
  className,
  contentClassName,
  height = "40vh",
  overlay = true,
  overlayDirection = "to-t",
  overlayOpacity = 50,
  contentPosition = "bottom",
}: HeroProps) {
  // Determine content positioning classes
  const positionClasses = {
    top: "items-start pt-8 sm:pt-10 md:pt-12",
    center: "items-center",
    bottom: "items-end pb-8 sm:pb-10 md:pb-12",
  };
  
  return (
    <div 
      className={cn(
        "relative w-full flex",
        className
      )}
      style={{ height }}
      data-component="hero"
    >
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>
      
      {/* Overlay gradient */}
      {overlay && (
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-background z-10",
            `bg-gradient-${overlayDirection}`
          )}
          style={{ 
            opacity: overlayOpacity / 100 
          }}
        />
      )}
      
      {/* Content */}
      <div 
        className={cn(
          "relative z-20 w-full flex flex-col",
          positionClasses[contentPosition],
          "px-4 sm:px-6 md:px-8 lg:px-10 max-w-[1536px] mx-auto",
          contentClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default Hero;
