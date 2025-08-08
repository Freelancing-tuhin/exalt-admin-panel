import React from "react";
import { Layout } from "../../layout/Layout";
import Navbar from "../../../components/main/navbar/Navbar";
import { EventCard } from "../../../components/shared/eventCard/EventCard";
import { useHeading } from "../../../contexts/headingContext";
import { useEffect, useRef, useState, useCallback } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// Improved Netflix-style horizontal scroller
const HorizontalScroller: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

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

  return (
    <div className="relative group">
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
              ? "bg-gradient-to-br from-purple-800 to-purple-900 hover:bg-gray-100 cursor-pointer"
              : "bg-gray-200 opacity-0 cursor-not-allowed"
          }`}
      >
        <FiChevronLeft className="text-2xl text-gray-100" />
      </button>

      <button
        aria-label="Scroll right"
        onClick={() => scrollByAmount(1)}
        className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition 
          ${
            canScrollRight
              ? "bg-gradient-to-br from-purple-800 to-purple-900 hover:bg-gray-100 cursor-pointer"
              : "bg-gray-200 opacity-0 cursor-not-allowed"
          }`}
      >
        <FiChevronRight className="text-2xl text-gray-100" />
      </button>

      {/* Scroll Container */}
      <div
        ref={containerRef}
        className="flex flex-nowrap overflow-x-auto space-x-4 pb-4 hidescroll scrollbar-thin scrollbar-thumb-gray-300 scroll-smooth"
      >
        {children}
      </div>
    </div>
  );
};

const events = {
  Cultural: [
    {
      id: "1",
      title: "Art Showcase",
      date: "January 13, 2025",
      image:
        "https://framerusercontent.com/images/tbaVws3GxXcXC30ecOGxIwev6Ak.png",
      tags: ["High", "Arts", "Hindu"],
    },
    {
      id: "2",
      title: "Choir Recital",
      date: "January 14, 2025",
      image:
        "https://framerusercontent.com/images/18Q56jhO4AoJjOTkDWg38hHPRM.png",
      tags: ["Music", "Telugu"],
    },
    {
      id: "3",
      title: "Choir Recital",
      date: "January 14, 2025",
      image:
        "https://framerusercontent.com/images/7iQtoM4DohgBigX8dSWtZew6qc.png",
      tags: ["Music", "Telugu"],
    },
    {
      id: "4",
      title: "Dance Performance",
      date: "January 26, 2025",
      image:
        "https://docs.londonstockexchange.com/sites/default/files/2022-05/lseg_terrace.jpg",
      tags: ["Music", "Gujarati"],
    },
    {
      id: "1",
      title: "Art Showcase",
      date: "January 13, 2025",
      image:
        "https://framerusercontent.com/images/tbaVws3GxXcXC30ecOGxIwev6Ak.png",
      tags: ["High", "Arts", "Hindu"],
    },
    {
      id: "2",
      title: "Choir Recital",
      date: "January 14, 2025",
      image:
        "https://framerusercontent.com/images/18Q56jhO4AoJjOTkDWg38hHPRM.png",
      tags: ["Music", "Telugu"],
    },
    {
      id: "3",
      title: "Choir Recital",
      date: "January 14, 2025",
      image:
        "https://framerusercontent.com/images/7iQtoM4DohgBigX8dSWtZew6qc.png",
      tags: ["Music", "Telugu"],
    },
    {
      id: "4",
      title: "Dance Performance",
      date: "January 26, 2025",
      image:
        "https://docs.londonstockexchange.com/sites/default/files/2022-05/lseg_terrace.jpg",
      tags: ["Music", "Gujarati"],
    },
  ],
  Political: [
    {
      id: "5",
      title: "No Kings Protest",
      date: "January 13, 2025",
      image:
        "https://framerusercontent.com/images/tbaVws3GxXcXC30ecOGxIwev6Ak.png",
      tags: ["Hindu"],
    },
    {
      id: "6",
      title: "Local Club",
      date: "January 14, 2025",
      image:
        "https://framerusercontent.com/images/18Q56jhO4AoJjOTkDWg38hHPRM.png",
      tags: ["Dinner", "General"],
    },
    {
      id: "7",
      title: "Hotel Owners Town Hall",
      date: "January 26, 2025",
      image:
        "https://framerusercontent.com/images/7iQtoM4DohgBigX8dSWtZew6qc.png",
      tags: ["General"],
    },
    {
      id: "5",
      title: "No Kings Protest",
      date: "January 13, 2025",
      image:
        "https://framerusercontent.com/images/tbaVws3GxXcXC30ecOGxIwev6Ak.png",
      tags: ["Hindu"],
    },
    {
      id: "6",
      title: "Local Club",
      date: "January 14, 2025",
      image:
        "https://framerusercontent.com/images/18Q56jhO4AoJjOTkDWg38hHPRM.png",
      tags: ["Dinner", "General"],
    },
    {
      id: "7",
      title: "Hotel Owners Town Hall",
      date: "January 26, 2025",
      image:
        "https://framerusercontent.com/images/7iQtoM4DohgBigX8dSWtZew6qc.png",
      tags: ["General"],
    },
  ],
  Religious: [
    {
      id: "8",
      title: "Christmas",
      date: "January 13, 2025",
      image:
        "https://framerusercontent.com/images/tbaVws3GxXcXC30ecOGxIwev6Ak.png",
      tags: ["Charity", "Hindu"],
    },
    {
      id: "9",
      title: "Easter",
      date: "January 14, 2025",
      image:
        "https://framerusercontent.com/images/18Q56jhO4AoJjOTkDWg38hHPRM.png",
      tags: ["Telugu"],
    },
    {
      id: "10",
      title: "Quanza",
      date: "January 26, 2025",
      image:
        "https://framerusercontent.com/images/7iQtoM4DohgBigX8dSWtZew6qc.png",
      tags: ["Service"],
    },
  ],
};

