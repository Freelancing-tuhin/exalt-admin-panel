// components/cards/EventCard.tsx
import React from "react";

interface EventCardProps {
  title: string;
  date: string;
  image: string;
  tags: string[];
  onClick?: () => void;
}

const getTagStyle = (index: number = 0) => {
  // Cycle through the three purple shades based on index
  const colorIndex = index % 3;

  switch (colorIndex) {
    case 0:
      return `text-white backdrop-blur-sm bg-[#c084fc]/70`;
    case 1:
      return `text-white backdrop-blur-sm bg-[#a78bfa]/70`;
    case 2:
      return `text-white backdrop-blur-sm bg-[#818cf8]/70`;
    default:
      return `text-white backdrop-blur-sm bg-[#c084fc]/70`;
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
      {/* Background image */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Blur overlay with taller gradient fade */}
      <div className="absolute inset-x-0 bottom-0 h-4/7 overflow-hidden">
        <div
          className="absolute inset-0 backdrop-blur-xl bg-black/40"
          style={{
            maskImage: "linear-gradient(to top, black 85%, transparent)",
            WebkitMaskImage: "linear-gradient(to top, black 75%, transparent)",
          }}
        ></div>
      </div>

      {/* Text content */}
      <div className="absolute bottom-0 w-full p-4 flex flex-col space-y-2">
        <h3 className="text-md md:text-base font-semibold text-white drop-shadow-md truncate">
          {title}
        </h3>
        <p className="text-xs md:text-sm text-gray-200 drop-shadow-sm">
          {date}
        </p>
        <div className="flex flex-wrap gap-2 mt-1">
          {tags.map((tag, i) => (
            <span
              key={i}
              className={`px-3 py-1 rounded-full font-semibold text-xs md:text-sm ${getTagStyle(
                i
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
