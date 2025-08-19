/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Layout } from "../../layout/Layout";
import Navbar from "../../../components/main/navbar/Navbar";
import briefDataAll from "../../../database/brief.json"; // Import the brief data
import { Link, useSearchParams, useNavigate } from "react-router-dom"; // Changed from useParams to useSearchParams
import { AiOutlineArrowRight } from "react-icons/ai";
import { Header } from "../../../components/shared/header/Header";

// This 'event' object is kept for the "Discussions" tab as per your instruction.
// If discussions also need to come from brief.json, its structure would need to match.
const event: any = {
  title: "Krishna Janmāshtami Dinner",
  date: "October 15−28, 2024",
  address: "1234 East Carrolton Road",
  tag: "high_importance",
  description:
    "Writer populates an event description. Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  cultural_sensitivities: [
    "Be sure not to wear a long sleeve shirt, it is considered offensive.",
    "Sample cultural sensitivity number 2",
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

export const BriefView = () => {
  const [searchParams] = useSearchParams(); // Use useSearchParams to get query parameters
  const year = searchParams.get("year"); // Get 'year' from query string
  const month = searchParams.get("month"); // Get 'month' from query string
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"discussions" | "articles">(
    "articles"
  );
  const [briefData, setBriefData] = useState<any>(null); // State to hold the fetched brief data

  useEffect(() => {
    // Ensure year and month are available before attempting to fetch
    if (year && month) {
      // Access the specific brief data for the given year and month
      // Use type assertion to safely access properties from the JSON import
      const briefForMonth = (briefDataAll as any)?.[year]?.[month];

      if (briefForMonth) {
        setBriefData(briefForMonth);
      } else {
        // If data is not found, log a warning and potentially redirect
        console.warn(
          `No brief data found for ${month}, ${year}. Redirecting...`
        );
        // Example: navigate back to the briefs list or a 404 page
        // navigate('/client/briefs');
      }
    } else {
      // If year or month parameters are missing, redirect or show error
      console.warn("Missing year or month query parameters. Redirecting...");
      navigate("/client/briefs"); // Redirect back to the brief list
    }
  }, [year, month, navigate]); // Re-run effect if year or month changes

  // Format month name for display in header and table
  const formattedMonth = month
    ? month.charAt(0).toUpperCase() + month.slice(1)
    : "";
  const headerTitle = briefData
    ? `Coverage: ${formattedMonth} ${year}`
    : "Loading Brief...";

  if (!briefData) {
    // Show a loading state or a message while data is being fetched
    return (
      <Layout>
        <Navbar back={true} />
        <div className="body min-h-screen bg-white py-10 flex justify-center items-center">
          <p className="text-gray-600 text-lg">Loading brief details...</p>
        </div>
      </Layout>
    );
  }

  // Articles data comes from briefData.details
  const articles = briefData.details || []; // Ensure it's an array, even if empty

  return (
    <Layout>
      <Navbar back={true} />
      <div className="body min-h-screen bg-white py-10">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          {/* Header */}
          <Header
            title={headerTitle}
            author="Exalt data" // Static: not available in brief.json for a month
            date={briefData?.month} // Static: not available in brief.json for a month
            readTime="5 min" // Static: not available in brief.json for a month
            category="New Jersey Congressional District 1" // Static: not available in brief.json for a month
          />

          {/* Tabs */}
          <div className="bg-gray-100 rounded-xl shadow-lg border border-gray-200">
            <div className="flex border-b border-gray-300">
              <button
                onClick={() => setActiveTab("articles")}
                className={`flex-1 py-3 text-center font-semibold transition-all duration-200 ${
                  activeTab === "articles"
                    ? "bg-white text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-600 hover:text-indigo-500"
                }`}
              >
                Articles ({articles.length})
              </button>
              <button
                onClick={() => setActiveTab("discussions")}
                className={`flex-1 py-3 text-center font-semibold transition-all duration-200 ${
                  activeTab === "discussions"
                    ? "bg-white text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-600 hover:text-indigo-500"
                }`}
              >
                Discussions ({event.source_link.length}){" "}
                {/* Still using event data */}
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {activeTab === "discussions" && (
                <div className="overflow-x-auto">
                  <div className="min-w-[800px] p-5 bg-gray-50 rounded-lg">
                    {/* Table Header */}
                    <div className="grid grid-cols-[50px_4fr_1fr_1fr] text-black text-sm font-semibold uppercase tracking-wide py-3 px-4 border-b border-gray-300">
                      <span>#</span>
                      <span>Description</span>
                      <span>Date</span>
                      <span>Donors</span>
                    </div>

                    {/* Table Rows */}
                    {event.source_link.map((source: any, index: number) => (
                      <div
                        key={source.id}
                        className="grid grid-cols-[50px_4fr_1fr_1fr] bg-white hover:bg-gray-50 transition-all duration-200 border-b border-gray-200 last:border-0 py-3 px-4 items-center"
                      >
                        <span className="font-medium text-gray-800">
                          {index + 1}.
                        </span>
                        <p className="text-gray-700 leading-snug">
                          {source.description}
                        </p>
                        <span className="text-gray-600 text-sm">
                          {source.date}
                        </span>
                        <span className="text-gray-600 text-sm">
                          {source.donors}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "articles" && (
                <div className="overflow-x-auto">
                  <div className="min-w-[800px] p-5 bg-gray-50 rounded-lg">
                    {/* Table Header */}
                    <div className="grid grid-cols-[80px_3fr_1fr_1fr] text-black text-sm font-semibold uppercase tracking-wide py-3 px-4 border-b border-gray-300">
                      <span>Image</span>
                      <span>Description</span>
                      <span>Date</span>
                      <span className="text-center">Action</span>
                    </div>

                    {/* Rows */}
                    {articles.map(
                      (
                        article: any // Use 'article' for iteration
                      ) => (
                        <div
                          key={article._id}
                          className="grid grid-cols-[85px_3fr_1fr_1fr] bg-white gap-5 hover:bg-gray-50 transition-all duration-200 border-b border-gray-200 last:border-0 py-4 px-4 items-center"
                        >
                          {/* Image */}
                          <div className="flex items-center justify-start">
                            <img
                              src={
                                article?.image &&
                                article.image.trim().length !== 0
                                  ? article.image
                                  : "https://images.moneycontrol.com/static-mcnews/2022/11/Immersive-exhibits-like-Van-Gogh-360%C2%B0-introduce-art-and-artists-in-a-fun-and-exciting-way.jpg?impolicy=website&width=1600&height=900"
                              }
                              // src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYPIxrzQl0b6--bQVgstINh7XQeJlqGBVehA&s"}
                              alt={article?.title || "No image available"}
                              className="h-12 w-12 object-cover rounded-lg border border-gray-200"
                            />
                          </div>

                          {/* Title */}
                          <Link
                            // Route to the article details page using the article's _id
                            // Make sure your router has a route like /client/data/articles/:id
                            to={`/client/data/articles/${article._id}`}
                            className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors duration-200"
                          >
                            {article.title}
                          </Link>

                          {/* Date - Using the month from the URL as individual articles don't have dates in 'details' array */}
                          <span className="text-gray-600 text-sm">
                            {formattedMonth} {year}
                          </span>

                          {/* Action Button */}
                          <div className="flex justify-center">
                            <Link
                              // Route to the article details page using the article's _id
                              to={`/client/data/articles/${article._id}`}
                              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 shadow-sm transition-all duration-200 text-sm"
                            >
                              Read <AiOutlineArrowRight className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
