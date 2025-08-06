import { Layout } from "../../layout/Layout";
import Navbar from "../../../components/main/navbar/Navbar";
import { useHeading } from "../../../contexts/headingContext";
import { useEffect } from "react";

const filterChips = [
  "Date Filter",
  "US National",
  "US State",
  "US Local",
  "India National",
  "Indian State",
];

const eventsData = [
  {
    date: "July 7 2025",
    events: [
      {
        title: "Jane Street",
        date: "July 7",
        tags: ["Diaspora News", "India News"],
      },
      {
        title: "US Trade Talks",
        date: "July 7",
        tags: ["US News"],
      },
    ],
  },
  {
    date: "July 6 2025",
    label: "FILL",
    events: [
      {
        title: "Diwali",
        date: "November 1",
        tags: ["Festival"],
      },
      {
        title: "Gandhi Jayanti",
        date: "October 2",
        tags: ["Indian National Holiday"],
      },
      {
        title: "Diljit Concert",
        date: "November 16",
        tags: ["Concert"],
      },
    ],
  },
];

export const AdminEvents = () => {
  const { setHeading } = useHeading();

  useEffect(() => {
    setHeading("Events");
  }, [setHeading]);

  return (
    <Layout>
      <Navbar />
      <div className="p-6">
        {/* Filter Chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {filterChips.map((chip, index) => (
            <div
              key={index}
              className="text-sm px-3 py-1.5 border-2 border-gray-300 rounded-full text-gray-700 bg-gray-100 hover:bg-gray-200 cursor-pointer"
            >
              {chip}
            </div>
          ))}
        </div>

        {/* Event Blocks */}
        {eventsData.map((block, index) => (
          <div key={index} className="mb-6">
            {/* Date Label */}
            <p className="text-sm text-gray-500 font-medium mb-2">
              {block.date}
            </p>

            {/* Event Card */}
            <div
              className={`rounded-md p-4 ${
                block.label ? "bg-blue-50" : "bg-green-50"
              }`}
            >
              {/* Optional Label (e.g., FILL) */}
              {block.label && (
                <div className="text-xs font-semibold text-blue-800 bg-blue-100 px-2 py-1 rounded-full inline-block mb-2">
                  {block.label}
                </div>
              )}

              {/* Event Rows */}
              {block.events.map((event, idx) => (
                <div
                  key={idx}
                  className="flex flex-wrap items-center gap-2 mb-2 text-sm text-gray-700"
                >
                  <span className="font-semibold">{event.title}</span>
                  <span className="text-gray-500">• {event.date}</span>
                  {event.tags.map((tag, i) => (
                    <span
                      key={i}
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTagColor(
                        tag
                      )}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

// Utility function to assign colors to tags
const getTagColor = (tag: string) => {
  switch (tag.toLowerCase()) {
    case "india news":
    case "festival":
      return "text-white bg-blue-500";
    case "us news":
      return "text-white bg-green-600";
    case "indian national holiday":
      return "text-white bg-green-700";
    case "concert":
      return "text-white bg-red-900";
    case "diaspora news":
      return "text-gray-500 italic";
    default:
      return "text-gray-100 bg-gray-700";
  }
};
