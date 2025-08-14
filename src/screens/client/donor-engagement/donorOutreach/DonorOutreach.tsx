/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from "react";
import { ArticleCard } from "./articalCard/ArticalCard";

export const DonorOutreach = ({ articlesData }: any) => {
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const months = [
    "All",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const selectedButton = buttonRefs.current[selectedMonth];
    if (selectedButton) {
      setIndicatorStyle({
        width: selectedButton.offsetWidth,
        transform: `translateX(${selectedButton.offsetLeft}px)`,
      });
    }
  }, [selectedMonth]);

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
  };

  return (
    <div className="p- bg-white w-[88%]">
      {/* <DonorSearch /> */}
      {/* Header */}
      <div className="text-xl mb-2 font-semibold">Donor By Article</div>
      {/* Month Tabs with sliding indicator */}
      <div className="relative bg-gray-100 rounded-xl p-3 overflow-x-auto">
        {/* Sliding indicator */}
        <div
          className="absolute top-3 h-10 bg-white shadow-sm border border-gray-300 rounded-xl transition-all duration-300 ease-out"
          style={indicatorStyle}
        />

        {/* Month buttons */}
        <div className="flex items-center gap-2 relative z-10">
          {months.map((month) => (
            <button
              key={month}
              //@ts-expect-error
              ref={(el) => (buttonRefs.current[month] = el)}
              onClick={() => handleMonthChange(month)}
              className={`px-4 py-1.5 rounded-full text-md font-medium transition-colors duration-200 whitespace-nowrap ${
                selectedMonth === month
                  ? "text-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {month}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Cards */}
      <div className="space-y-3 bg-gray-100 rounded-xl p-4 mt-8">
        {articlesData?.map((article: any, idx: number) => (
          <ArticleCard key={idx} article={article} />
        ))}
      </div>
    </div>
  );
};
