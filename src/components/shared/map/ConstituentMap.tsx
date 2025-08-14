import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";
import { FiMaximize2, FiX } from "react-icons/fi";

interface MarkerItem {
  lat: number;
  lng: number;
  label: string;
  color: string; // used for custom marker (can become a pin color parameter)
}

// Demo marker data (can later be fetched or passed as props)
const markerData: MarkerItem[] = [
  { lat: 38.9, lng: -95.2, label: "Region Alpha - 1", color: "#4F46E5" },
  { lat: 38.4, lng: -95.7, label: "Region Alpha - 2", color: "#4F46E5" },
  { lat: 38.7, lng: -96.1, label: "Region Beta - 1", color: "#F59E0B" },
  { lat: 38.2, lng: -95.9, label: "Region Gamma - 1", color: "#10B981" },
  { lat: 38.55, lng: -95.35, label: "Region Gamma - 2", color: "#10B981" },
];

const containerStyle: React.CSSProperties = { width: "100%", height: "100%" };

const center = { lat: 38.5, lng: -95.5 };

// Optional: customizing map styles (empty for now)
const mapOptions = {
  disableDefaultUI: false,
  fullscreenControl: false,
  streetViewControl: false,
};

interface ConstituentMapProps {
  embedded?: boolean; // if true, renders only the map card content (for header usage)
  heightClass?: string; // tailwind height override
}

