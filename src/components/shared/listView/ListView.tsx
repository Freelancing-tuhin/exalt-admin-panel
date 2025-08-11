/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import articlesData from "../../../database/articles.json";

// Get first 3 articles
const articles = articlesData.slice(0, 3);

export const EventsList = ({ heading, donor }: any) => {
  return (
    <div className="bg-[#f7f7f5] rounded-lg p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">{heading}</h2>
      <div className="space-y-2  mx-auto">
        {articles.map((article, idx) => (
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
        <p className="text-sm font-semibold pl-2 text-blue-600 mt-2 cursor-pointer">
          see more...
        </p>
      </div>
    </div>
  );
};
