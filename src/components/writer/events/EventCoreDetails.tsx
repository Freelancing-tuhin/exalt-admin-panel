import React from "react";

type Props = {
  diasporaOptions: string[];
  importanceOptions: string[];
  selectedDiaspora: string[];
  selectedImportance: string[];
  onToggleDiaspora: (tag: string) => void;
  onToggleImportance: (tag: string) => void;
};

const EventCoreDetails: React.FC<Props> = ({
  diasporaOptions,
  importanceOptions,
  selectedDiaspora,
  selectedImportance,
  onToggleDiaspora,
  onToggleImportance,
}) => {
  return (
    <section className="bg-white p-8 rounded-2xl  mb-8 border border-gray-200 relative">
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
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
        Event Core Details
      </h2>

      <div className="mb-6">
        <label
          htmlFor="event-name"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Event Name:
        </label>
        <input
          type="text"
          id="event-name"
          placeholder="Enter event name, e.g., 'Diwali Cultural Fest 2025'"
          className="w-full border border-gray-300 rounded-lg
           px-4 py-3 bg-gray-50 text-gray-800 focus:ring-indigo-500 
           focus:border-indigo-500 transition duration-150 ease-in-out text-lg"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Diaspora Group Tag:
        </label>
        <div className="flex flex-wrap gap-3">
          {diasporaOptions.map((tag) => {
            const active = selectedDiaspora.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => onToggleDiaspora(tag)}
                className={`px-5 py-2 rounded-full text-base font-medium transition duration-150 ease-in-out shadow-sm ${
                  active
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-300"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Importance / Priority:
        </label>
        <div className="flex flex-wrap gap-3">
          {importanceOptions.map((tag) => {
            const active = selectedImportance.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => onToggleImportance(tag)}
                className={`px-5 py-2 rounded-full text-base font-medium transition duration-150 ease-in-out shadow-sm ${
                  active
                    ? "bg-purple-600 text-white hover:bg-purple-700"
                    : "bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-300"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      <span className="absolute top-4 right-4 text-xs italic text-indigo-500 bg-indigo-50 px-2 py-1 rounded-md inline-block shadow-sm">
        Researcher
      </span>
    </section>
  );
};

export default EventCoreDetails;
