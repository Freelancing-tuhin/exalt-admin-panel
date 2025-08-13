import { Layout } from "../../layout/Layout";
import Navbar from "../../../components/main/navbar/Navbar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useHeading } from "../../../contexts/headingContext";
import { GradientHeader } from "../../../components/shared/gradientHeader/GradientHedaer";
import { FiBookOpen, FiMessageSquare } from "react-icons/fi";

const briefsData = [
  {
    month: "July 2025 Briefs",
    periods: [
      { dateRange: "July 1 - July 14, 2025", articles: 9, viralDiscussions: 12 },
    ],
  },
  {
    month: "June 2025 Briefs",
    periods: [
      { dateRange: "June 15 - June 30, 2025", articles: 9, viralDiscussions: 12 },
      { dateRange: "June 1 - June 14, 2025", articles: 9, viralDiscussions: 12 },
    ],
  },
  {
    month: "May 2025 Briefs",
    periods: [
      { dateRange: "May 15 - May 30, 2025", articles: 9, viralDiscussions: 12 },
      { dateRange: "May 1 - May 14, 2025", articles: 9, viralDiscussions: 12 },
    ],
  },
  {
    month: "April 2025 Briefs",
    periods: [
      { dateRange: "April 15 - April 30, 2025", articles: 9, viralDiscussions: 12 },
      { dateRange: "April 1 - April 14", articles: 9, viralDiscussions: 12 },
    ],
  },
];

export const ClientBriefs = () => {
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const { setHeading } = useHeading();

  useEffect(() => {
    setHeading("Brief");
  }, [setHeading]);

  const getSortedBriefsData = () => {
    const sortedData = [...briefsData];
    return sortOrder === "oldest" ? sortedData.reverse() : sortedData;
  };

  return (
    <Layout>
      <Navbar />
      <div className="p-6 space-y-6 h-[90vh] overflow-y-scroll">
        <GradientHeader title="Brief Dashboard" />

        {/* Sort Buttons */}
        <div className="flex gap-2 mb-4">
          {["newest", "oldest"].map((order) => (
            <button
              key={order}
              onClick={() => setSortOrder(order as "newest" | "oldest")}
              className={`text-sm px-4 py-2 rounded-full border transition-all duration-300 shadow-sm
                ${sortOrder === order
                  ? "bg-gray-100 border-gray-300 text-gray-800 font-semibold"
                  : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                }`}
            >
              {order.charAt(0).toUpperCase() + order.slice(1)}
            </button>
          ))}
        </div>

        {/* Briefs List */}
        <div className="space-y-8">
          {getSortedBriefsData().map((monthData, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-2xl shadow-md  transition-all duration-300"
            >
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">{monthData.month}</h2>
              </div>

              <div className="p-4 space-y-4">
                {monthData.periods.map((period, pIndex) => (
                  <Link
                    to="/client/briefs/brief-view"
                    key={pIndex}
                    className="flex justify-between items-center bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transform  transition-all duration-300"
                  >
                    {/* Date */}
                    <span className="text-gray-800 font-medium text-sm sm:text-base">
                      {period.dateRange}
                    </span>

                    {/* Stats */}
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full font-medium text-xs sm:text-sm">
                        <FiBookOpen /> {period.articles} Articles
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="flex items-center gap-1 bg-pink-100 text-pink-800 px-3 py-1 rounded-full font-medium text-xs sm:text-sm">
                        <FiMessageSquare /> {period.viralDiscussions} Viral Discussions
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
