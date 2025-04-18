"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Bar } from "@/lib/types";

// Import Leaflet CSS
import "leaflet/dist/leaflet.css";

// Dynamically import the map component with no SSR
const MapComponent = dynamic(() => import("./map-internal"), {
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
});

interface SimpleMapProps {
  bars: Bar[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  singleBar?: boolean;
}

export function SimpleMap({
  bars,
  center = [30.27, -97.74],
  zoom = 12,
  height = "500px",
  singleBar = false
}: SimpleMapProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  if (!isMounted) {
    return (
      <div 
        className="w-full rounded-lg border bg-muted overflow-hidden"
        style={{ height }}
      >
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg border overflow-hidden" style={{ height }}>
      <MapComponent 
        bars={bars}
        center={center}
        zoom={zoom}
        singleBar={singleBar}
      />
    </div>
  );
}
