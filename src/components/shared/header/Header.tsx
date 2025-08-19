/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import { AiFillHome } from "react-icons/ai";
import { MdPublic } from "react-icons/md";
import { BsFillFolderFill } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { HiOutlineEye } from "react-icons/hi";

interface HeaderProps {
  title: any;
  author: string;
  date: string;
  category: string;
  readTime: string;
  viewCount?: number;
  authorTitle?: string;
}

// Map route segment to label + icon
const segmentMap: Record<
  string,
  { label: string; icon: React.ReactNode; url?: string }
> = {
  client: { label: "Home", icon: <AiFillHome size={16} />, url: "/" },
  data: { label: "Data", icon: <MdPublic size={16} />, url: "/client/data" },
  "viral-discussions": {
    label: "Viral Discussions",
    icon: <BsFillFolderFill size={16} />,
    url: "/client/data/viral-discussions",
  },
  politics: {
    label: "Politics",
    icon: <MdPublic size={16} />,
    url: "/politics",
  },
  policy: {
    label: "Policy",
    icon: <BsFillFolderFill size={16} />,
    url: "/policy",
  },
};

export const Header: React.FC<HeaderProps> = ({
  title,
  author,
  date,
  viewCount,
  authorTitle = "Political Correspondent",
}) => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  // Build breadcrumb items dynamically
  const breadcrumb = pathSegments.map((segment, index) => {
    const path = "/" + pathSegments.slice(0, index).join("/");
    const mapped = segmentMap[segment] || {
      label: decodeURIComponent(segment).replace(/-/g, " "),
      icon: <BsFillFolderFill size={16} />,
    };
    return {
      ...mapped,
      url: index < pathSegments.length - 1 ? path : undefined,
    };
  });

  //   const categoryStyle = categoryColors[category] || categoryColors.default;

  return (
    <header className=" ">
      <div className="ml mx-auto px-4 pt-8 pb-4">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-600 mb-6 font-medium">
          {breadcrumb.map((item, i) => (
            <React.Fragment key={i}>
              {item.url ? (
                <Link
                  to={item.url}
                  className="flex items-center gap-2 hover:text-blue-700 transition-colors duration-200 group"
                >
                  <span className="text-gray-500 group-hover:text-blue-600 transition-colors duration-200">
                    {item.icon}
                  </span>
                  <span className="capitalize">{item.label}</span>
                </Link>
              ) : (
                <span className="flex items-center gap-2 text-gray-700 font-semibold">
                  <span className="text-gray-600">{item.icon}</span>
                  <span className="capitalize">{item.label}</span>
                </span>
              )}
              {i < breadcrumb.length - 1 && (
                <FiChevronRight className="mx-3 text-gray-400" size={16} />
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Title */}
        <h1 className="text-2xl sm:text-4xl font-semibold text-gray-900 leading-tight mb-6 tracking-tight ">
          {title}
        </h1>

        {/* Author and Meta Information */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 b">
          {/* Author Info */}
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center bg-gradient-to-br bg-blue-200 to-red-200 rounded-full h-15 w-15 p-4 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-auto"
                viewBox="0 0 76 20"
                fill="none"
              >
                <g>
                  <path
                    d="M 0 19.364 L 0 0 L 75.734 0 L 75.734 19.364 Z"
                    fill="transparent"
                  />
                  <path
                    d="M 61.603 3.818 L 61.603 0 L 75.679 0 L 75.679 3.818 L 70.696 3.818 L 70.696 19.364 L 66.71 19.364 L 66.71 3.818 Z"
                    fill="#5042B7"
                  />
                  <path
                    d="M 54.503 0 L 54.503 15.41 L 61.479 15.41 L 61.479 19.364 L 50.517 19.364 L 50.517 0 Z"
                    fill="#5042B7"
                  />
                  <path
                    d="M 36.379 19.364 L 32.324 19.364 L 38.651 0 L 42.443 0 L 48.773 19.364 L 44.646 19.364 L 43.378 14.524 L 40.511 14.524 L 37.643 14.524 Z M 40.043 5.982 L 38.397 11.633 L 42.648 11.633 L 41.003 5.982 C 40.811 5.325 40.595 4.564 40.523 4.091 C 40.451 4.537 40.259 5.273 40.043 5.982 Z"
                    fill="#5042B7"
                  />
                  <path
                    d="M 27.056 12.324 C 26.256 10.721 26.27 8.765 27.094 7.144 C 28.067 5.234 29.24 2.882 30.102 1.002 C 30.116 0.971 30.13 0.942 30.144 0.912 C 30.208 0.781 30.37 0.441 30.58 0 L 26.234 0 C 25.468 1.621 24.533 3.491 23.721 5.087 C 22.264 7.952 22.219 11.45 23.668 14.352 L 26.171 19.364 L 30.57 19.364 L 30.1 18.42 Z"
                    fill="#5042B7"
                  />
                  <path
                    d="M 16.546 12.324 C 17.347 10.721 17.332 8.765 16.508 7.144 C 15.536 5.234 14.363 2.882 13.5 1.002 C 13.486 0.971 13.472 0.942 13.458 0.912 C 13.395 0.781 13.232 0.441 13.022 0 L 17.368 0 C 18.135 1.621 19.069 3.491 19.881 5.087 C 21.338 7.952 21.383 11.45 19.935 14.352 L 17.432 19.364 L 13.033 19.364 L 13.502 18.42 Z"
                    fill="#5042B7"
                  />
                  <path
                    d="M 11.278 19.364 L 0 19.364 L 0 0 L 11.258 0 L 11.258 3.804 L 3.867 3.804 L 3.867 7.614 L 10.418 7.614 L 10.418 11.344 L 3.867 11.344 L 3.867 15.364 L 11.258 15.364 Z"
                    fill="#5042B7"
                  />
                </g>
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                {author}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {authorTitle}
              </div>
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <FaCalendarAlt size={14} className="text-gray-500" />
              <span className="font-medium">{date}</span>
            </div>

            {/* <div className="flex items-center gap-2">
              <FaRegClock size={14} className="text-gray-500" />
              <span className="font-medium">{readTime} read</span>
            </div> */}

            {viewCount && (
              <div className="flex items-center gap-2">
                <HiOutlineEye size={16} className="text-gray-500" />
                <span className="font-medium">
                  {viewCount.toLocaleString()} views
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
