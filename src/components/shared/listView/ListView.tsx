/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";

const events = [
  {
    dateRange: "TODAY",
    time: "17:00",
    title: "Bergen International Film Festival",
    description:
      "Films from all over the world gather all film enthusiasts for unique moments at the Bergen International Film Festival.",
  },
  {
    dateRange: "22 - 31 OCT",
    time: "10:00",
    title: "Wool week",
    description:
      "ULLVEKA 2021 will be held for the eighth time in the period 22 - 31 October 2021, and will take place in the entire Bergen region.",
  },
  {
    dateRange: "22 - 31 OCT",
    time: "19:00",
    title: "Light park at Bergenhus Fortress",
    description:
      "LUMAGICA - a magical experience for young and old at Bergenhus Fortress, 12 November to 19 December 2021.",
  },
];

export const EventsList = ({ heading, donor }: any) => {
  return (
    <div className="bg-[#f7f7f5] rounded-lg p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">{heading}</h2>
      <div className="space-y-2  mx-auto">
        {events.map((event, idx) => (
          <Link
            to="/admin/articles"
            key={idx}
            className="bg-white rounded-xl border border-gray-200 flex justify-between items-center p-4"
          >
            {/* Left Side: Date and Time */}
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-xs font-semibold text-gray-500">Posts</div>
                <div className="text-xl font-bold text-indigo-700">2015</div>
              </div>

              {/* Divider */}
              <div className="w-px h-10 bg-gray-300"></div>

              {/* Event Info */}
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-1">
                  {event.title}
                </h3>
                <p className="text-xs text-gray-600">{event.description}</p>
              </div>
            </div>

            {/* Add to Calendar Button */}
            {donor && (
              <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium">
                {/* <FiPlus className="w-4 h-4" /> */}
                12 potential donor
              </button>
            )}
          </Link>
        ))}
        <p className="text-sm font-semibold pl-2 text-blue-600 mt-2 cursor-pointer">
          see more...
        </p>
      </div>
    </div>
  );
};
