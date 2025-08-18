import { Layout } from "../../layout/Layout";
import Navbar from "../../../components/main/navbar/Navbar";
import { Link } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import { useHeading } from "../../../contexts/headingContext";
import { GradientHeader } from "../../../components/shared/gradientHeader/GradientHedaer";
import data from "../../../database/brief.json"

import {
  FiBookOpen,
  FiMessageSquare,
  FiCalendar,
  FiEye,
  FiArrowRightCircle,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

export const ClientBriefs = () => {
  const [openSummaries, setOpenSummaries] = useState<{ [key: string]: boolean }>({});
  const { setHeading } = useHeading();

  const yearToDisplay = 2025;
  
  // --- Start of MODIFIED LOGIC for data collection ---
  let combinedMonthData: { [key: string]: any } = {};

  // Get months nested under the year key (e.g., "2025": { "january": {...}, ... })
  const yearSpecificData = data[String(yearToDisplay)];
  if (yearSpecificData) {
    Object.assign(combinedMonthData, yearSpecificData);
  }

  // Check for month-year keys directly at the top level (e.g., "June 2025": {...})
  Object.entries(data).forEach(([key, value]) => {
    // We expect keys like "June 2025" for the current year
    if (key.endsWith(` ${yearToDisplay}`)) {
      const monthKey = key.split(' ')[0].toLowerCase(); // Converts "June 2025" to "june"
      combinedMonthData[monthKey] = value;
    }
  });
  // --- End of MODIFIED LOGIC for data collection ---

  const monthOrder = [
    "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december"
  ];

  const briefsData = Object.entries(combinedMonthData) // Use the combined data
    .map(([monthKey, monthData]: [string, any]) => {
      const monthName = monthKey.charAt(0).toUpperCase() + monthKey.slice(1);
      
      const articlesCount = monthData.details ? monthData.details.length : 0;
      // Placeholder for viralDiscussions, as it's not in the JSON structure
      const viralDiscussionsCount = articlesCount > 0 ? articlesCount + Math.floor(articlesCount / 2) : 0; 

      return {
        id: monthKey, 
        // For 'June 2025', the raw key is 'June 2025', but we want 'June' as monthName.
        // The data structure for "June 2025" has its own 'summary' and 'details' directly under it.
        // We'll normalize month to be just 'June' for display purposes.
        month: `${monthName.replace(` ${yearToDisplay}`, '')} ${yearToDisplay}`,
        rawMonth: monthKey, 
        articles: articlesCount,
        viralDiscussions: viralDiscussionsCount,
        // Use 'summary' for top-level month data like 'June 2025', otherwise 'exalt_summary'
        exalt_summary: monthData.exalt_summary || monthData.summary, 
      };
    })
    .sort((a, b) => {
      // Prioritize "june" to be at the very top
      if (a.rawMonth === "june") return -1; // 'a' (june) comes before 'b'
      if (b.rawMonth === "june") return 1;  // 'b' (june) comes before 'a'

      // For all other months, sort in reverse chronological order based on monthOrder
      // This will put 'april' before 'march', 'march' before 'february', etc.
      return monthOrder.indexOf(b.rawMonth) - monthOrder.indexOf(a.rawMonth);
    });

  useEffect(() => {
    setHeading("Brief");
  }, [setHeading]);

  const toggleSummary = (id: string) => {
    setOpenSummaries((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Layout>
      <Navbar />
      <div className="p-10 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 space-y-10">
        <GradientHeader title="Brief Dashboard" />

        <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-xl shadow-xl">
          <div className="bg-white p-6 rounded-xl">
            <div className="overflow-x-auto rounded-xl">
              <table className="w-full">
                <thead className="bg-gray-100 rounded-xl">
                  <tr className="text-left text-sm font-bold text-black">
                    <th className="px-5 py-4 rounded-l-xl">Month</th>
                    <th className="px-5 py-4">Articles</th>
                    <th className="px-5 py-4">Discussions</th>
                    <th className="px-5 py-4 text-center">Summary</th>
                    <th className="px-5 py-4 text-center rounded-r-xl">Details</th>
                  </tr>
                </thead>

                <tbody>
                  {briefsData.map((brief) => {
                    const isOpen = openSummaries[brief.id];
                    
                    return (
                      <Fragment key={brief.id}> 
                        <tr
                          className="bg-white shadow-md hover:shadow-lg transition-all" 
                        >
                          <td className="px-5 py-5 font-semibold text-gray-900 flex items-center gap-2 rounded-l-xl">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-md">
                              <FiCalendar className="text-white text-xl" />
                            </div>
                            {brief.month}
                          </td>

                          <td className="px-5 py-5 align-middle">
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                              <FiBookOpen className="text-current" /> {brief.articles}
                            </span>
                          </td>

                          <td className="px-5 py-5 align-middle">
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-pink-50 text-pink-700 border border-pink-100">
                              <FiMessageSquare className="text-current" /> {brief.viralDiscussions}
                            </span>
                          </td>

                          <td className="px-5 py-5 text-center align-middle">
                            <button
                              onClick={() => toggleSummary(brief.id)}
                              className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-2 border w-full shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2
                                ${
                                  isOpen
                                    ? "bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-transparent"
                                    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                                }`}
                            >
                              <FiEye className={isOpen ? "text-white" : "text-gray-500"} />
                              {isOpen ? "Hide" : "View"}
                              {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                            </button>
                          </td>

                          <td className="px-5 py-5 text-center rounded-r-xl align-middle">
                            <Link
                              // Updated to use query parameters
                              to={`/client/briefs/brief-view?year=${yearToDisplay}&month=${brief.rawMonth}`} 
                              className="px-4 py-2 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white text-sm font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2"
                            >
                              <FiArrowRightCircle /> Details
                            </Link>
                          </td>
                        </tr>

                        <tr>
                          <td colSpan={5} className="px-5 pb-5">
                            <div
                              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                                isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                              }`}
                            >
                              <div className="bg-gradient-to-br from-white to-violet-100 border border-indigo-200 rounded-xl p-6 mt-3 shadow-inner">
                                <h3 className="text-indigo-700 font-bold mb-3 flex items-center gap-2">
                                  Exalt's Monthly Summary
                                </h3>
                                <p className="text-gray-700 text-base leading-relaxed">
                                  {brief.exalt_summary}
                                </p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};