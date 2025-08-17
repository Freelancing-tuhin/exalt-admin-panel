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
  FiEye,
  FiArrowRightCircle,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

const briefsData = [
  { id: 7, month: "July 2025", articles: 18, viralDiscussions: 24 },
  { id: 6, month: "June 2025", articles: 15, viralDiscussions: 19 },
  { id: 5, month: "May 2025", articles: 20, viralDiscussions: 30 },
  { id: 4, month: "April 2025", articles: 12, viralDiscussions: 15 },
  { id: 3, month: "March 2025", articles: 19, viralDiscussions: 27 },
  { id: 2, month: "February 2025", articles: 16, viralDiscussions: 20 },
  { id: 1, month: "January 2025", articles: 14, viralDiscussions: 22 },
  { id: 12, month: "December 2024", articles: 22, viralDiscussions: 32 },
  { id: 11, month: "November 2024", articles: 11, viralDiscussions: 14 },
  { id: 10, month: "October 2024", articles: 13, viralDiscussions: 16 },
  { id: 9, month: "September 2024", articles: 17, viralDiscussions: 23 },
  { id: 8, month: "August 2024", articles: 21, viralDiscussions: 28 },
];

export const ClientBriefs = () => {
  const [openSummaries, setOpenSummaries] = useState<{ [key: number]: boolean }>({});
  const { setHeading } = useHeading();

  useEffect(() => {
    setHeading("Brief");
  }, [setHeading]);

  const toggleSummary = (id: number) => {
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
                      <>
                        <tr
                          key={brief.id}
                          className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all mb-3"
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
                              to="/client/briefs/brief-view"
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
                                  The U.S. Department of Energy unveiled a $1.2 billion initiative
                                  to accelerate the development of solid-state batteries,
                                  bolstering domestic EV manufacturing and reducing reliance
                                  on foreign supply chains. Wildfires in Northern California
                                  prompted the largest coordinated drone mapping effort in state
                                  history, enabling firefighters to contain over 70% of active
                                  blazes within days. The national job market showed resilience,
                                  with unemployment holding at 3.8% despite slowing wage growth.
                                  The Smithsonian Institution launched a groundbreaking AI
                                  exhibition attracting over 50,000 visitors in its first week.
                                </p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </>
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
