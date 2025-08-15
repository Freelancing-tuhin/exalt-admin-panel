/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
// import { useState } from "react";
import articlesData from "../../../database/articles.json";

export const EventsList = ({
  heading,
  donor,
  articlesToShow,
  showAll,
  setShowAll,
  showDonor,
}: any) => {
  return (
    <div className="bg-[#f7f7f5] rounded-lg p-3 sm:p-4">
      <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4">
        {heading}
      </h2>
      <div className="space-y-2 mx-auto">
        {articlesToShow.map((article: any, idx: any) => (
          <Link
            to={`/client/data/articles/${article?._id}`}
            key={idx}
            className="bg-white rounded-xl border border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 space-y-3 sm:space-y-0"
          >
            {/* Left Side: Date and Article Info */}
            <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
              <div className="text-center flex-shrink-0">
                <div className="text-xs font-semibold text-gray-500">
                  {article.month.split(" ")[0]}
                </div>
                <div className="text-lg sm:text-xl font-bold text-indigo-700">
                  {article.month.split(" ")[1]}
                </div>
              </div>

              {/* Divider */}
              <div className="w-px h-8 sm:h-10 bg-gray-300 flex-shrink-0"></div>

              {/* Article Info */}
              <div className="min-w-0 flex-1">
                {/* <div className="text-xs font-semibold text-indigo-700 mb-1">
                  {article.section}
                </div> */}
                <h3 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-2 sm:line-clamp-1">
                  {article.title.length > 80
                    ? `${article.title.substring(0, 80)}...`
                    : article.title}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-2 sm:line-clamp-1">
                  {article.context.length > 80
                    ? `${article.context.substring(0, 80)}...`
                    : article.context}
                </p>
              </div>
            </div>

            {/* Donor Button */}
            {showDonor && donor && (
              <div className="flex justify-end sm:flex-shrink-0">
                <button className="flex items-center gap-1 text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded-md transition-colors">
                  {/* <FiPlus className="w-3 h-3 sm:w-4 sm:h-4" /> */}
                  <span className="whitespace-nowrap">
                    {idx * 9} potential donors
                  </span>
                </button>
              </div>
            )}
          </Link>
        ))}
        {articlesData.length > 3 && (
          <p
            className="text-xs sm:text-sm font-semibold pl-2 text-blue-600 mt-2 cursor-pointer hover:text-blue-800 transition-colors"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "show less..." : "see more..."}
          </p>
        )}
      </div>
    </div>
  );
};
