'use client';

import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
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
  const [showMap, setShowMap] = useState(false);

  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Lazy-load map when user scrolls
  /* useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [showMap]); */

  return (
    <div className="flex flex-col lg:flex-row-reverse">
      {/* Map Section */}
      <div className="w-full lg:w-2/3 h-[400px] lg:h-[600px]">
        {showMap ? (
          <MapContainer
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
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
            <button
               className="rounded-md bg-[#005499] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              onClick={() => {
              setShowMap(true); // Ensure map shows when clicking store
            }}>Load Map</button>
          </div>
        )}
      </div>

      {/* Store List Section */}
      <div className="w-full lg:w-1/3 p-4 lg:p-8 flex flex-col max-h-[80vh] lg:max-h-[calc(100vh-4rem)] overflow-hidden">
        <h2 className="text-xl font-semibold mb-4">Search for a Jibustore</h2>

        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md bg-gray-200"
        />

        {/* Scrollable list */}
        <ul className="space-y-4 overflow-y-auto pr-2 flex-1 overscroll-contain">
          {filteredStores.length > 0 ? (
            filteredStores.map((store, index) => (
              <li
                key={index}
                className="border-b pb-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
                onClick={() => {
                  setSelectedPosition(store.position);
                  setShowMap(true);
                }}
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
