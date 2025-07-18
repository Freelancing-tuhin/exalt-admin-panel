import { Layout } from "../../layout/Layout";
import Navbar from "../../../components/main/navbar/Navbar";
import { EventCard } from "../../../components/shared/eventCard/EventCard";

const events = {
  Cultural: [
    {
      title: "Art Showcase",
      date: "January 13, 2025",
      image:
        "https://framerusercontent.com/images/tbaVws3GxXcXC30ecOGxIwev6Ak.png",
      tags: ["High", "Arts", "Hindu"],
    },
    {
      title: "Choir Recital",
      date: "January 14, 2025",
      image:
        "https://framerusercontent.com/images/18Q56jhO4AoJjOTkDWg38hHPRM.png",
      tags: ["Music", "Telugu"],
    },
    {
      title: "Choir Recital",
      date: "January 14, 2025",
      image:
        "https://framerusercontent.com/images/7iQtoM4DohgBigX8dSWtZew6qc.png",
      tags: ["Music", "Telugu"],
    },
    {
      title: "Dance Performance",
      date: "January 26, 2025",
      image:
        "https://docs.londonstockexchange.com/sites/default/files/2022-05/lseg_terrace.jpg",
      tags: ["Music", "Gujarati"],
    },
  ],
  Political: [
    {
      title: "No Kings Protest",
      date: "January 13, 2025",
      image:
        "https://framerusercontent.com/images/tbaVws3GxXcXC30ecOGxIwev6Ak.png",
      tags: ["Hindu"],
    },
    {
      title: "Local Club",
      date: "January 14, 2025",
      image:
        "https://framerusercontent.com/images/18Q56jhO4AoJjOTkDWg38hHPRM.png",
      tags: ["Dinner", "General"],
    },
    {
      title: "Hotel Owners Town Hall",
      date: "January 26, 2025",
      image:
        "https://framerusercontent.com/images/7iQtoM4DohgBigX8dSWtZew6qc.png",
      tags: ["General"],
    },
  ],
  Religious: [
    {
      title: "Christmas",
      date: "January 13, 2025",
      image:
        "https://framerusercontent.com/images/tbaVws3GxXcXC30ecOGxIwev6Ak.png",
      tags: ["Charity", "Hindu"],
    },
    {
      title: "Easter",
      date: "January 14, 2025",
      image:
        "https://framerusercontent.com/images/18Q56jhO4AoJjOTkDWg38hHPRM.png",
      tags: ["Telugu"],
    },
    {
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
    title: "Important Figure's Wedding",
    date: "November 15, 2024",
    tags: ["Wedding"],
  },
  {
    title: "Chinese Food Near Me Grand Opening",
    date: "November 7, 2024",
    tags: ["Grand Opening"],
  },
];

export const ClientEvents = () => {
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {eventsList.map((event, index) => (
                <EventCard
                  key={index}
                  title={event.title}
                  date={event.date}
                  image={event.image}
                  tags={event.tags}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Other Events Section */}
        <div>
          <h2 className="text-sm text-gray-500 font-semibold mb-4">
            Other Events
          </h2>
          <div className="bg-gray-100 p-4 rounded-lg space-y-3">
            {otherEvents.map((event, index) => (
              <div
                key={index}
                className="flex flex-wrap items-center text-sm text-gray-800 gap-2"
              >
                <span className="font-semibold">{event.title}</span>
                <span className="text-gray-500">• {event.date}</span>
                {event.tags.map((tag, i) => (
                  <span
                    key={i}
                    className={`text-xs px-2 py-0.5 rounded-full font-medium`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
