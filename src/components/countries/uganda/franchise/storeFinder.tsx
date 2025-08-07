'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


export interface Store {
  name: string;
  address: string;
  position: [number, number];
}

interface StoreLocatorProps {
  stores: Store[];
  center?: [number, number];
  zoom?: number;
  country?: string;
}

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Helper component to recenter map
function RecenterMap({ position }: { position: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position, map.getZoom());
  }, [position, map]);
  return null;
}

export default function StoreLocator({ stores, center, zoom = 13, country }: StoreLocatorProps) {
  const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /*
  // Cleanup map container on unmount
  useEffect(() => {
    return () => {
      const container = L.DomUtil.get('map'); // the map container div
      if (container && container._leaflet_id) {
        container._leaflet_id = null; // reset map instance
      }
    };
  }, []);
  */

  return (
    <div className="flex flex-col lg:flex-row-reverse">
      {/* Map Section */}
      <div className="w-full lg:w-2/3 h-[400px] lg:h-[600px]">
        <MapContainer
          key={country}
          id="map"
          center={center || [0, 0]}
          zoom={zoom}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />

          {filteredStores.map((store, index) => (
            <Marker key={index} position={store.position} icon={markerIcon}>
              <Popup>
                <h3 className="font-bold">{store.name}</h3>
                <p>{store.address}</p>
              </Popup>
            </Marker>
          ))}
          {selectedPosition && <RecenterMap position={selectedPosition} />}
        </MapContainer>
      </div>

      {/* Store List Section */}
      <div className="w-full lg:w-1/3 p-4 lg:p-8">
        <h2 className="text-xl font-semibold mb-4">Search for a Jibustore</h2>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md bg-gray-200"
        />
        <ul className="space-y-4">
          {filteredStores.length > 0 ? (
            filteredStores.map((store, index) => (
              <li
                key={index}
                className="border-b pb-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
                onClick={() => setSelectedPosition(store.position)}
              >
                <p className="font-bold">{store.name}</p>
                <p className="text-sm">{store.address}</p>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No stores found.</p>
          )}
        </ul>
      </div>
    </div>
  );
}
