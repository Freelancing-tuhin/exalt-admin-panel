import React from "react";
import { Layout } from "../../layout/Layout";
import Navbar from "../../../components/main/navbar/Navbar";
import { EventCard } from "../../../components/shared/eventCard/EventCard";
import { useHeading } from "../../../contexts/headingContext";
import { useEffect, useRef, useState, useCallback } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { GradientHeader } from "../../../components/shared/gradientHeader/GradientHedaer";
import eventData from "../../../database/event.json";

// Improved Netflix-style horizontal scroller
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

  // Mouse drag / touch swipe support (scrub to scroll)
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
    el.scrollLeft = dragState.current.startScrollLeft - delta; // natural direction
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

  // Touch (fallback for older browsers – though pointer events cover most)
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
    <div className="relative group">
      {/* Left gradient */}
      {canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white/60 via-white/40 to-transparent pointer-events-none "></div>
      )}

      {/* Right gradient */}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white/60 via-white/40 to-transparent pointer-events-none "></div>
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
        <FiChevronLeft className="text-2xl text-gray-800" />
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
        <FiChevronRight className="text-2xl text-gray-800" />
      </button>

      {/* Scroll Container */}
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

// Create dynamic events object from JSON data
const events = {
  "Trending Events": eventData.map((event) => ({
    id: event.id,
    title: event.title,
    date: event.date,
    image: event.image,
    tags: event.tags || [],
  })),
};

const otherEvents = [
  {
    id: "1",
    title: "Wedding ceremony",
    date: "August 3rd, 2025",
    topic: "Hindu",
    category: "Wedding",
    priority: "Medium",
  },
  {
    id: "2",
    title: "Restaurant Grand Opening",
    date: "August 13th, 2025",
    topic: "Telegu",
    category: "Grand Opening",
    priority: "Low",
  },
  {
    id: "3",
    title: "Hotel Owner's Town Hall",
    date: "August 14th, 2025",
    topic: "Gujarati",
    category: "Town Hall",
    priority: "Low",
  },
  {
    id: "4",
    title: "Indian Cultural Festival",
    date: "September 3rd, 2025",
    topic: "General",
    category: "Festival",
    priority: "Medium",
  },
];

export const ClientEvents = () => {
  const { setHeading } = useHeading();
  const navigate = useNavigate();

  useEffect(() => {
    setHeading("Event");
  }, [setHeading]);

  const getCategoryColors = (category: string) => {
    switch (category) {
      case "Wedding":
        return "bg-green-500 text-white";
      case "Grand Opening":
        return "bg-amber-500 text-white";
      case "Town Hall":
        return "bg-blue-600 text-white";
      case "Festival":
        return "bg-red-500 text-white";
      default:
        return "bg-violet-200 text-white";
    }
  };

  const getPriorityColors = (priority: string) => {
    switch (priority) {
      case "Medium":
        return "bg-blue-600 text-white";
      case "Low":
        return "bg-green-500 text-white";
      default:
        return "bg-red-500 text-white";
    }
  };

  return (
    <Layout>
      <Navbar />
      <div className="p-6 space-y-6 h-[90vh] overflow-y-scroll px-6">
        <GradientHeader title="Events" />
        {/* Category Cards */}
        {Object.entries(events).map(([category, eventsList], idx) => (
          <div key={idx}>
            <h2 className="text-lg text-gray-800 font-semibold mb-4">
              {category}
            </h2>
            <HorizontalScroller>
              {eventsList.map((event, index) => (
                <div key={index} className="flex-none w-64 md:w-72 lg:w-100">
                  <EventCard
                    title={event.title}
                    date={event.date}
                    image={event.image}
                    tags={event.tags}
                    onClick={() =>
                      navigate(`/client/events/detail/${event.id}`)
                    }
                  />
                </div>
              ))}
            </HorizontalScroller>
          </div>
        ))}

        {/* Other Events */}
<div>
  {/* Section Title */}
  <h2 className="text-xl text-gray-700 font-semibold mb-4 tracking-wide">
    Other Upcoming Events
  </h2>

  {/* Card Container */}
  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
    {/* Table Header */}
    <div className="grid grid-cols-[70fr_15fr_15fr_15fr] gap-x-4 items-center text-sm font-semibold text-gray-600 border-b border-gray-200 pb-3 mb-3">
      <div className="flex">
        <span className="font-bold text-lg w-32">
          Event <span className="text-gray-400">Date</span>
        </span>
      </div>
      <span className="text-end font-bold text-lg w-32">Category</span>
      <span className="text-end font-bold text-lg w-32">Priority</span>
      <span className="text-end font-bold text-lg w-32">Culture</span>
    </div>

    {/* Event Rows */}
    <div className="space-y-2">
      {otherEvents.map((event, index) => {
        // Decide gradient for priority
        let priorityClass = "";
        if (event.priority.toLowerCase() === "high") {
          priorityClass =
            "bg-gradient-to-r from-red-50 to-red-100 text-red-700 border-red-200";
        } else if (event.priority.toLowerCase() === "medium") {
          priorityClass =
            "bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 border-amber-200";
        } else if (event.priority.toLowerCase() === "low") {
          priorityClass =
            "bg-gradient-to-r from-green-50 to-green-100 text-green-700 border-green-200";
        } else {
          priorityClass =
            "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 border-gray-200";
        }

        return (
          <div
            key={event.id}
            className={`grid grid-cols-[70fr_15fr_15fr_15fr] gap-x-4 items-center text-sm text-gray-800 rounded-xl p-3 transition-all duration-200 ${
              index % 2 === 0 ? "bg-gray-50" : "bg-white"
            } hover:bg-gray-100 hover:shadow-sm`}
          >
            {/* Event Info */}
            <div className="flex items-center flex-wrap gap-x-3 gap-y-1">
              <span className="font-medium">{event.title}</span>
              <span className="text-gray-400 text-xs">• {event.date}</span>
            </div>

            {/* Category */}
            <span
              className={`justify-self-center w-28 h-8 flex items-center justify-center text-xs rounded-md font-medium border
              bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-blue-200`}
            >
              {event.category}
            </span>

            {/* Priority */}
            <span
              className={`justify-self-center w-28 h-8 flex items-center justify-center text-xs rounded-md font-medium border ${priorityClass}`}
            >
              {event.priority}
            </span>

            {/* Culture */}
            <span
              className={`justify-self-center w-28 h-8 flex items-center justify-center text-xs rounded-md font-medium border
              bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 border-purple-200`}
            >
              {event.topic}
            </span>
          </div>
        );
      })}
    </div>
  </div>
</div>



      </div>
    </Layout>
  );
};
