/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
// import { Flame } from "lucide-react";

export const ViralCard = ({ item, i }: any) => {
  //   const createdAt = new Date(item.createdAt).getTime();
  //   const now = new Date().getTime();
  //   const hoursAgo = Math.floor((now - createdAt) / (1000 * 60 * 60));
  //   const isRecent = hoursAgo <= 12;

  // Random color classes for tags
  //   const tagColors: Record<string, string> = {
  //     Education: "bg-blue-500/80",
  //     Healthcare: "bg-green-500/80",
  //     Technology: "bg-purple-500/80",
  //     Politics: "bg-red-500/80",
  //     Sports: "bg-orange-500/80",
  //     default: "bg-gray-500/80",
  //   };
  //   const tagColorClass =
  //     tagColors[item.tag as keyof typeof tagColors] || tagColors.default;

  return (
    <Link
      to={`/client/data/viral-discussions/${item?._id}`}
      key={i}
      className="flex-none w-96 h-64 rounded-2xl overflow-hidden shadow-lg relative group"
    >
      {/* Background Image */}
      <img
        src={item?.image || "https://wwd.com/wp-content/uploads/2020/10/political-story-main.jpg"}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Blurred gradient overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute inset-0 backdrop-blur-3xl [mask-image:linear-gradient(to_top,black,transparent_60%)]" />
      </div>

      {/* Trending badge - top right */}
      {/* {true && (
        <div className="absolute top-3 right-3 z-20 animate-fadeIn">
          <span className="flex items-center gap-1 bg-red-600/90 text-white text-[11px] px-2.5 py-1 rounded-md shadow-md">
            <Flame size={14} className="text-yellow-300" />
            <span className="font-medium">
              Trending {hoursAgo === 0 ? "Now" : `${hoursAgo}h`}
            </span>
          </span>
        </div>
      )} */}

      {/* Card content */}
      <div className="absolute bottom-0 px-5 pb-4 text-white space-y-3 w-full">
        {item.tag && (
          <span
            className={`bg-white/70 text-black  backdrop-blur-sm text-xs px-3 py-1 rounded-full`}
          >
            {item.tag}
          </span>
        )}

        {/* Title */}
        <h3 className="text-lg font-semibold leading-snug mt-2">
          {item.title.length > 60
            ? `${item.title.substring(0, 60)}...`
            : item.title}
        </h3>

        {/* Description */}
        <p className="text-md text-gray-200 line-clamp-2">{item.posts}</p>
      </div>
    </Link>
  );
};
