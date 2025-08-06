import { Layout } from "../../layout/Layout";
import Navbar from "../../../components/main/navbar/Navbar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useHeading } from "../../../contexts/headingContext";

const briefsData = [
  {
    month: "July 2025 Briefs",
    periods: [
      {
        dateRange: "July 1 - July 14, 2025",
        articles: 9,
        viralDiscussions: 12,
      },
    ],
  },
  {
    month: "June 2025 Briefs",
    periods: [
      {
        dateRange: "June 15 - June 30, 2025",
        articles: 9,
        viralDiscussions: 12,
      },
      {
        dateRange: "June 1 - June 14, 2025",
        articles: 9,
        viralDiscussions: 12,
      },
    ],
  },
  {
    month: "May 2025 Briefs",
    periods: [
      {
        dateRange: "May 15 - May 30, 2025",
        articles: 9,
        viralDiscussions: 12,
      },
      {
        dateRange: "May 1 - May 14, 2025",
        articles: 9,
        viralDiscussions: 12,
      },
    ],
  },
  {
    month: "April 2025 Briefs",
    periods: [
      {
        dateRange: "April 15 - April 30, 2025",
        articles: 9,
        viralDiscussions: 12,
      },
      {
        dateRange: "April 1 - April 14",
        articles: 9,
        viralDiscussions: 12,
      },
    ],
  },
];

export const ClientBriefs = () => {
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const { setHeading } = useHeading();

  useEffect(() => {
    setHeading("Brief");
  }, [setHeading]);

  // Function to sort briefs data based on the selected order
  const getSortedBriefsData = () => {
    const sortedData = [...briefsData];

    if (sortOrder === "newest") {
      // Sort by newest first (default order)
      return sortedData;
    } else {
      // Sort by oldest first (reverse order)
      return sortedData.reverse();
    }
  };

  const handleSortChange = (order: "newest" | "oldest") => {
    setSortOrder(order);
  };
  return (
    <Layout>
      <Navbar />
      <div className="p-6 space-y-6 h-[90vh] overflow-y-scroll px-6">
        {/* Date Filter */}
        <div className="flex gap-2 mb-6">
          <div
            onClick={() => handleSortChange("newest")}
            className={`text-sm px-3 py-1.5 border border-gray-300 rounded-full cursor-pointer transition-colors ${
              sortOrder === "newest"
                ? "text-gray-700 bg-gray-100"
                : "text-gray-700 bg-white hover:bg-gray-50"
            }`}
          >
            Newest
          </div>
          <div
            onClick={() => handleSortChange("oldest")}
            className={`text-sm px-3 py-1.5 border border-gray-300 rounded-full cursor-pointer transition-colors ${
              sortOrder === "oldest"
                ? "text-gray-700 bg-gray-100"
                : "text-gray-700 bg-white hover:bg-gray-50"
            }`}
          >
            Oldest
          </div>
        </div>

        {/* Briefs List */}
        <div className="space-y-6">
          {getSortedBriefsData().map((monthData, index) => (
            <Link to={"/client/briefs/brief-view"} key={index} className="mb-4">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4">
                {/* Month Header */}
                <h2 className="font-medium text-gray-900 mb-4">
                  {monthData.month}
                </h2>

                {/* Period Items */}
                <div className="space-y-3">
                  {monthData.periods.map((period, periodIndex) => (
                    <div
                      key={periodIndex}
                      className="flex justify-between items-center py-2 hover:bg-gray-100 rounded px-2 cursor-pointer"
                    >
                      <span className="text-gray-700 text-sm">
                        {period.dateRange}
                      </span>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{period.articles} Articles</span>
                        <span>•</span>
                        <span>{period.viralDiscussions} Viral Discussions</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};
