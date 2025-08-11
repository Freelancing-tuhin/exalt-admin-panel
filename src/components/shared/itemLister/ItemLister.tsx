import React from "react";

interface ItemListerProps {
  title: string;
  items: string[];
  className?: string;
}

export const ItemLister: React.FC<ItemListerProps> = ({
  title,
  items,
  className = "",
}) => {
  return (
    <div className={`bg-white  ${className}`}>
      <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>

      <div className="flex flex-wrap gap-3">
        {items.map((item, index) => (
          <span
            key={index}
            className="px-4 py-2 bg-gray-200 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors duration-200"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};