export const ConstituentMap: React.FC<ConstituentMapProps> = ({
  embedded = false,
  // heightClass = "h-72",
}) => {
  const { isLoaded, loadError } = useLoadScript({
    // Expect a Vite env var like VITE_GOOGLE_MAPS_API_KEY (user must provide)
    googleMapsApiKey: "AIzaSyD1jZREq84uPwaeeEFf_Kgq2RAgDMIiIf8" as string,
  });

  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const [showFullscreen, setShowFullscreen] = useState(false);

  // Legend items: unique groups from marker labels + requested static languages
  const legendItems = useMemo(() => {
    const dynamicGroups = markerData
      .filter(
        (item, i, arr) =>
          arr.findIndex(
            (t) => t.label.split(" ")[0] === item.label.split(" ")[0]
          ) === i
      )
      .map((m) => ({ name: m.label.split(" ")[0], color: m.color }));

    const staticGroups: { name: string; color: string }[] = [
      { name: "Gujarati", color: "#f97316" }, // orange
      { name: "Marathi", color: "#6366f1" }, // indigo
      { name: "Tamil", color: "#10b981" }, // green
    ];

    const existing = new Set(dynamicGroups.map((g) => g.name.toLowerCase()));
    staticGroups.forEach((s) => {
      if (!existing.has(s.name.toLowerCase())) dynamicGroups.push(s);
    });
    return dynamicGroups;
  }, []);

  const handleMarkerClick = useCallback((label: string) => {
    setActiveMarker(label);
  }, []);

  const handleMapClick = useCallback(() => setActiveMarker(null), []);

  // Close on ESC when fullscreen
  useEffect(() => {
    if (!showFullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowFullscreen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showFullscreen]);

  const fullscreenMap = (
    <div
      className="fixed inset-0 flex flex-col bg-black/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-between px-6 py-4 text-white">
        <h2 className="text-lg font-semibold">Map – Fullscreen View</h2>
        <button
          onClick={() => setShowFullscreen(false)}
          aria-label="Close fullscreen map"
          className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 transition"
        >
          <FiX className="text-xl" />
        </button>
      </div>
      <div className="flex-1 relative">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={center}
          zoom={7}
          options={mapOptions}
          onClick={handleMapClick}
        >
          {markerData.map((marker) => (
            <Marker
              key={marker.label + "-full"}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => setActiveMarker(marker.label)}
              icon={{
                url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
                  `<svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="9" cy="9" r="7" fill="${marker.color}" stroke="#fff" stroke-width="2"/>
                  </svg>`
                )}`,
                scaledSize: isLoaded ? new google.maps.Size(18, 18) : undefined,
              }}
            >
              {activeMarker === marker.label && (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div className="font-semibold text-gray-800 text-sm">
                    {marker.label}
                    <p className="text-xs font-normal text-gray-600 mt-1">
                      Population data here...
                    </p>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ))}
        </GoogleMap>
        {/* Legend in fullscreen */}
        <div className="absolute bottom-4 left-6 bg-gray-200/95 backdrop-blur rounded-2xl px-5 py-2 shadow-md flex items-center gap-4 text-gray-800">
          <span className="font-semibold italic text-sm tracking-wide">
            Legend
          </span>
          {legendItems.map((item) => (
            <span
              key={item.name + "-full"}
              className="flex items-center gap-1 text-xs font-medium"
            >
              <span
                style={{
                  backgroundColor: item.color,
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  border: "1px solid #fff",
                  boxShadow: "0 0 2px rgba(0,0,0,0.4)",
                }}
              />
              {item.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  if (loadError) {
    return (
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <p className="text-sm text-red-600">Failed to load Google Maps.</p>
      </div>
    );
  }

  // Embedded variant (no outer section, legend overlay)
  if (embedded) {
    return (
      <div
        className={
          "relative w-1/2 ${heightClass} p-2 bg-gray-800 rounded-xl bg-slate-800/20 backdrop-blur-sm shadow-lg overflow-hidden border border-purple-200/40"
        }
      >
        {isLoaded ? (
          <>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={7}
              onClick={handleMapClick}
              options={mapOptions}
            >
              {markerData.map((marker) => (
                <Marker
                  key={marker.label}
                  position={{ lat: marker.lat, lng: marker.lng }}
                  onClick={() => handleMarkerClick(marker.label)}
                  icon={{
                    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
                      `<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="8" cy="8" r="6" fill="${marker.color}" stroke="#fff" stroke-width="2"/>
                      </svg>`
                    )}`,
                    scaledSize: isLoaded
                      ? new google.maps.Size(16, 16)
                      : undefined,
                  }}
                >
                  {activeMarker === marker.label && (
                    <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                      <div className="font-semibold text-gray-800 text-sm">
                        {marker.label}
                        <p className="text-xs font-normal text-gray-600 mt-1">
                          Population data here...
                        </p>
                      </div>
                    </InfoWindow>
                  )}
                </Marker>
              ))}
            </GoogleMap>
            <button
              type="button"
              aria-label="Open fullscreen map"
              onClick={() => setShowFullscreen(true)}
              className="absolute top-3 right-3  inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/85 hover:bg-white shadow-md border border-purple-200 text-purple-700 transition"
            >
              <FiMaximize2 />
            </button>
          </>
        ) : (
          <div className="flex items-center justify-center w-full h-full text-sm text-gray-100 bg-gradient-to-br from-purple-700 to-purple-900">
            Loading map...
          </div>
        )}

        {/* Legend overlay */}
        <div className="absolute bottom-4 left-4 bg-gray-200/90 backdrop-blur-sm rounded-2xl px-5 py-2 shadow-md flex items-center gap-4 text-gray-800">
          <span className="font-semibold italic text-sm tracking-wide">
            Legend
          </span>
          {legendItems.map((item) => (
            <span
              key={item.name}
              className="flex items-center gap-1 text-xs font-medium"
            >
              <span
                style={{
                  backgroundColor: item.color,
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  border: "1px solid #fff",
                  boxShadow: "0 0 2px rgba(0,0,0,0.4)",
                }}
              />
              {item.name}
            </span>
          ))}
        </div>
        {showFullscreen && fullscreenMap}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
      <h2 className="text-sm font-semibold text-gray-700 mb-3">STATE XYZ</h2>
      <div className="flex flex-col gap-4">
        <div className="group relative w-full h-95 rounded-lg overflow-hidden shadow-md border border-gray-200">
          {isLoaded ? (
            <>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={7}
                onClick={handleMapClick}
                options={mapOptions}
              >
                {markerData.map((marker) => (
                  <Marker
                    key={marker.label}
                    position={{ lat: marker.lat, lng: marker.lng }}
                    onClick={() => handleMarkerClick(marker.label)}
                    icon={{
                      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
                        `<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="8" cy="8" r="6" fill="${marker.color}" stroke="#fff" stroke-width="2"/>
                        </svg>`
                      )}`,
                      scaledSize: isLoaded
                        ? new google.maps.Size(16, 16)
                        : undefined,
                    }}
                  >
                    {activeMarker === marker.label && (
                      <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                        <div className="font-semibold text-gray-800 text-sm">
                          {marker.label}
                          <p className="text-xs font-normal text-gray-600 mt-1">
                            Population data here...
                          </p>
                        </div>
                      </InfoWindow>
                    )}
                  </Marker>
                ))}
              </GoogleMap>
              {/* <div className="pointer-events-none absolute inset-0 bg-black/40 opacity-100 transition-opacity duration-300 ease-out group-hover:opacity-0" /> */}
              <button
                type="button"
                aria-label="Open fullscreen map"
                onClick={() => setShowFullscreen(true)}
                className="absolute top-3 right-3  inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/85 hover:bg-white shadow-md border border-purple-200 text-purple-700 transition"
              >
                <FiMaximize2 />
              </button>
            </>
          ) : (
            <div className="flex items-center justify-center w-full h-full text-sm text-gray-500">
              Loading map...
            </div>
          )}
        </div>
        <div className="bg-white rounded-lg p-3 shadow-inner border border-gray-100">
          <span className="text-sm font-semibold text-gray-700 mb-2 block">
            LEGEND / Key
          </span>
          <div className="flex flex-wrap justify-around md:justify-start gap-x-6 gap-y-2 text-sm font-medium text-gray-700">
            {legendItems.map((item) => (
              <span key={item.name} className="flex items-center">
                <div
                  style={{
                    backgroundColor: item.color,
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    border: "2px solid #fff",
                    boxShadow: "0 0 2px rgba(0,0,0,0.4)",
                  }}
                  className="mr-1.5"
                ></div>
                {item.name}
              </span>
            ))}
          </div>
          <p className="mt-3 text-[10px] text-gray-400">
            Provide a Google Maps API key via VITE_GOOGLE_MAPS_API_KEY env var.
          </p>
        </div>
        {showFullscreen && fullscreenMap}
      </div>
    </div>
  );
};

export default ConstituentMap;
