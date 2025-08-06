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
      return "bg-blue-100 text-blue-800";
    case "music":
      return "bg-green-100 text-green-800";
    case "general":
      return "bg-gray-200 text-gray-700";
    case "charity":
      return "bg-pink-100 text-pink-800";
    case "hindu":
      return "bg-gray-100 text-gray-600";
    case "telugu":
      return "bg-purple-100 text-purple-800";
    case "dinner":
      return "bg-fuchsia-100 text-fuchsia-800";
    case "high":
      return "bg-red-100 text-red-700";
    case "service":
      return "bg-orange-100 text-orange-800";
    case "grand opening":
      return "bg-green-200 text-green-900";
    default:
      return "bg-gray-100 text-gray-600";
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
    <div className="border-1 border-gray-200 h-48 rounded-lg overflow-hidden bg-white shadow-sm" onClick={onClick}>
      <img src={image} alt={title} className="w-full h-28 object-cover" />
      <div className="p-3 space-y-1 flex">
        <div className="w-1/2">
          <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
          <p className="text-xs text-gray-500">{date}</p>
        </div>

        <div className="w-1/2 flex justify-end flex-wrap gap-1 mt-1">
          {tags.map((tag, i) => (
            <span
              key={i}
              className={`text-xs h-6  px-2 py-0.5 rounded-full font-medium ${getTagStyle(
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
