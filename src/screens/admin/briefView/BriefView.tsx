/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Layout } from "../../layout/Layout";
import Navbar from "../../../components/main/navbar/Navbar";
import data from "../../../database/articles.json";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Header } from "../../../components/shared/header/Header";

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
  const [activeTab, setActiveTab] = useState<"discussions" | "articles">(
    "articles"
  );

  return (
    <Layout>
      <Navbar back={true} />
      <div className="body min-h-screen bg-white py-10">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          {/* Header */}
          <Header
            title="Coverage: July 1 - July 14"
            author="Exalt data"
            date="Sun April 7, 2023"
            readTime="5 min"
            category="New Jersey Congressional District 1"
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
                Articles
              </button>
              <button
                onClick={() => setActiveTab("discussions")}
                className={`flex-1 py-3 text-center font-semibold transition-all duration-200 ${
                  activeTab === "discussions"
                    ? "bg-white text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-600 hover:text-indigo-500"
                }`}
              >
                Discussions
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
                    {data.map((discussion) => (
                      <div
                        key={discussion._id}
                        className="grid grid-cols-[85px_3fr_1fr_1fr] bg-white gap-5 hover:bg-gray-50 transition-all duration-200 border-b border-gray-200 last:border-0 py-4 px-4 items-center"
                      >
                        {/* Image */}
                        <div className="flex items-center justify-start">
                          <img
                            src={
                              discussion?.image &&
                              discussion.image.trim().length !== 0
                                ? discussion.image
                                : "https://images.moneycontrol.com/static-mcnews/2022/11/Immersive-exhibits-like-Van-Gogh-360%C2%B0-introduce-art-and-artists-in-a-fun-and-exciting-way.jpg?impolicy=website&width=1600&height=900"
                            }
                            alt={discussion?.title || "No image available"}
                            className="h-12 w-12 object-cover rounded-lg border border-gray-200"
                          />
                        </div>

                        {/* Title */}
                        <Link
                          to={`/client/data/articles/${discussion._id}`}
                          className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors duration-200"
                        >
                          {discussion.title}
                        </Link>

                        {/* Date */}
                        <span className="text-gray-600 text-sm">
                          {discussion.month}
                        </span>

                        {/* Action Button */}
                        <div className="flex justify-center">
                          <Link
                            to={`/client/data/articles/${discussion._id}`}
                            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 shadow-sm transition-all duration-200 text-sm"
                          >
                            Read <AiOutlineArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    ))}
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