const otherEvents = [
  {
    id: "1",
    title: "X Y Wedding",
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

  const getCultureTagColors = () => {
    return "bg-gray-200 text-gray-700";
  };

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
        return "bg-gray-500 text-white";
    }
  };

  const getPriorityColors = (priority: string) => {
    switch (priority) {
      case "Medium":
        return "bg-blue-600 text-white";
      case "Low":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <Layout>
      <Navbar />
      <div className="p-6 space-y-6 h-[90vh] overflow-y-scroll px-6">
        {/* Category Cards */}
        {Object.entries(events).map(([category, eventsList], idx) => (
          <div key={idx}>
            <h2 className="text-sm text-gray-500 font-semibold mb-4">
              {category}
            </h2>
            <HorizontalScroller>
              {eventsList.map((event, index) => (
                <div key={index} className="flex-none w-64 md:w-72 lg:w-80">
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
          <h2 className="text-sm text-gray-500 font-semibold mb-4">
            Other Upcoming Events
          </h2>
          <div className="bg-gray-100 p-4 rounded-lg space-y-3">
            <div className="grid grid-cols-[80fr_10fr_10fr] gap-x-4 items-center text-sm font-semibold text-gray-700 mb-4">
              <div className="flex gap-4 text-xl">
                <span>Event</span>
                <span>Date</span>
                <span>Culture</span>
              </div>
              <span className="justify-self-end px-2 py-0.5 rounded-full font-medium font semi-bold text-xl">
                Category
              </span>
              <span className="justify-self-end px-2 py-0.5 rounded-full font-medium semi-bold text-xl">
                Priority
              </span>
            </div>

            {otherEvents.map((event) => (
              <div
                key={event.id}
                className="grid grid-cols-[80fr_10fr_10fr] gap-x-4 items-center text-sm text-gray-800"
              >
                <div className="flex items-center flex-wrap gap-x-2 gap-y-1">
                  <span className="font-semibold">{event.title}</span>
                  <span className="text-gray-500">• {event.date}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${getCultureTagColors()}`}
                  >
                    {event.topic}
                  </span>
                </div>
                <span
                  className={`justify-self-end text-xs px-2 py-0.5 rounded-full font-medium ${getCategoryColors(
                    event.category
                  )}`}
                >
                  {event.category}
                </span>
                <span
                  className={`justify-self-end text-xs px-2 py-0.5 rounded-full font-medium ${getPriorityColors(
                    event.priority
                  )}`}
                >
                  {event.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
