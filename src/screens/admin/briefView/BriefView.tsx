/* eslint-disable @typescript-eslint/no-explicit-any */
import { Layout } from "../../layout/Layout";
import Navbar from "../../../components/main/navbar/Navbar";

// Mock data for articles
const event: any = {
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
      date: "July 26, 2025",
      donors: "12 Likely Interested Donors",
    },
    {
      id: "2",
      description:
        "This article describes what the holiday means to people. It can go on for multiple lines and that's fine too.",
      date: "July 26, 2025",
      donors: "12 Likely Interested Donors",
    },
  ],
};

// Mock data for discussions
const discussions = [
  {
    id: 1,
    description:
      "Vice President Kamala Harris Illuminates Her Indian Ties at the Democratic National Convention. This article goes on for multiple lines",
    link: "July 25 - July 28, 2025",
    copyLink: "12 Likely Interested Donors",
  },
  {
    id: 2,
    description:
      "Vice President Kamala Harris Illuminates Her Indian Ties at the Democratic National Convention",
    link: "July 25 - July 28, 2025",
    copyLink: "12 Likely Interested Donors",
  },
  {
    id: 3,
    description:
      "Vice President Kamala Harris Illuminates Her Indian Ties at the Democratic National Convention",
    link: "July 25 - July 28, 2025",
    copyLink: "12 Likely Interested Donors",
  },
  {
    id: 4,
    description:
      "Vice President Kamala Harris Illuminates Her Indian Ties at the Democratic National Convention",
    link: "July 25 - July 28, 2025",
    copyLink: "12 Likely Interested Donors",
  },
  {
    id: 5,
    description:
      "Vice President Kamala Harris Illuminates Her Indian Ties at the Democratic National Convention",
    link: "July 25 - July 28, 2025",
    copyLink: "12 Likely Interested Donors",
  },
  {
    id: 6,
    description:
      "Vice President Kamala Harris Illuminates Her Indian Ties at the Democratic National Convention",
    link: "July 25 - July 28, 2025",
    copyLink: "12 Likely Interested Donors",
  },
  {
    id: 7,
    description:
      "Vice President Kamala Harris Illuminates Her Indian Ties at the Democratic National Convention",
    link: "July 25 - July 28, 2025",
    copyLink: "12 Likely Interested Donors",
  },
  {
    id: 8,
    description:
      "Vice President Kamala Harris Illuminates Her Indian Ties at the Democratic National Convention",
    link: "July 25 - July 28, 2025",
    copyLink: "12 Likely Interested Donors",
  },
];

export const BriefView = () => {
  return (
    <Layout>
      <Navbar back={true} />
      <div className="body h-[90vh] overflow-y-scroll">
        <div className="max-w-6xl mx-auto p-2">
          {/* Header */}
          <div className="flex justify-between items-center mb-8 bg-white p-4 ">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Coverage July 1 - July 14
              </h1>
              <p className="text-sm text-gray-600">
                New Jersey Congressional District 1
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-semibold text-gray-800">
                  9 Articles, 12 Notable Discussions
                </p>
              </div>
            </div>
          </div>

          {/* Articles Section */}
          <div className="bg-[#EDEDED] p-4 rounded-[20px] space-y-4 mb-10">
            <h2 className="text-md font-semibold text-gray-700">Articles</h2>

            {/* --- Start of Beautified UI Part --- */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl  overflow-x-auto w-full">
              <div className="min-w-[900px]">
                {/* Table Header */}
                <div className="grid grid-cols-[40px_4fr_1fr_1fr] gap-x-6 items-center text-xs text-slate-500 font-semibold uppercase tracking-wider border-b-2 border-slate-200 pb-4">
                  <span>#</span>
                  <span>Description</span>
                  <span>Date</span>
                  <span>Donors</span>
                </div>

                {/* Data Rows */}
                {event.source_link.map((source: any, index: any) => (
                  <div
                    key={source.id}
                    className="grid grid-cols-[40px_4fr_1fr_1fr] gap-x-6 items-start py-4 border-b border-slate-200 last:border-b-0 hover:bg-slate-50/70 transition-colors duration-200 ease-in-out"
                  >
                    {/* Index */}
                    <span className="text-slate-700 font-medium tabular-nums">
                      {index + 1}.
                    </span>

                    {/* Description */}
                    <p className="text-slate-800 text-sm md:text-base break-words">
                      {source.description}
                    </p>

                    {/* Date */}
                    <span className="text-sm text-slate-700 font-medium">
                      {source.date}
                    </span>

                    {/* Donors */}
                    <span className="text-sm text-slate-700 font-medium">
                      {source.donors || "N/A"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* --- End of Beautified UI Part --- */}
          </div>

          {/* Discussions Section */}
          <div className="bg-[#EDEDED] p-4 rounded-[20px] space-y-4 mb-10">
            <h2 className="text-md font-semibold text-gray-700">Discussions</h2>

            <div className="bg-white rounded-[20px]  overflow-x-auto p-4 sm:p-6">
              <div className="min-w-[900px] space-y-4">
                {/* Header */}
                <div className="grid grid-cols-[50px_3fr_2fr_1fr] gap-x-6 items-center text-xs text-slate-500 font-semibold uppercase tracking-wider border-b-2 border-slate-200 pb-4 px-2">
                  <span>#</span>
                  <span>Description</span>
                  <span>Link</span>
                  <span>Copy Link</span>
                </div>

                {/* Rows */}
                {discussions.map((discussion) => (
                  <div
                    key={discussion.id}
                    className="grid grid-cols-[50px_3fr_2fr_1fr] gap-x-6 items-start py-4 border-b border-slate-200 last:border-b-0 hover:bg-slate-50 transition-colors duration-200 ease-in-out px-2"
                  >
                    {/* Index */}
                    <span className="text-sm text-slate-800 tabular-nums">
                      {discussion.id}.
                    </span>

                    {/* Description */}
                    <a
                      href="#"
                      className="text-blue-600 text-sm md:text-base hover:text-blue-800 hover:underline break-words font-medium"
                    >
                      {discussion.description}
                    </a>

                    {/* Link */}
                    <a
                      href={discussion.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-700 break-all hover:underline"
                    >
                      {discussion.link}
                    </a>

                    {/* Copy Link */}
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(discussion.link)
                      }
                      className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
