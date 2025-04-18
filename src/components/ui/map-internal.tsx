"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { Bar } from "@/lib/types";

// Custom component to update map view when center/zoom changes
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

interface MapInternalProps {
  bars: Bar[];
  center: [number, number];
  zoom: number;
  singleBar: boolean;
}

export default function MapInternal({ 
  bars, 
  center,
  zoom,
  singleBar
}: MapInternalProps) {
  // Use a ref to track if the component is mounted
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "100%", width: "100%" }}
      key={`${center[0]}-${center[1]}-${zoom}`}
    >
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
  );
}
