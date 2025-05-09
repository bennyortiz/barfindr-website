"use client";

import { useState } from "react";
import { getBar, getBarUrl } from "@/lib/bar-data";
import { Button } from "@/core/components/ui/button";
import { Badge } from "@/core/components/ui/badge";
import { MapPin, Navigation, Share2 } from "lucide-react";
import { BarRatings } from "@/features/bars/components/BarRatings";
import { notFound, useParams } from "next/navigation";
import { DetailPage } from "@/core/components/layout/DetailPage";
import { Hero } from "@/core/components/ui/hero";
import { BarDetailTabs } from "@/features/bars/components/BarDetailTabs";
import { toast } from "sonner";
import { SimpleMap } from "@/features/maps/components/SimpleMap";
import { generateBarStructuredData } from "@/lib/structured-data";
import Script from "next/script";

/**
 * Bar detail page component
 *
 * Displays detailed information about a specific bar, including:
 * - Hero image with bar name, tags, and basic info
 * - Tabs for different sections of content (about, menu, events, reviews)
 * - Sidebar with location map and sharing options
 */
export default function BarDetailPage() {
  // Get the slug from the URL params
  const params = useParams();
  // Convert params.id to string to ensure type safety
  const idOrSlug = String(params.id);
  // Try to find the bar by ID or slug (for backward compatibility)
  const bar = getBar(idOrSlug);

  // State to track if a share operation is in progress
  const [isSharing, setIsSharing] = useState(false);

  if (!bar) {
    notFound();
  }

  // Hero content with bar information
  const heroContent = (
    <div className="flex flex-col gap-2 sm:gap-3">
      <div className="flex flex-wrap items-center gap-2">
        {bar.hasHappyHour && (
          <Badge className="bg-primary text-primary-foreground text-xs sm:text-sm py-1 px-3">Happy Hour</Badge>
        )}
        {bar.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs sm:text-sm py-1 px-3">
            {tag}
          </Badge>
        ))}
      </div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">{bar.name}</h1>
      <div className="flex flex-wrap items-center gap-3 sm:gap-5">
        <div className="flex items-center gap-1.5">
          <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
          <span className="text-sm sm:text-base text-muted-foreground truncate max-w-[200px] sm:max-w-none">{bar.address}</span>
        </div>
        <BarRatings bar={bar} />
      </div>
    </div>
  );

  // Generate structured data for SEO
  const structuredData = generateBarStructuredData(
    bar,
    getBarUrl(bar, true) // Get absolute URL
  );

  return (
    <>
      {/* Add structured data for SEO */}
      <Script
        id="bar-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <DetailPage
        hero={
          <Hero
            imageUrl={bar.imageUrl}
            imageAlt={`${bar.name} - Bar in Austin`}
            height="50vh"
            contentPosition="bottom"
          >
            {heroContent}
          </Hero>
        }
      >
      <div className="flex flex-col gap-8 md:gap-10 lg:flex-row lg:gap-12">
        <div className="flex-1">
          <BarDetailTabs bar={bar} />
        </div>

        <div className="lg:w-96 space-y-6 sm:space-y-8">
          <div className="rounded-lg border bg-card p-5 sm:p-6 shadow-sm">
            <h3 className="text-lg sm:text-xl font-medium mb-4 sm:mb-5">Location</h3>
            <div className="aspect-video rounded-md mb-4 sm:mb-5 overflow-hidden shadow-sm relative">
              <div className="relative z-0 w-full h-full">
                <SimpleMap
                  bars={[bar]}
                  center={[bar.location.lat, bar.location.lng]}
                  zoom={15}
                  height="100%"
                  singleBar={true}
                />
              </div>
            </div>
            <Button
              className="w-full gap-2 text-base py-6 rounded-md hover:bg-primary/90 transition-colors"
              onClick={() => {
                // Create Google Maps URL
                const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(bar.address)}`;
                // Open in a new tab
                window.open(googleMapsUrl, '_blank');
              }}
            >
              <Navigation className="h-4 w-4 sm:h-5 sm:w-5" />
              Get Directions
            </Button>
          </div>

          <div className="rounded-lg border bg-card p-5 sm:p-6 shadow-sm">
            <h3 className="text-lg sm:text-xl font-medium mb-4 sm:mb-5">Share</h3>
            <Button
              variant="outline"
              className="w-full gap-2 text-base py-6 rounded-md hover:bg-primary/10 hover:text-primary transition-colors"
              disabled={isSharing}
              onClick={() => {
                // Prevent multiple share operations
                if (isSharing) {
                  return;
                }

                // Set sharing flag
                setIsSharing(true);

                // Create the URL to share
                const shareUrl = window.location.href;

                // Try to use the Web Share API if available
                if (navigator.share) {
                  navigator.share({
                    title: `${bar.name} - BarFindr`,
                    text: `Check out ${bar.name} on BarFindr!`,
                    url: shareUrl,
                  })
                  .then(() => {
                    toast.success('Shared successfully');
                    // Reset sharing flag after successful share
                    setIsSharing(false);
                  })
                  .catch((error) => {
                    console.error('Error sharing:', error);
                    // Reset sharing flag after error
                    setIsSharing(false);
                    // Only use fallback if it's not a user abort
                    if (error.name !== 'AbortError') {
                      fallbackShare();
                    }
                  });
                } else {
                  fallbackShare();
                }

                // Fallback for browsers that don't support the Web Share API
                function fallbackShare() {
                  navigator.clipboard.writeText(shareUrl)
                    .then(() => {
                      toast.success('Link copied to clipboard!');
                      // Reset sharing flag
                      setIsSharing(false);
                    })
                    .catch((error) => {
                      console.error('Error copying to clipboard:', error);
                      toast.error('Could not copy link');
                      // Reset sharing flag
                      setIsSharing(false);
                    });
                }
              }}
            >
              {isSharing ? (
                <>
                  <div className="h-4 w-4 sm:h-5 sm:w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Sharing...
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
                  Share this Bar
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </DetailPage>
    </>
  );
}
