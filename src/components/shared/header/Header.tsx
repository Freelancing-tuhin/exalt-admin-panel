import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { AiFillHome } from "react-icons/ai";
import { MdPublic } from "react-icons/md";
import { BsFillFolderFill } from "react-icons/bs";
import { FaRegClock, FaCalendarAlt } from "react-icons/fa";
import { HiOutlineEye } from "react-icons/hi";

interface HeaderProps {
  title: string;
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
  readTime,
  viewCount,
  authorTitle = "Political Correspondent",
}) => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  // Build breadcrumb items dynamically
  const breadcrumb = pathSegments.map((segment, index) => {
    const path = "/" + pathSegments.slice(0, index + 1).join("/");
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
            <div className="flex-shrink-0">
              {/* <FaUserCircle size={40} className="text-gray-400" /> */}
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRexpr8MDhqX2FNKNq08c4ELf0zDf_xj-W_4g&s"
                alt=""
                className="w-12 rounded-full border border-gray-200 bg-gray-100"
              />
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

            <div className="flex items-center gap-2">
              <FaRegClock size={14} className="text-gray-500" />
              <span className="font-medium">{readTime} read</span>
            </div>

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
