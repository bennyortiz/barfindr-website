/**
 * Map Component
 * 
 * Main map component that handles client-side rendering of the map.
 * This is a wrapper around the MapClient component that handles dynamic imports.
 * 
 * @component
 */

"use client";

import { useEffect, useState, useMemo, memo } from "react";
import { Bar } from "@/lib/types";
import dynamic from "next/dynamic";

// Create a dynamic map component with no SSR
// This is more efficient than importing individual components
const MapWithNoSSR = dynamic(
  () => import("./MapClient").then((mod) => mod.MapClient),
  { 
    ssr: false,
    loading: ({ height }: { height: string }) => (
      <div 
        className="w-full rounded-lg border bg-muted overflow-hidden"
        style={{ height }}
      >
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Loading map...</p>
        </div>
      </div>
    )
  }
);

interface MapProps {
  /** Array of bars to display on the map */
  bars: Bar[];
  /** Center coordinates for the map [latitude, longitude] */
  center?: [number, number];
  /** Zoom level for the map */
  zoom?: number;
  /** Height of the map container */
  height?: string;
  /** Whether this is a single bar detail view */
  singleBar?: boolean;
}

// Memoize the Map component to prevent unnecessary re-renders
export const Map = memo(function Map({ 
  bars, 
  center = [30.27, -97.74], // Default center (Austin, TX)
  zoom = 12,
  height = "500px",
  singleBar = false
}: MapProps) {
  // Use useMemo to ensure stable props for the MapWithNoSSR component
  const mapProps = useMemo(() => ({
    bars,
    center,
    zoom,
    height,
    singleBar
  }), [bars, center, zoom, height, singleBar]);

  return <MapWithNoSSR {...mapProps} />;
});
