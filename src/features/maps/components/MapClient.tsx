/**
 * MapClient Component
 * 
 * Client-side map component that renders the interactive Leaflet map.
 * This component is dynamically imported with no SSR to avoid window reference errors.
 * 
 * @component
 */

"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { Bar } from "@/lib/types";
import "leaflet/dist/leaflet.css";
import "@/styles/leaflet-fixes.css"; // Import our custom fixes

/**
 * Custom component to update map view when center/zoom changes
 */
function MapUpdater({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);

  return null;
}

// Fix for Leaflet marker icons in Next.js
const customIcon = new L.Icon({
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface MapClientProps {
  /** Array of bars to display on the map */
  bars: Bar[];
  /** Center coordinates for the map [latitude, longitude] */
  center: [number, number];
  /** Zoom level for the map */
  zoom: number;
  /** Height of the map container */
  height: string;
  /** Whether this is a single bar detail view */
  singleBar: boolean;
}

export function MapClient({
  bars,
  center,
  zoom,
  height,
  singleBar
}: MapClientProps) {
  // Use a ref to track if the component is mounted
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return (
    <div className="map-container rounded-lg border overflow-hidden" style={{ height }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        key={`${center[0]}-${center[1]}-${zoom}`} // Add key to force re-render when these props change
      >
        {/* Add the MapUpdater component to handle view changes */}
        <MapUpdater center={center} zoom={zoom} />
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {bars.map((bar) => (
          <Marker
            key={bar.id}
            position={[bar.location.lat, bar.location.lng]}
            icon={customIcon}
          >
            <Popup>
              <div className="p-1">
                <h3 className="font-medium text-base">{bar.name}</h3>
                <p className="text-sm text-muted-foreground">{bar.address}</p>
                {!singleBar && (
                  <a
                    href={`/bars/${bar.id}`}
                    className="text-sm text-primary hover:underline mt-1 inline-block"
                  >
                    View Details
                  </a>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
