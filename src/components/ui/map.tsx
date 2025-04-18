"use client";

import { useMemo, memo } from "react";
import { Bar } from "@/lib/types";
import dynamic from "next/dynamic";

// Create a dynamic map component with no SSR
// This is more efficient than importing individual components
const MapWithNoSSR = dynamic(
  () => import("./map-client").then((mod) => mod.MapClient),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full rounded-lg border bg-muted overflow-hidden"
        style={{ height: "500px" }}
      >
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Loading map...</p>
        </div>
      </div>
    )
  }
);

interface MapProps {
  bars: Bar[];
  center?: [number, number];
  zoom?: number;
  height?: string;
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
