import Navbar from "../../../components/main/navbar/Navbar";
import { Layout } from "../../layout/Layout";
import { FiCopy } from "react-icons/fi";

interface SourceLink {
  id: string;
  description: string;
  link: string;
}

type ImportanceLevel =
  | "high_importance"
  | "medium_importance"
  | "low_importance";

interface EventData {
  title: string;
  date: string;
  address: string;
  tag: ImportanceLevel;
  description: string;
  cultural_sensitivities: string[];
  graphics: string;
  source_link: SourceLink[];
}

const event: EventData = {
  title: "Krishna Janmāshtami Dinner",
  date: "October 15−28, 2024",
  address: "1234 East Carrolton Road",
  tag: "high_importance",
  description:
    "Writer populates an event description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  cultural_sensitivities: [
    "Be sure not to wear a long sleeve shirt, it is considered offensive.",
    "Idk sample cultural sensitivity number 2",
  ],
  graphics:
    "https://www.gineicomarine.com.au/wp-content/uploads/2020/04/Gineico-Marine-Gianneschi-Water-Pumps-ACB-531-631-Chart.jpg",
  source_link: [
    {
      id: "1",
      description:
        "This article describes what the holiday means to people. Actually, it can go on for multiple lines and that's fine too.",
      link: "nytimes.com",
    },
    {
      id: "2",
      description:
        "This article describes what the holiday means to people. It can go on for multiple lines and that's fine too.",
      link: "nytimes.com",
    },
  ],
};

const importance_mapping: Record<ImportanceLevel, string> = {
  high_importance: "High Importance",
  medium_importance: "Medium Importance",
  low_importance: "Low Importance",
};

const getTagStyleBasedOnImportance = (tag: ImportanceLevel): string => {
  switch (tag) {
    case "high_importance":
      return "bg-red-600 text-white";
    case "medium_importance":
      return "bg-blue-600 text-white";
    case "low_importance":
      return "bg-green-600 text-white";
    default:
      return "bg-gray-400 text-white";
  }
};

const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
    alert("Link copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy text: ", err);
    alert("Failed to copy link.");
  }
};

export default function EventPage() {
  return (
    <Layout>
      <Navbar back={true} />
      <div className="p-4   space-y-8 bg-white text-base h-[90vh] overflow-y-auto object-fit-cover">
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4 mb-2 mt-3">
            <h1 className="text-xl sm:text-2xl md:text-2xl lg:text2xl font-semibold text-gray-900 leading-tight">
              {event.title}
            </h1>
            {event.tag && (
              <span
                className={`${getTagStyleBasedOnImportance(
                  event.tag
                )} text-sm font-semibold px-3 py-1 rounded-full tracking-wide inline-block self-start md:self-auto`}
              >
                {importance_mapping[event.tag]}
              </span>
            )}
          </div>

          <p className="text-sm sm:text-base md:text-sm mt-2 flex justify-start gap-2 items-center text-gray-600">
            <span className="font-semibold text-gray-500">{event.date}</span> •{" "}
            <span className="text-gray-700 font-semibold">{event.address}</span>
          </p>
        </div>

        <div className="bg-[#EDEDED] p-4 rounded-3xl space-y-2 mt-10">
          <h2 className="text-md font-semibold text-gray-700">
            Event Description
          </h2>
          <div className="bg-white p-4 rounded-3xl">
            <p>{event.description}</p>
          </div>

          <h2 className="text-md font-semibold text-gray-700 mt-4 ">
            Cultural Sensitivities
          </h2>
          <div className="bg-white p-4 rounded-3xl">
            <ol className="list-decimal list-inside ">
              {event.cultural_sensitivities.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ol>
          </div>
        </div>

        <div className="bg-[#EDEDED] p-4 rounded-3xl space-y-4">
          <h2 className="text-md font-semibold text-gray-700">Graphics</h2>
          {/* --- Start of Beautified Image Container --- */}
          <div
            className="relative w-[50%] m-4 bg-slate-100 rounded-3xl 
          flex items-center justify-center text-gray-400 text-sm overflow-hidden min-h-[100px] md:min-h-[150px] lg:min-h-[200px] shadow-inner"
          >
            {event.graphics ? (
              <>
                {/* The Image */}
                <img
                  src={
                    "https://www.iskconbangalore.org/wp-content/uploads/2025/05/janmashtami-thu.jpg"
                  }
                  alt="Event Graphic"
                  className="w-full h-full object-cover max-h-[250px]"
                  // Add an onerror fallback for broken image links
                />
                {/* The dark corner gradient overlay */}
                <div
                  className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.5))]"
                  aria-hidden="true"
                />
              </>
            ) : (
              // A more stylish placeholder for when there is no image
              <div className="flex flex-col items-center justify-center p-8 text-center text-slate-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mb-4 text-slate-400"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <h3 className="font-semibold">No Event Graphic</h3>
                <p className="text-xs mt-1">
                  An image will appear here once available.
                </p>
              </div>
            )}
          </div>
          {/* --- End of Beautified Image Container --- */}
        </div>

        {event.source_link.length > 0 && (
          <div className="bg-[#EDEDED] p-4 rounded-[20px] space-y-4">
            <h2 className="text-md font-semibold text-gray-700">
              Links to External Resources
            </h2>

            {/* --- Start of Beautified UI Part --- */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg overflow-x-auto w-full">
              <div className="min-w-[700px]">
                {/* Header: More distinct, with better spacing and typography */}
                <div className="grid grid-cols-[auto_auto_1fr_auto] gap-x-6 items-center text-xs text-slate-500 font-semibold uppercase tracking-wider border-b-2 border-slate-200 pb-4">
                  <span className="text-center">Copy</span>
                  <span className="pl-2">#</span>
                  <span className="">Description</span>
                  <span className="">Link</span>
                </div>

                {/* Data Rows: Increased spacing and added hover effect */}
                {event.source_link.map((source, index) => (
                  <div
                    key={source.id}
                    className="grid grid-cols-[auto_auto_1fr_auto] gap-x-6 items-center py-4 border-b border-slate-200 last:border-b-0 hover:bg-slate-50/70 transition-colors duration-200 ease-in-out"
                  >
                    {/* Button: Polished with better feedback on hover/focus */}
                    <div className="flex justify-center">
                      <button
                        onClick={() =>
                          copyToClipboard(`https://${source.link}`)
                        }
                        className="p-2 rounded-lg text-slate-400 hover:bg-slate-200 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                        title="Copy link to clipboard"
                      >
                        <FiCopy className="text-lg" />
                      </button>
                    </div>

                    {/* Index: Styled for alignment and readability */}
                    <span className="pl-2 text-slate-700 font-medium tabular-nums">
                      {index + 1}.
                    </span>

                    {/* Description: Cleaned up text color */}
                    <p className="text-slate-800 pr-2 text-sm md:text-base">
                      {source.description}
                    </p>

                    {/* Link: Improved hover state and word break */}
                    <a
                      href={`https://${source.link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 hover:underline text-sm md:text-base break-all font-medium transition-colors"
                    >
                      {source.link}
                    </a>
                  </div>
                ))}
              </div>
            </div>
            {/* --- End of Beautified UI Part --- */}
          </div>
        )}
      </div>
    </Layout>
  );
}
