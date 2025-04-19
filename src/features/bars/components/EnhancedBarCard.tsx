"use client";

import React from 'react';
import { Bar } from "@/lib/types";
import { Card, CardContent } from "@/core/components/ui/card";
import { Badge } from "@/core/components/ui/badge";
import { MapPin, Star, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { designSystem } from '@/lib/design-system';
import { getBarUrl } from "@/lib/bar-data";

interface EnhancedBarCardProps {
  /**
   * Bar data to display
   */
  bar: Bar;

  /**
   * Optional className for the card
   */
  className?: string;

  /**
   * Whether to show the card in a featured style
   * @default false
   */
  featured?: boolean;

  /**
   * Animation delay for staggered animations
   * @default 0
   */
  delay?: number;
}

/**
 * EnhancedBarCard component with Apple-inspired design
 *
 * Displays a bar in a card format with smooth animations, refined typography,
 * and subtle interactions.
 */
export function EnhancedBarCard({
  bar,
  className,
  featured = false,
  delay = 0,
}: EnhancedBarCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: delay * 0.1,
        ease: designSystem.animation.timingFunctions["apple-standard"]
      }}
      whileHover={{
        y: -4,
        transition: {
          duration: 0.3,
          ease: designSystem.animation.timingFunctions["apple-spring"]
        }
      }}
      className={cn(
        "group",
        featured && "col-span-full md:col-span-2",
        className
      )}
    >
      <Link href={getBarUrl(bar)} className="outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg block">
        <Card className={cn(
          "overflow-hidden border-neutral-200 bg-white dark:bg-neutral-900 dark:border-neutral-800",
          "transition-all duration-300",
          "hover:shadow-apple-lg dark:hover:shadow-none dark:hover:border-neutral-700",
          "h-full"
        )}>
          <div className={cn(
            "image-container",
            featured ? "aspect-[21/9] md:aspect-[21/9]" : "aspect-[4/3]"
          )}>
            <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
            <Image
              src={bar.imageUrl}
              alt={bar.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={featured}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Tags */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
              {bar.hasHappyHour && (
                <Badge className="bg-primary-600 text-white text-xs font-medium py-1 px-2 rounded-md shadow-sm">
                  Happy Hour
                </Badge>
              )}
              {featured && bar.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-white/90 dark:bg-black/80 text-xs font-medium py-1 px-2 rounded-md shadow-sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <CardContent className="p-4 sm:p-5">
            <div className="space-y-3">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold tracking-tight line-clamp-1 group-hover:text-primary-600 transition-colors duration-200">
                  {bar.name}
                </h3>
                <div className="flex items-center mt-1 text-neutral-500 dark:text-neutral-400">
                  <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                  <p className="text-sm line-clamp-1">{bar.address}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex items-center bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-md px-2 py-1">
                    <Star className="h-3.5 w-3.5 fill-primary-500 text-primary-500 mr-1" />
                    <span className="text-sm font-medium">{bar.rating}</span>
                  </div>

                  {bar.priceRange && (
                    <div className="ml-2 text-sm font-medium text-neutral-600 dark:text-neutral-400">
                      {Array(bar.priceRange).fill('$').join('')}
                    </div>
                  )}
                </div>

                {bar.hasHappyHour && (
                  <div className="flex items-center text-neutral-600 dark:text-neutral-400">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span className="text-xs">Happy Hour</span>
                  </div>
                )}
              </div>

              {!featured && bar.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {bar.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                  {bar.tags.length > 3 && (
                    <span className="text-xs px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-500 rounded-md">
                      +{bar.tags.length - 3} more
                    </span>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

export default EnhancedBarCard;
