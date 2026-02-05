"use client";

import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import storeData from "@/data/stores.json";

export default function StoreLocator() {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<any>(null);

    useEffect(() => {
        // Only run on client side
        if (typeof window === "undefined") return;

        // Import Leaflet dynamically to avoid SSR issues
        import("leaflet").then((L) => {
            // Clean up any existing map instance
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }

            // Ensure we have a container
            if (!mapContainerRef.current) return;

            // Create the map
            const map = L.map(mapContainerRef.current).setView([-1.9441, 30.0619], 8);
            mapInstanceRef.current = map;

            // Add tile layer
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map);

            // Custom icon
            const customIcon = L.icon({
                iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
                shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41],
            });

            // Add markers
            const stores = (storeData as any).features;
            stores.forEach((store: any) => {
                const [lng, lat] = store.geometry.coordinates;
                const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

                // Create popup content
                let popupContent = `<div style="padding: 8px; min-width: 200px;">
          <h3 style="font-weight: bold; font-size: 1.125rem; color: #005499; margin: 0 0 4px 0;">${store.properties.name}</h3>`;

                if (store.properties.description) {
                    popupContent += `<p style="font-size: 0.875rem; color: #4b5563; margin: 4px 0;">${store.properties.description}</p>`;
                }

                if (store.properties.phone) {
                    popupContent += `<p style="font-size: 0.875rem; font-weight: 500; margin: 8px 0 0 0;">📞 <a href="tel:${store.properties.phone}">${store.properties.phone}</a></p>`;
                }

                if (store.properties.hours) {
                    popupContent += `<p style="font-size: 0.75rem; color: #6b7280; margin: 4px 0 0 0;">🕒 ${store.properties.hours}</p>`;
                }

                popupContent += `</div>`;

                marker.bindPopup(popupContent);
            });
        });

        // Cleanup function
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []); // Empty dependency array means this runs once on mount

    return (
        <div
            ref={mapContainerRef}
            className="w-full h-[600px] z-0 relative rounded-2xl overflow-hidden shadow-lg border-4 border-white/20"
        />
    );
}
