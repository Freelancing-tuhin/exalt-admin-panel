import React, { useCallback, useMemo, useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";

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
const mapOptions: google.maps.MapOptions = {
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
  heightClass = "h-64",
}) => {
  const { isLoaded, loadError } = useLoadScript({
    // Expect a Vite env var like VITE_GOOGLE_MAPS_API_KEY (user must provide)
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
  });

  const [activeMarker, setActiveMarker] = useState<string | null>(null);

  const groupedLegend = useMemo(
    () =>
      markerData.filter(
        (item, i, arr) =>
          arr.findIndex(
            (t) => t.label.split(" ")[0] === item.label.split(" ")[0]
          ) === i
      ),
    []
  );

  const handleMarkerClick = useCallback((label: string) => {
    setActiveMarker(label);
  }, []);

  const handleMapClick = useCallback(() => setActiveMarker(null), []);

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
        className={`relative w-full ${heightClass} rounded-3xl bg-white shadow-lg overflow-hidden border border-purple-200/40`}
      >
        {isLoaded ? (
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
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 8,
                  fillColor: marker.color,
                  fillOpacity: 1,
                  strokeColor: "#fff",
                  strokeWeight: 2,
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
          {groupedLegend.map((marker) => (
            <span
              key={marker.label}
              className="flex items-center gap-1 text-xs font-medium"
            >
              <span
                style={{
                  backgroundColor: marker.color,
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  border: "1px solid #fff",
                  boxShadow: "0 0 2px rgba(0,0,0,0.4)",
                }}
              />
              {marker.label.split(" ")[0]}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
      <h2 className="text-sm font-semibold text-gray-700 mb-3">STATE XYZ</h2>
      <div className="flex flex-col gap-4">
        <div className="w-full h-95 rounded-lg overflow-hidden shadow-md border border-gray-200">
          {isLoaded ? (
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
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 8,
                    fillColor: marker.color,
                    fillOpacity: 1,
                    strokeColor: "#fff",
                    strokeWeight: 2,
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
            {groupedLegend.map((marker) => (
              <span key={marker.label} className="flex items-center">
                <div
                  style={{
                    backgroundColor: marker.color,
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    border: "2px solid #fff",
                    boxShadow: "0 0 2px rgba(0,0,0,0.4)",
                  }}
                  className="mr-1.5"
                ></div>
                {marker.label.split(" ")[0]}
              </span>
            ))}
          </div>
          <p className="mt-3 text-[10px] text-gray-400">
            Provide a Google Maps API key via VITE_GOOGLE_MAPS_API_KEY env var.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConstituentMap;
