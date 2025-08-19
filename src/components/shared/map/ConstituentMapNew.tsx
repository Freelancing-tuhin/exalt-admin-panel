import React, { useState } from "react";
import { FiMaximize2, FiX } from "react-icons/fi";
import { createPortal } from "react-dom";

interface ConstituentMapProps {
  embedded?: boolean;
  heightClass?: string;
}

const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps/embed/v1/place?key=AIzaSyD1jZREq84uPwaeeEFf_Kgq2RAgDMIiIf8&q=New+Jersey";

export const ConstituentMap: React.FC<ConstituentMapProps> = ({
  embedded = false,
}) => {
  const [showFullscreen, setShowFullscreen] = useState(false);

  // Fullscreen modal content
  const fullscreenMap = (
    <div
      className="fixed inset-0 flex flex-col bg-black/70 backdrop-blur-sm z-[9999]"
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
        <iframe
          src={GOOGLE_MAPS_EMBED_URL}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="New Jersey Map - Fullscreen"
        />
      </div>
    </div>
  );

  if (embedded) {
    return (
      <>
        <div className="relative w-1/2 p-2 bg-gray-800 rounded-xl bg-slate-800/20 backdrop-blur-sm shadow-lg overflow-hidden border border-purple-200/40">
          <iframe
            src={GOOGLE_MAPS_EMBED_URL}
            width="100%"
            height="300"
            style={{ border: 0, borderRadius: "8px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="New Jersey Map - Embedded"
          />
          <button
            onClick={() => setShowFullscreen(true)}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-700 p-2 rounded-lg shadow-md transition-all duration-200 backdrop-blur-sm"
            aria-label="Open fullscreen map"
          >
            <FiMaximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Fullscreen modal via portal */}
        {showFullscreen && createPortal(fullscreenMap, document.body)}
      </>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">NEW JERSEY</h2>
        <div className="flex flex-col gap-4">
          <div className="group relative w-full h-95 rounded-lg overflow-hidden shadow-md border border-gray-200">
            <iframe
              src={GOOGLE_MAPS_EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: "8px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="New Jersey Map"
            />
            <button
              onClick={() => setShowFullscreen(true)}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-700 p-2 rounded-lg shadow-md transition-all duration-200 backdrop-blur-sm"
              aria-label="Open fullscreen map"
            >
              <FiMaximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Fullscreen modal via portal */}
        {showFullscreen && createPortal(fullscreenMap, document.body)}
      </div>
    </>
  );
};
