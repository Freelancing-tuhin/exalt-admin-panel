import Navbar from "../../../components/main/navbar/Navbar";
import { ArticleActionsPanel } from "../../../components/shared/acordition/ArticleActionsPanel";
import { Header } from "../../../components/shared/header/Header";
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
    "Writer populates an event description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  cultural_sensitivities: [
    "Be sure not to wear a long sleeve shirt, it is considered offensive.",
    "Avoid taking photos of certain rituals without permission.",
  ],
  graphics:
    "https://www.iskconbangalore.org/wp-content/uploads/2025/05/janmashtami-thu.jpg",
  source_link: [
    {
      id: "1",
      description:
        "This article describes what the holiday means to people. Can go on for multiple lines and that's fine too.",
      link: "nytimes.com",
    },
    {
      id: "2",
      description:
        "This article describes what the holiday means to people. Can go on for multiple lines and that's fine too.",
      link: "nytimes.com",
    },
  ],
};

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    alert("Link copied to clipboard!");
  } catch (err) {
    console.error(err);
    alert("Failed to copy link.");
  }
};

export default function EventPage() {
  return (
    <Layout>
      <Navbar back={true} />
      <div className="flex flex-col md:flex-row h-[92vh]">
        {/* Left: Full-height Image */}

        {/* Right: Scrollable Content */}
        <div className="md:w-5/7  overflow-y-scroll  px-6 flex flex-col space-y-6 hidescroll">
          <Header
            title={event.title}
            author="Exalt Data"
            date={event.date}
            readTime="5 min"
            category=""
          />
          <div className="h-96  relative flex-shrink-0">
            <img
              src={event.graphics}
              alt="Event Graphic"
              className="w-full h-full object-cover object-center rounded-3xl shadow-lg"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-r-3xl"
              aria-hidden="true"
            />
          </div>
          {/* Event Description */}
          <div className="bg-gray-100 p-4 rounded-2xl space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Event Description
            </h2>
            <p className="bg-white  p-4 rounded-lg text-gray-700 font-medium text-sm md:text-base">
              {event.description}
            </p>
          </div>

          {/* Cultural Sensitivities */}
          <div className="bg-gray-100 p-4 rounded-2xl space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Cultural Sensitivities
            </h2>
            <ul className="bg-white  p-4 rounded-lg list-disc list-inside text-gray-700 text-sm md:text-base space-y-1">
              {event.cultural_sensitivities.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          {/* External Resources */}
          {event.source_link.length > 0 && (
            <div className="bg-gray-100 rounded-2xl p-4 space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">
                External Resources
              </h2>
              <div className="overflow-x-auto bg-white rounded-xl">
                <table className="min-w-full table-auto border-separate border-spacing-y-2">
                  <thead>
                    <tr className="text-xs text-gray-500 uppercase font-semibold border-b border-gray-200">
                      <th className="p-3">Copy</th>
                      <th className="p-3">#</th>
                      <th className="p-3 text-left">Description</th>
                      <th className="p-3 text-left">Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {event.source_link.map((source, idx) => (
                      <tr
                        key={source.id}
                        className="bg-gray-50 hover:bg-gray-100 transition-all"
                      >
                        <td className="p-3 text-center">
                          <button
                            onClick={() =>
                              copyToClipboard(`https://${source.link}`)
                            }
                            className="p-2 rounded-lg text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-all"
                          >
                            <FiCopy size={18} />
                          </button>
                        </td>
                        <td className="p-3 text-center font-medium">
                          {idx + 1}
                        </td>
                        <td className="p-3 text-gray-700">
                          {source.description}
                        </td>
                        <td className="p-3 text-blue-600 hover:underline">
                          <a
                            href={`https://${source.link}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {source.link}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Actions Panel */}
        <ArticleActionsPanel />
      </div>
    </Layout>
  );
}
