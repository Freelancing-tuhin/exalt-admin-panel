// components/cards/EventCard.tsx
import React from "react";

interface EventCardProps {
  title: string;
  date: string;
  image: string;
  tags: string[];
  onClick?: () => void;
}

const getTagStyle = (tag: string) => {
  switch (tag.toLowerCase()) {
    case "arts":
    case "wedding":
      return "bg-blue-600/70 text-white backdrop-blur-sm";
    case "music":
      return "bg-green-600/70 text-white backdrop-blur-sm";
    case "general":
      return "bg-gray-700/70 text-white backdrop-blur-sm";
    case "charity":
      return "bg-pink-600/70 text-white backdrop-blur-sm";
    case "hindu":
      return "bg-gray-800/70 text-white backdrop-blur-sm";
    case "telugu":
      return "bg-purple-600/70 text-white backdrop-blur-sm";
    case "dinner":
      return "bg-fuchsia-600/70 text-white backdrop-blur-sm";
    case "high":
      return "bg-red-600/70 text-white backdrop-blur-sm";
    case "service":
      return "bg-orange-600/70 text-white backdrop-blur-sm";
    case "grand opening":
      return "bg-green-700/70 text-white backdrop-blur-sm";
    default:
      return "bg-gray-700/70 text-white backdrop-blur-sm";
  }
};

export const EventCard: React.FC<EventCardProps> = ({
  title,
  date,
  image,
  tags,
  onClick,
}) => {
  return (
    <div
      className="relative cursor-pointer rounded-2xl overflow-hidden h-64 w-full"
      onClick={onClick}
    >
      {/* Full image */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark gradient overlay at the bottom with deeper shadow */}
      <div className="absolute bottom-0 w-full p-4 
  bg-gradient-to-t from-black/95 via-black/80 to-transparent 
  flex flex-col space-y-2">
        <h3 className="text-md md:text-base font-semibold text-white drop-shadow-md truncate">
          {title}
        </h3>
        <p className="text-xs md:text-sm text-gray-200 drop-shadow-sm">{date}</p>
        <div className="flex flex-wrap gap-2 mt-1">
          {tags.map((tag, i) => (
            <span
              key={i}
              className={`px-3 py-1 rounded-full font-semibold text-xs md:text-sm ${getTagStyle(
                tag
              )}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
