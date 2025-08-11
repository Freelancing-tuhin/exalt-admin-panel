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
}: any) => {
  return (
    <div className="bg-[#f7f7f5] rounded-lg p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">{heading}</h2>
      <div className="space-y-2  mx-auto">
        {articlesToShow.map((article: any, idx: any) => (
          <Link
            to={`/client/data/articles/${idx}`}
            key={idx}
            className="bg-white rounded-xl border border-gray-200 flex justify-between items-center p-4"
          >
            {/* Left Side: Date and Month */}
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-xs font-semibold text-gray-500">
                  {article.month.split(" ")[0]}
                </div>
                <div className="text-xl font-bold text-indigo-700">
                  {article.month.split(" ")[1]}
                </div>
              </div>

              {/* Divider */}
              <div className="w-px h-10 bg-gray-300"></div>

              {/* Article Info */}
              <div>
                <div className="text-xs font-semibold text-indigo-700 mb-1">
                  {article.section}
                </div>
                <h3 className="text-sm font-semibold text-gray-800 mb-1">
                  {article.title}
                </h3>
                <p className="text-xs text-gray-600">
                  {article.context.length > 100
                    ? `${article.context.substring(0, 100)}...`
                    : article.context}
                </p>
              </div>
            </div>

            {/* Add to Calendar Button */}
            {donor && (
              <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium">
                {/* <FiPlus className="w-4 h-4" /> */}
                {idx * 9} potential donor
              </button>
            )}
          </Link>
        ))}
        {articlesData.length > 3 && (
          <p
            className="text-sm font-semibold pl-2 text-blue-600 mt-2 cursor-pointer hover:text-blue-800 transition-colors"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "show less..." : "see more..."}
          </p>
        )}
      </div>
    </div>
  );
};
