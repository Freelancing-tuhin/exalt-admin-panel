/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";

export const ViralCard = ({ item, i }: any) => {
  const createdAt = new Date(item?.createdAt || new Date()).getTime();
  const now = new Date().getTime();
  const diffMs = now - createdAt;

  // Time difference calculation
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);

  let timeAgo = "";
  if (diffMinutes < 60) {
    timeAgo = `${diffMinutes} min${diffMinutes !== 1 ? "s" : ""} ago`;
  } else if (diffHours < 24) {
    timeAgo = `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  } else if (diffDays < 7) {
    timeAgo = `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
  } else {
    timeAgo = `${diffWeeks} week${diffWeeks !== 1 ? "s" : ""} ago`;
  }

  // --- Weighted Random Tag Generator ---
  const generateRandomTag = () => {
    const rand = Math.random();
    let value, label, color;

    if (rand < 0.6) {
      // 60% chance → Hours
      value = Math.floor(Math.random() * 24) + 1;
      label = `${value} hour${value > 1 ? "s" : ""}`;
      color = "bg-green-500";
    } else if (rand < 0.85) {
      // 25% chance → Days
      value = Math.floor(Math.random() * 6) + 1;
      label = `${value} day${value > 1 ? "s" : ""}`;
      color = "bg-blue-500";
    } else {
      // 15% chance → Weeks
      value = Math.floor(Math.random() * 3) + 1;
      label = `${value} week${value > 1 ? "s" : ""}`;
      color = "bg-purple-500";
    }

    return { label, color };
  };

  const randomTag = generateRandomTag();

  return (
    <Link
      to={`/client/data/viral-discussions/${item?._id}`}
      key={i}
      className="flex-none w-96 h-64 rounded-2xl overflow-hidden shadow-lg relative group"
    >
      {/* Background Image */}
      <img
        src={
          item?.image ||
          "https://wwd.com/wp-content/uploads/2020/10/political-story-main.jpg"
        }
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Blurred gradient overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute inset-0 backdrop-blur-3xl [mask-image:linear-gradient(to_top,black,transparent_60%)]" />
      </div>

      {/* Time Ago Badge - top left */}
      {/* <div className="absolute top-3 left-3 z-20 animate-fadeIn">
        <span className="bg-white/80 text-gray-900 text-[11px] font-medium px-2.5 py-1 rounded-md shadow-md">
          {timeAgo}
        </span>
      </div> */}

      {/* Randomized Tag Badge - bottom right */}
      <div className="absolute bottom-3 right-3 z-20">
        <span
          className={`${randomTag.color} text-white text-xs font-medium px-3 py-1 rounded-full shadow-md`}
        >
          {randomTag.label}
        </span>
      </div>

      {/* Card content */}
      <div className="absolute bottom-0 px-5 pb-4 text-white space-y-3 w-full">
        {item.tag && (
          <span className="bg-white/70 text-black backdrop-blur-sm text-xs px-3 py-1 rounded-full">
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
