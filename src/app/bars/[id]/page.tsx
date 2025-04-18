"use client";

import { useState, useRef } from "react";
import { bars } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Navigation, Share2, Check } from "lucide-react";
import { notFound } from "next/navigation";
import { PageLayout } from "@/components/layout/page-layout";
import { Container } from "@/components/ui/container";
import { BarDetailTabs } from "@/components/bars/BarDetailTabs";
import { use } from "react";
import { toast } from "sonner";
import { SimpleMap } from "@/components/map/SimpleMap";

interface BarDetailPageProps {
  params: {
    id: string;
  };
}

export default function BarDetailPage({ params }: BarDetailPageProps) {
  // Use React.use to unwrap the params Promise
  const unwrappedParams = use(params);
  // Convert params.id to string to ensure type safety
  const id = String(unwrappedParams.id);
  const bar = bars.find((b) => b.id === id);

  // State to track if a share operation is in progress
  const [isSharing, setIsSharing] = useState(false);

  if (!bar) {
    notFound();
  }

  return (
    <PageLayout fullWidth>
        <div className="relative h-[40vh] sm:h-[45vh] md:h-[50vh] w-full">
          <div className="absolute inset-0 bg-gradient-to-t from-background to-background/0 z-10" />
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url('${bar.imageUrl}')` }}
          />
          <Container className="absolute bottom-0 z-20 pb-8 md:pb-12">
            <div className="flex flex-col gap-2 sm:gap-3 max-w-3xl">
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
                <div className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-primary text-primary" />
                  <span className="text-sm sm:text-base font-medium">{bar.rating}</span>
                </div>
              </div>
            </div>
          </Container>
        </div>

        <Container className="py-8 sm:py-10 md:py-12">
          <div className="flex flex-col gap-8 md:gap-10 lg:flex-row lg:gap-12">
            <div className="flex-1">
              <BarDetailTabs bar={bar} />
            </div>

            <div className="lg:w-96 space-y-6 sm:space-y-8">
              <div className="rounded-lg border bg-card p-5 sm:p-6 shadow-sm">
                <h3 className="text-lg sm:text-xl font-medium mb-4 sm:mb-5">Location</h3>
                <div className="aspect-video rounded-md mb-4 sm:mb-5 overflow-hidden shadow-sm">
                  <SimpleMap
                    bars={[bar]}
                    center={[bar.location.lat, bar.location.lng]}
                    zoom={15}
                    height="100%"
                    singleBar={true}
                  />
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
        </Container>
    </PageLayout>
  );
}
