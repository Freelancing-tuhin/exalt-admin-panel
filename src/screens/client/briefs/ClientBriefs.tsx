import { Layout } from "../../layout/Layout";
import Navbar from "../../../components/main/navbar/Navbar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useHeading } from "../../../contexts/headingContext";
import { GradientHeader } from "../../../components/shared/gradientHeader/GradientHedaer";
import {
  FiBookOpen,
  FiMessageSquare,
  FiCalendar,
  FiChevronDown,
  FiChevronUp,
  FiEye,
  FiArrowRightCircle,
} from "react-icons/fi";

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
      { dateRange: "April 1 - April 14, 2025", articles: 9, viralDiscussions: 12 },
    ],
  },
];

export const ClientBriefs = () => {
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [openSummaries, setOpenSummaries] = useState<{ [key: string]: boolean }>({});
  const { setHeading } = useHeading();

  useEffect(() => {
    setHeading("Brief");
  }, [setHeading]);

  const toggleSummary = (id: string) => {
    setOpenSummaries((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getSortedBriefsData = () => {
    const sortedData = [...briefsData];
    return sortOrder === "oldest" ? sortedData.reverse() : sortedData;
  };

  return (
    <Layout>
      <Navbar />
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto min-h-screen">
        <div className="mb-8">
          <GradientHeader title="Brief Dashboard" />
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          {["newest", "oldest"].map((order) => (
            <button
              key={order}
              onClick={() => setSortOrder(order as "newest" | "oldest")}
              className={`px-4 py-2 sm:px-5 sm:py-2 rounded-full border text-xs sm:text-sm font-medium shadow-sm transition-all duration-300 flex items-center gap-2
                ${
                  sortOrder === order
                    ? "bg-gradient-to-r from-blue-600 to-blue-500 border-blue-600 text-white shadow-md"
                    : "bg-gray-200 border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400"
                }`}
            >
              <FiCalendar className="text-sm sm:text-base" />
              {order.charAt(0).toUpperCase() + order.slice(1)}
            </button>
          ))}
        </div>

        <div className="space-y-6 sm:space-y-8">
          {getSortedBriefsData().map((monthData, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-100 bg-gradient-to-r from-gray-100 to-gray-50 rounded-t-2xl flex items-center gap-2">
                <FiCalendar className="text-blue-600 text-base sm:text-lg" />
                <h2 className="text-base sm:text-lg font-bold text-gray-900">{monthData.month}</h2>
              </div>

              <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                {monthData.periods.map((period, pIndex) => {
                  const id = `${monthData.month}-${pIndex}`;
                  const isOpen = openSummaries[id];
                  return (
                    <div
                      key={pIndex}
                      className="border border-gray-100 rounded-xl bg-gradient-to-r from-white to-gray-50 hover:border-blue-200 transition-all duration-200 shadow-sm"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 sm:p-4 gap-3">
                        <span className="text-gray-800 font-medium text-sm sm:text-base flex items-center gap-2">
                          <FiCalendar className="text-gray-500 text-base" />
                          {period.dateRange}
                        </span>

                        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-start sm:justify-end mt-2 sm:mt-0 w-full sm:w-auto">
                          <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-full font-medium text-xs sm:text-sm whitespace-nowrap">
                            <FiBookOpen className="text-sm sm:text-base" /> {period.articles} Articles
                          </span>
                          <span className="text-gray-400 hidden sm:block">•</span>
                          <span className="flex items-center gap-1 bg-pink-50 text-pink-700 px-2 py-1 rounded-full font-medium text-xs sm:text-sm whitespace-nowrap">
                            <FiMessageSquare className="text-sm sm:text-base" /> {period.viralDiscussions} Viral Discussions
                          </span>

                          <div className="flex flex-wrap gap-2 sm:gap-3 mt-2 sm:mt-0 w-full sm:w-auto justify-start sm:justify-end">
                            <button
                              onClick={() => toggleSummary(id)}
                              className="px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs sm:text-sm font-medium rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-200 flex items-center gap-1 whitespace-nowrap"
                            >
                              <FiEye className="text-sm sm:text-base" />
                              {isOpen ? "Hide Summary" : "View Summary"}
                              {isOpen ? <FiChevronUp className="text-sm sm:text-base" /> : <FiChevronDown className="text-sm sm:text-base" />}
                            </button>
                            <Link
                              to="/client/briefs/brief-view"
                              className="px-3 py-1 bg-gradient-to-r from-gray-200 to-gray-100 text-gray-800 text-xs sm:text-sm font-medium rounded-lg hover:from-gray-300 hover:to-gray-200 transition-all duration-200 flex items-center gap-1 whitespace-nowrap"
                            >
                              <FiArrowRightCircle className="text-sm sm:text-base" /> View details
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isOpen ? "max-h-60 p-3 sm:p-4 pt-0" : "max-h-0 p-0"
                        }`}
                      >
                        <div className="border-t border-gray-200 pt-3 sm:pt-4">
                          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2">Exalt Summary</h3>
                          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                            The U.S. Department of Energy unveiled a $1.2 billion initiative to accelerate the development of solid-state batteries, with a focus on bolstering domestic electric vehicle manufacturing and reducing reliance on foreign supply chains. Wildfires in Northern California prompted the largest coordinated drone mapping effort in state history, enabling firefighters to contain over 70% of active blazes within days. The national job market showed resilience, with unemployment holding at 3.8% despite slowing wage growth. Meanwhile, the Smithsonian Institution opened a groundbreaking exhibition on the role of artificial intelligence in shaping American culture, attracting more than 50,000 visitors in its first week. On the sports front, the U.S. Men’s Basketball Team announced its Olympic roster, stirring debate after several veteran players were left out in favor of younger talent.
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};