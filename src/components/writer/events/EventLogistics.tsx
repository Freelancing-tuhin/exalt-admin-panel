import React from "react";

const EventLogistics: React.FC = () => {
  return (
    <section className="bg-white p-8 rounded-2xl  mb-8 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-200 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-indigo-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M17 16l-4 4-4-4"
          />
        </svg>
        Event Logistics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label
            htmlFor="event-date"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Date:
          </label>
          <input
            type="date"
            id="event-date"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-150 ease-in-out"
          />
        </div>
        <div>
          <label
            htmlFor="journalist-responder"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Journalist + Responder:
          </label>
          <input
            type="text"
            id="journalist-responder"
            placeholder="Assign journalist"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-150 ease-in-out"
          />
        </div>
        <div>
          <label
            htmlFor="event-location"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Location:
          </label>
          <input
            type="text"
            id="event-location"
            placeholder="e.g., San Jose, CA"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-150 ease-in-out"
          />
        </div>
      </div>
    </section>
  );
};

export default EventLogistics;
