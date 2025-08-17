import React, { useRef, useState, useCallback, useEffect } from "react";
import articlesData from "../../../../database/events.json";
import { ViralCard2 } from "../../../shared/viralCards/ViralCard2";

// Netflix-style horizontal scroller from ClientEvents
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
      console.log("Error releasing pointer capture");
    }
  };

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
    <div className="relative ">
      {canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white/60 via-white/40 to-transparent pointer-events-none "></div>
      )}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white/60 via-white/40 to-transparent pointer-events-none "></div>
      )}
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
        <span className="text-2xl text-gray-800">&#8249;</span>
      </button>
      <button
        aria-label="Scroll right"
        onClick={() => scrollByAmount(1)}
        className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition 
          ${
            canScrollRight
              ? "bg-gradient-to-br  from-gray-100 to-gray-200 hover:bg-gray-100 cursor-pointer"
              : "bg-gray-200 opacity-0 cursor-not-allowed"
          }`}
      >
        <span className="text-2xl text-gray-800">&#8250;</span>
      </button>
      <div
        ref={containerRef}
        className={`flex flex-nowrap overflow-x-auto space-x-4 pb-4 hidescroll scrollbar-thin scrollbar-thumb-gray-300 scroll-smooth select-none ${
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

export const HolidayList = () => {
  const viralDiscussions = articlesData.slice(0, 8);

  return (
    <div>
      <div className="">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Current Events
        </h2>
        <HorizontalScroller>
          {viralDiscussions.map((item, i) => (
            <ViralCard2 item={item} i={i} key={i} viralp={false} />
          ))}
        </HorizontalScroller>
      </div>
    </div>
  );
};
