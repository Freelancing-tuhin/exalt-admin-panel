/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
// import { useState } from "react";
import articlesData from "../../../database/articles.json";
import { IconTabs } from "../sectionTabs/SectionTabs";
import { RxListBullet } from "react-icons/rx";
import { useState } from "react";
import { FiExternalLink, FiTrendingDown, FiTrendingUp } from "react-icons/fi";

export const DetailedListView = ({
  articlesToShow,
  showAll,
  setShowAll,
}: any) => {
  const [activeTab, setActiveTab] = useState("What's Happening in the US");
  return (
    <div className=" ">
      <IconTabs
        tabs={[
          { label: "What's Happening in the US", icon: RxListBullet },
          { label: "What's Happening in India", icon: RxListBullet },
        ]}
        current={activeTab}
        onChange={(label: string) => setActiveTab(label)}
      />
      <div className="space-y-2 mx-auto bg-gray-100 rounded-xl p-4">
        {articlesToShow.map((article: any, idx: any) => (
          <Link
            to={`/client/data/articles/${article?._id}`}
            key={idx}
            className="bg-white rounded-xl border border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 space-y-3 sm:space-y-0"
          >
            {/* Left Side: Date and Article Info */}
            <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
              <div className="relative w-44 h-28 rounded-xl overflow-hidden">
                <img
                  src={article?.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              {/* Divider */}
              <div className="w-px h-8 sm:h-22 bg-gray-300 flex-shrink-0"></div>

              {/* Article Info */}
              <div className="min-w-0 flex-1">
                {/* <div className="text-xs font-semibold text-indigo-700 mb-1">
                  {article.section}
                </div> */}
                <div className="text- flex-shrink-0 -mt-2 mb-2">
                  <div className="text-xs font-semibold text-gray-500">
                    {article.month.split(" ")[0]}
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-indigo-700">
                    {article.month.split(" ")[1]}
                  </div>
                </div>
                <h3 className="text-md font-semibold text-gray-800 mb-1 line-clamp-2 sm:line-clamp-1">
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

            <div className="flex-shrink-0 mr-6">
              <div
                className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                  idx % 2 == 0
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                {idx % 2 == 0 ? (
                  <>
                    <FiTrendingUp className="text-green-600 w-4 h-4" />
                    <span className="text-green-700 font-semibold text-sm">
                      +10{article.trend}%
                    </span>
                  </>
                ) : (
                  <>
                    <FiTrendingDown className="text-red-600 w-4 h-4" />
                    <span className="text-red-700 font-semibold text-sm">
                      10{article.trend}%
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="flex-shrink-0 flex items-center gap-2">
              {/* <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all">
                <FiShare2 className="w-4 h-4" />
              </button> */}
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all">
                <FiExternalLink className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-shrink-0 ml-6">
              <div className="text-center bg-gray-50 rounded-lg p-2 min-w-[60px]">
                <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mb-1">
                  <div className="flex items-center gap-3">
                    <span className="ml-1font-bold text-gray-900 text-lg">
                      24
                    </span>
                    <span>Donors</span>
                    {/* Stacked avatars */}
                    {/* <div className="flex -space-x-2">
                      {[
                        "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFuJTIwYXZhdGFyfGVufDB8fDB8fHww",
                        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXZhdGFyfGVufDB8fDB8fHww",
                        "https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fwww.gravatar.com%2Favatar%2F2c7d99fe281ecd3bcd65ab915bac6dd5%3Fs%3D250",
                      ].map((avatar, i) => (
                        <img
                          key={i}
                          src={avatar}
                          className="w-7 h-7 rounded-full  shadow-sm"
                          alt=""
                        />
                      ))}
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            {/* Donor Button */}
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
