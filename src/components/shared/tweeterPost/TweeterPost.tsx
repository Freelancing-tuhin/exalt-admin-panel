/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Tweet } from "react-tweet";
import { useEffect, useRef, useState, useCallback } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Horizontal scroller component (same as in ClientEvents)
const HorizontalScroller: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef<{ startX: number; startScrollLeft: number }>({
    startX: 0,
    startScrollLeft: 0,
  });

  const updateScrollState = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollByAmount = (dir: number) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.9), behavior: "smooth" });
  };

  // Mouse drag / touch swipe support
  const onPointerDown = (e: React.PointerEvent) => {
    const el = containerRef.current;
    if (!el) return;
    setIsDragging(true);
    dragState.current.startX = e.clientX;
    dragState.current.startScrollLeft = el.scrollLeft;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const el = containerRef.current;
    if (!el) return;
    const delta = e.clientX - dragState.current.startX;
    el.scrollLeft = dragState.current.startScrollLeft - delta;
  };

  const endDrag = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture already released
    }
  };

  // Touch support
  const onTouchStart = (e: React.TouchEvent) => {
    const el = containerRef.current;
    if (!el) return;
    setIsDragging(true);
    dragState.current.startX = e.touches[0].clientX;
    dragState.current.startScrollLeft = el.scrollLeft;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const el = containerRef.current;
    if (!el) return;
    const delta = e.touches[0].clientX - dragState.current.startX;
    el.scrollLeft = dragState.current.startScrollLeft - delta;
  };
  const onTouchEnd = () => setIsDragging(false);

  return (
    <div className="relative group bg-white  px-4 rounded-lg">
      {/* Left gradient */}
      {canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white/60 via-white/40 to-transparent pointer-events-none z-5"></div>
      )}

      {/* Right gradient */}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white/60 via-white/40 to-transparent pointer-events-none z-5"></div>
      )}

      {/* Scroll Buttons */}
      <button
        aria-label="Scroll left"
        onClick={() => scrollByAmount(-1)}
        className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition 
          ${
            canScrollLeft
              ? "bg-gradient-to-br from-gray-100 to-gray-200 hover:bg-gray-100 cursor-pointer"
              : "bg-gray-200 opacity-0 cursor-not-allowed"
          }`}
      >
        <FiChevronLeft className="text-2xl text-gray-900" />
      </button>

      <button
        aria-label="Scroll right"
        onClick={() => scrollByAmount(1)}
        className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition 
          ${
            canScrollRight
              ? "bg-gradient-to-br from-gray-100 to-gray-200 hover:bg-gray-100 cursor-pointer"
              : "bg-gray-200 opacity-0 cursor-not-allowed"
          }`}
      >
        <FiChevronRight className="text-2xl text-gray-900" />
      </button>

      {/* Scroll Container */}
      <div
        ref={containerRef}
        className={`flex pl-8 flex-nowrap overflow-x-auto space-x-4 pb-4 hidescroll 
          scrollbar-thin scrollbar-thumb-gray-300 scroll-smooth select-none ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
      >
        {children}
      </div>
    </div>
  );
};

export const TweeterPost = ({ title, tweetIds }: any) => {
  console.log("====> tweetIds:", tweetIds);

  return (
    <div className="mt-10 p-4 bg-gray-200 rounded-xl">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>

      {/* Global CSS for tweet customization */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .tweet-small-light [data-theme] {
            --tweet-font-size: 12px !important;
            --tweet-line-height: 1.3 !important;
            --tweet-body-font-size: 11px !important;
          }
          
          .tweet-small-light [data-theme="light"] {
            --tweet-bg-color: # !important;
            --tweet-border-color: #e5e7eb !important;
            --tweet-text-color: #374151 !important;
            --tweet-secondary-text-color: #6b7280 !important;
            
          }
          
          .tweet-small-light .react-tweet-theme {
            font-size: 14px !important;
            transform: scale(0.9);
            transform-origin: top left;
            max-width: 450px !important;

          }
          
          .tweet-small-light .react-tweet-theme * {
            font-size: 18px !important;
            line-height: 1.3 !important;
          }
          
          .tweet-small-light [data-testid="tweet"] {
            background-color: #d4d4d4ff !important;
            border: 1px solid #e5e7eb !important;
            border-radius: 12px !important;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
            padding: 12px !important;
            max-width: 300px !important;

          }
          
          .tweet-small-light [data-testid="tweetText"] {
            font-size: 11px !important;
            color: #1f2937 !important;
            line-height: 1.4 !important;
            
          }
          
          .tweet-small-light [data-testid="tweetAuthor"] {
            font-size: 12px !important;
            color: #374151 !important;
          }
          
          .tweet-small-light time {
            font-size: 10px !important;
            color: #6b7280 !important;
          }
            .tweet-small-light{
              // max-width: 400px !important;
              margin: 0 2px !important;
              
            }
        `,
        }}
      />

      <HorizontalScroller>
        {tweetIds &&
          tweetIds.map((tweetId: any) => (
            <div
              key={tweetId}
              className="bg-white p-4 flex-none tweet-small-light"
            >
              <div data-theme="light" className="w-96 -ml-12">
                <Tweet id={tweetId} />
              </div>
            </div>
          ))}
      </HorizontalScroller>
    </div>
  );
};
