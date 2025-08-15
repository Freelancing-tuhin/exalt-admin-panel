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
  { month: "July 2025", articles: 18, viralDiscussions: 24 },
  { month: "June 2025", articles: 15, viralDiscussions: 19 },
  { month: "May 2025", articles: 20, viralDiscussions: 30 },
  { month: "April 2025", articles: 12, viralDiscussions: 15 },
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
    const sorted = [...briefsData];
    return sortOrder === "oldest" ? sorted.reverse() : sorted;
  };

  return (
    <Layout>
      <Navbar />
      <div className="p-8 min-h-screen space-y-8 bg-white to-purple-50">
        <GradientHeader title="Brief Dashboard" />

        {/* Sort Buttons */}
        <div className="flex gap-3">
          {["newest", "oldest"].map((order) => (
            <button
              key={order}
              onClick={() => setSortOrder(order as "newest" | "oldest")}
              className={`px-5 py-2.5 rounded-full font-medium shadow-lg transition-all flex items-center gap-2 text-sm backdrop-blur-md border
                ${
                  sortOrder === order
                    ? "bg-gradient-to-r from-indigo-600 to-purple-500 text-white border-indigo-600 scale-105"
                    : "bg-white/70 border-gray-300 text-gray-700 hover:bg-white hover:scale-105"
                }`}
            >
              <FiCalendar /> {order.charAt(0).toUpperCase() + order.slice(1)}
            </button>
          ))}
        </div>

        {/* Briefs List */}
        <div className="space-y-6">
          {getSortedBriefsData().map((brief, index) => {
            const id = `${brief.month}-summary`;
            const isOpen = openSummaries[id];

            return (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.01]"
              >
                <div className="flex items-center justify-between p-5 bg-gradient-to-r from-white to-blue-100 rounded-t-2xl">
                  <div className="flex items-center gap-3">
                    <FiCalendar className="text-indigo-600 text-xl" />
                    <h2 className="font-bold text-gray-900 text-lg">{brief.month} Brief</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                      <FiBookOpen /> {brief.articles} Articles
                    </span>
                    <span className="flex items-center gap-1 bg-gradient-to-r from-pink-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                      <FiMessageSquare /> {brief.viralDiscussions} Viral
                    </span>
                  </div>
                </div>

                {/* Actions Row */}
                <div className="flex flex-wrap items-center justify-between p-4 gap-3">
                  <div className="flex gap-3">
                    <button
                      onClick={() => toggleSummary(id)}
                      className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-500 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg hover:from-indigo-700 hover:to-purple-600 transition-all flex items-center gap-2"
                    >
                      <FiEye />
                      {isOpen ? "Hide Summary" : "View Summary"}
                      {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                    </button>
                    <Link
                      to="/client/briefs/brief-view"
                      className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-500 text-sm font-medium rounded-lg shadow-md hover:shadow-lg text-white transition-all flex items-center gap-2"
                    >
                      <FiArrowRightCircle /> View details
                    </Link>
                  </div>
                </div>

                {/* Summary Content */}
                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="border-t border-gray-200 pt-4 px-5 pb-5 bg-gradient-to-br from-white to-gray-50">
                    <p className="text-gray-700 text-base leading-relaxed">
                      The U.S. Department of Energy unveiled a $1.2 billion initiative to accelerate the development of solid-state batteries, bolstering domestic EV manufacturing and reducing reliance on foreign supply chains. Wildfires in Northern California prompted the largest coordinated drone mapping effort in state history, enabling firefighters to contain over 70% of active blazes within days. The national job market showed resilience, with unemployment holding at 3.8% despite slowing wage growth. The Smithsonian Institution launched a groundbreaking AI exhibition attracting over 50,000 visitors in its first week. In sports, the U.S. Men’s Basketball Team announced its Olympic roster, sparking debate after omitting several veteran players in favor of younger talent.
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};
