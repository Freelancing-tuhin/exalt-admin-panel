/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FiMail,
  FiCalendar,
  FiTrendingUp,
  FiTrendingDown,
  FiExternalLink,
  FiShare2,
  FiBookmark,
} from "react-icons/fi";

export const ArticleCard = ({ article, idx }: any) => {
  return (
    <div
      key={idx}
      className="bg-white border border-gray-200 px-4 py-3 rounded-xl overflow-hidden hover:bg-gray-50 hover:shadow-lg hover:border-gray-300 transition-all duration-200"
    >
      <div className="flex items-center">
        {/* Article Image */}
        <div className="flex-shrink-0 w-28 h-20 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden rounded-lg shadow-sm">
          <img
            src={
              article.image ||
              `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-bj4jHQHucqWm6nxolIX7BFinAMnt1DT6gA&s`
            }
            alt={article.title}
            className="w-full h-full object-cover"
          />
          {/* Image overlay with bookmark */}
          <div className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity">
            <button className="p-1 bg-white/80 backdrop-blur-sm rounded-full shadow-sm">
              <FiBookmark className="w-3 h-3 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Content Container */}
        <div className="flex-1 flex items-center justify-between pl-4">
          {/* Article Title and Meta */}
          <div className="flex-1 min-w-0 mr-6">
            <div className="flex items-center gap-2 mb-1">
              {article.featured && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                  Featured
                </span>
              )}
            </div>
            <h3 className="font-semibold text-gray-900 text-base truncate mb-2 hover:text-blue-600 transition-colors cursor-pointer">
              {article.title}
            </h3>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <div className="flex-shrink-0 mr-6">
                <div className="flex items-center gap-1 text-gray-600">
                  <FiCalendar className="w-4 h-4" />
                  <span className="text-sm font-medium">{article.date}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Date */}

          {/* Donors Count */}
          <div className="flex-shrink-0 mr-6">
            <div className="text-center bg-gray-50 rounded-lg p-2 min-w-[60px]">
              <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mb-1">
                <div className="flex items-center gap-3">
                  <span>Donors</span>
                  <span className="ml-1font-bold text-gray-900 text-lg">
                    {article.donors}
                  </span>
                  {/* Stacked avatars */}
                  <div className="flex -space-x-2">
                    {[
                      "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg",
                      "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg",
                      "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg",
                    ].map((avatar, i) => (
                      <img
                        key={i}
                        src={avatar}
                        className="w-7 h-7 rounded-full  shadow-sm"
                        alt=""
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trend */}
          <div className="flex-shrink-0 mr-6">
            <div
              className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                article.trend > 0
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              {article.trend > 0 ? (
                <>
                  <FiTrendingUp className="text-green-600 w-4 h-4" />
                  <span className="text-green-700 font-semibold text-sm">
                    +{article.trend}%
                  </span>
                </>
              ) : (
                <>
                  <FiTrendingDown className="text-red-600 w-4 h-4" />
                  <span className="text-red-700 font-semibold text-sm">
                    {article.trend}%
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all">
              <FiShare2 className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all">
              <FiExternalLink className="w-4 h-4" />
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2
             bg-[#1d365a]/90 text-white rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-blue-800 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <FiMail className="w-4 h-4" />
              <span>Reach Donors</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
