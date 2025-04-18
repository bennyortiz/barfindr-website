"use client";

import { PageLayout } from "@/components/layout/page-layout";
import { bars } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Navigation } from "lucide-react";
import { SimpleMap } from "@/components/map/SimpleMap";

export default function MapPage() {
  return (
    <PageLayout>
          <div className="flex flex-col gap-4 sm:gap-6">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Bar Map</h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">
                Find bars near you in Austin, TX
              </p>
            </div>

            <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="aspect-[4/3] w-full">
                  <SimpleMap
                    bars={bars}
                    height="100%"
                  />
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-lg sm:text-xl font-semibold">Bars Near You</h2>
                <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1">
                  {bars.slice(0, 4).map((bar) => (
                    <Card key={bar.id}>
                      <CardHeader className="p-3 sm:p-4">
                        <CardTitle className="text-base sm:text-lg">{bar.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1 text-xs sm:text-sm">
                          <MapPin className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">{bar.address}</span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-3 sm:p-4 pt-0">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full gap-1 sm:gap-2 text-xs sm:text-sm"
                          onClick={() => {
                            // Create Google Maps URL
                            const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(bar.address)}`;
                            // Open in a new tab
                            window.open(googleMapsUrl, '_blank');
                          }}
                        >
                          <Navigation className="h-3 w-3" />
                          Get Directions
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
    </PageLayout>
  );
}
