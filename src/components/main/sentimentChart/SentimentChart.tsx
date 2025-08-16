// src/components/SentimentChart.tsx
import React, { useState } from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

const sentimentDetails: Record<
  string,
  { labels: string[]; values: number[]; colors: string[] }
> = {
  Positive: {
    labels: [
      "Happy",
      "Excited",
      "Hopeful",
      "Proud",
      "Grateful",
      "Relieved",
      "Optimistic",
    ],
    values: [25, 15, 12, 8, 6, 5, 4],
    colors: [
      "#c084fc",
      "#a78bfa",
      "#818cf8",
      "#f87171",
      "#c084fc",
      "#a78bfa",
      "#818cf8",
    ],
  },
  Negative: {
    labels: [
      "Angry",
      "Sad",
      "Frustrated",
      "Anxious",
      "Disappointed",
      "Hopeless",
      "Jealous",
    ],
    values: [20, 18, 12, 10, 9, 7, 5],
    colors: [
      "#f87171",
      "#818cf8",
      "#a78bfa",
      "#c084fc",
      "#f87171",
      "#818cf8",
      "#a78bfa",
    ],
  },
  Neutral: {
    labels: ["Okay", "Uncertain", "Calm", "Unmoved", "Bored", "Neutral"],
    values: [14, 12, 10, 8, 7, 5],
    colors: ["#818cf8", "#f87171", "#c084fc", "#a78bfa", "#818cf8", "#f87171"],
  },
};

// Overview mapping
const sentimentMap = [
  { label: "Positive", color: "#c084fc" },
  { label: "Negative", color: "#f87171" },
  { label: "Neutral", color: "#818cf8" },
];

// Overview totals
const overviewSeries = [2800, 400, 1600]; // Positive, Negative, Neutral

export const SentimentChart: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "details">(
    "overview"
  );

  // ---------------- OVERVIEW ----------------
  const overviewOptions: ApexOptions = {
    chart: { type: "pie", toolbar: { show: true } },
    labels: sentimentMap.map((s) => s.label),
    colors: sentimentMap.map((s) => s.color),
    legend: { position: "bottom", fontSize: "16px" },
    dataLabels: {
      enabled: true,
      style: { fontSize: "14px", fontWeight: "bold" },
    },
    tooltip: { y: { formatter: (val: number) => `${val} Posts` } },
  };

  // ---------------- DETAILS ----------------
  // Function to scale sub-items according to main sentiment totals
  const scaleSubItems = (subValues: number[], totalOverview: number) => {
    const subTotal = subValues.reduce((acc, v) => acc + v, 0);
    return subValues.map((v) => (v / subTotal) * totalOverview);
  };

  // Labels, values, colors for all sub-items
  const detailLabels = [
    ...sentimentDetails.Positive.labels,
    ...sentimentDetails.Negative.labels,
    ...sentimentDetails.Neutral.labels,
  ];
  const detailValues = [
    ...scaleSubItems(sentimentDetails.Positive.values, overviewSeries[0]),
    ...scaleSubItems(sentimentDetails.Negative.values, overviewSeries[1]),
    ...scaleSubItems(sentimentDetails.Neutral.values, overviewSeries[2]),
  ];
  const detailColors = [
    ...sentimentDetails.Positive.colors,
    ...sentimentDetails.Negative.colors,
    ...sentimentDetails.Neutral.colors,
  ];

  const detailOptions: ApexOptions = {
    chart: { type: "pie", toolbar: { show: true } },
    labels: detailLabels,
    colors: detailColors,
    legend: { show: false },
    dataLabels: {
      enabled: true,
      style: { fontSize: "12px", fontWeight: "bold" },
    },
    tooltip: { y: { formatter: (val: number) => `${Math.round(val)} Posts` } },
  };

  return (
    <div className="rounded-xl mx-auto mt-10 bg-gray-700 p-6">
      <div className="flex ">
        {/* Left side info */}
        <div className="w-full md:w-[60%] pr-6">
          <h3 className="text-2xl font-bold mb-4 text-gray-100">
            Discussion Sentiment
          </h3>
          <p className="text-gray-300 font-semibold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
            perspiciatis! Lorem ipsum dolor sit. Lorem ipsum dolor sit amet
            consectetur.
          </p>
          <ul
            className={`mt-10 flex flex-wrap ${
              activeTab === "details" ? " gap-y-2" : "gap-y-2"
            }`}
          >
            {(activeTab === "overview"
              ? sentimentMap
              : [
                  ...sentimentDetails.Positive.labels.map((l, i) => ({
                    label: l,
                    color: sentimentDetails.Positive.colors[i],
                  })),
                  ...sentimentDetails.Negative.labels.map((l, i) => ({
                    label: l,
                    color: sentimentDetails.Negative.colors[i],
                  })),
                  ...sentimentDetails.Neutral.labels.map((l, i) => ({
                    label: l,
                    color: sentimentDetails.Neutral.colors[i],
                  })),
                ]
            ).map((item) => (
              <li
                key={item.label}
                className={`flex items-center mb-2 text-gray-100 ${
                  activeTab === "details" ? "w-1/3" : "w-full"
                }`}
              >
                <span
                  className="w-4 h-4 rounded mr-2"
                  style={{ backgroundColor: item.color }}
                />
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Right side chart */}
        <div className="w-full w-2/3 mt-5 md:mt-0">
          <Chart
            options={activeTab === "overview" ? overviewOptions : detailOptions}
            series={activeTab === "overview" ? overviewSeries : detailValues}
            type="pie"
            height={340}
          />
        </div>
      </div>

      {/* Tabs bottom-left */}
      <div className="flex mt-6 space-x-4">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "overview"
              ? "bg-gray-100 text-gray-800"
              : "bg-gray-500 text-gray-200"
          }`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "details"
              ? "bg-gray-100 text-gray-800"
              : "bg-gray-500 text-gray-200"
          }`}
          onClick={() => setActiveTab("details")}
        >
          Details
        </button>
      </div>
    </div>
  );
};
