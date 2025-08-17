import React, { useState } from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

// Detail colors remain varied for the granular view
const sentimentDetails: Record<
  string,
  { labels: string[]; values: number[]; colors: string[] }
> = {
  Positive: {
    labels: ["Happy", "Excited", "Hopeful", "Proud", "Grateful", "Relieved", "Optimistic"],
    values: [25, 15, 12, 8, 6, 5, 4],
    colors: [
      "#22c55e", // Vivid Green
      "#10b981", // Emerald
      "#0d9488", // Dark Teal
      "#0f766e", // Pine Green
      "#15803d", // Forest Green
      "#065f46", // Darker Forest
      "#0ea5e9", // Sky Blue (as a contrast for subtle optimism)
    ],
  },
  Negative: {
    labels: ["Angry", "Sad", "Frustrated", "Anxious", "Disappointed", "Hopeless", "Jealous"],
    values: [20, 18, 12, 10, 9, 7, 5],
    colors: [
      "#dc2626", // Bold Red
      "#ef4444", // Light Red
      "#b91c1c", // Dark Red
      "#ea580c", // Dark Orange
      "#f97316", // Orange
      "#fb923c", // Light Orange
      "#facc15", // Amber (for anxiety/jealousy, a less aggressive negative)
    ],
  },
  Neutral: {
    labels: ["Okay", "Uncertain", "Calm", "Unmoved", "Bored", "Neutral"],
    values: [14, 12, 10, 8, 7, 5],
    colors: [
      "#3b82f6", // Bright Blue
      "#2563eb", // Medium Blue
      "#1d4ed8", // Dark Blue
      "#6366f1", // Indigo
      "#4f46e5", // Dark Indigo
      "#7c3aed", // Violet
    ],
  },
};

// --- UPDATED: Professional, modern, shaded colors for the OVERVIEW chart ---
const sentimentMap = [
  { label: "Positive", color: "#0D9488" }, // Deep Teal
  { label: "Negative", color: "#A31F34" }, // Rich Burgundy
  { label: "Neutral", color: "#5B21B6" }, // Deep Violet
];
// --- END UPDATED ---

const overviewSeries = [2800, 400, 1600]; // Total 4800 posts

export const SentimentChart: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "details">("overview");

  // Calculate total posts for the central doughnut label (should be 4800)
  const totalPostsOverall = overviewSeries.reduce((a, b) => a + b, 0); // This will be 4800

  const overviewOptions: ApexOptions = {
    chart: {
      type: "donut", // Doughnut chart
      toolbar: { show: false }, // Hide toolbar for cleaner look
      //@ts-ignore
      animations: { enabled: true, easing: 'easeinout', speed: 800 },
    },
    labels: sentimentMap.map((s) => s.label),
    colors: sentimentMap.map((s) => s.color),
    legend: {
      position: "bottom",
      fontSize: "14px",
      labels: { colors: "#6b7280" },
      //@ts-ignore
      markers: { width: 12, height: 12, radius: 4 },
      itemMargin: { horizontal: 8, vertical: 4 },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, { seriesIndex, w }) {
        //@ts-ignore
        const value = w.globals.series[seriesIndex];
        return `${Math.round(parseFloat(val as string))}%`;
      },
      style: { fontSize: "14px", fontWeight: "bold", colors: ["#fff"] },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        opacity: 0.4,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%", // Doughnut hole size
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '18px',
              color: '#6b7280',
              offsetY: -10
            },
            value: {
              show: true,
              fontSize: '28px',
              color: '#1f2937',
              offsetY: 8,
              //@ts-ignore
              formatter: function (val) {
                // Display the total overall posts here
                return `${totalPostsOverall}`;
              }
            },
            total: {
              show: true,
              label: 'Total Posts', // Label for the central value
              color: '#6b7280',
              //@ts-ignore
              formatter: function (w) {
                return `${totalPostsOverall}`; // Explicitly showing 4800
              }
            }
          },
        },
      },
    },
    stroke: {
      width: 3, // White stroke for separation
      colors: ["#ffffff"],
    },
    tooltip: {
      fillSeriesColor: false,
      y: { formatter: (val: number) => `${val} Posts` },
      style: { fontSize: "13px" },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark", // Gradient will be darker
        type: "radial", // Radial gradient for pie/donut charts
        shadeIntensity: 0.7, // How strong the gradient effect is
        // --- UPDATED: Gradient end colors to match new overview palette ---
        gradientToColors: [
          "#20CFC1", // Darker Teal
          "#C44158", // Darker Burgundy
          "#7D5BD6", // Darker Violet
        ],
        // --- END UPDATED ---
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 0.9,
        stops: [0, 100]
      }
    }
  };

  const scaleSubItems = (subValues: number[], totalOverview: number) => {
    const subTotal = subValues.reduce((acc, v) => acc + v, 0);
    return subValues.map((v) => (v / subTotal) * totalOverview);
  };

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
    chart: {
      type: "donut", // Doughnut chart
      toolbar: { show: false }, // Hide toolbar for cleaner look
      //@ts-ignore
      animations: { enabled: true, easing: 'easeinout', speed: 800 },
    },
    labels: detailLabels,
    colors: detailColors,
    legend: { show: false }, // Custom legend will be used
    dataLabels: {
      enabled: true,
      formatter: function (val, { seriesIndex, w }) {
        const value = w.globals.series[seriesIndex];
        // Only show label if slice is > 3% of the *total overall posts* for better readability
        if ((value / totalPostsOverall) * 100 > 3) {
            return `${Math.round(parseFloat(val as string))}%`;
        }
        return ''; // Hide small labels
      },
      style: { fontSize: "12px", fontWeight: "bold", colors: ["#fff"] },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        opacity: 0.4,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%", // Doughnut hole size
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '18px',
              color: '#6b7280',
              offsetY: -10
            },
            value: {
              show: true,
              fontSize: '28px',
              color: '#1f2937',
              offsetY: 8,
              //@ts-ignore
              formatter: function (val) {
                // Display the total overall posts here
                return `${totalPostsOverall}`;
              }
            },
            total: {
              show: true,
              label: 'Total Posts', // Label for the central value
              color: '#6b7280',
              //@ts-ignore
              formatter: function (w) {
                return `${totalPostsOverall}`; // Explicitly showing 4800
              }
            }
          },
        },
      },
    },
    stroke: {
      width: 3, // White stroke for separation
      colors: ["#ffffff"],
    },
    tooltip: {
      fillSeriesColor: false,
      y: { formatter: (val: number) => `${Math.round(val)} Posts` }, // Round value for display
      style: { fontSize: "13px" },
    },
  };

  const getSummaryText = () => {
    if (activeTab === "overview") {
      const maxIndex = overviewSeries.indexOf(Math.max(...overviewSeries));
      const dominant = sentimentMap[maxIndex].label;
      const dominantPercentage = Math.round(
        (overviewSeries[maxIndex] / totalPostsOverall) * 100
      );
      return `Overall, the discussion is mostly ${dominant.toLowerCase()} with ${dominantPercentage}% of conversations showing a ${dominant.toLowerCase()} tone.`;
    } else {
      const sorted = detailLabels
        .map((label, i) => ({ label, value: detailValues[i] }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 3);
      return `People are primarily feeling ${sorted
        .map(
          (s) =>
            `${s.label.toLowerCase()} (${Math.round(
              (s.value / totalPostsOverall) * 100
            )}%)` // Percentage relative to overall total
        )
        .join(", ")} in the current discussions.`;
    }
  };

  return (
    <div className="rounded-xl mx-auto mt-10 bg-white p-6 shadow-md border border-gray-200">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-[50%] pr-6">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            Discussion Sentiment
          </h3>
          <p className="text-gray-600 text-base leading-relaxed font-medium">
            {getSummaryText()}
          </p>

          <ul className="mt-8 flex flex-wrap gap-y-2">
            {(activeTab === "overview"
              ? sentimentMap
              : detailLabels.map((l, i) => ({ label: l, color: detailColors[i] }))
            ).map((item) => (
              <li
                key={item.label}
                className={`flex items-center mb-2 text-gray-700 ${
                  activeTab === "details" ? "w-1/2 md:w-1/3" : "w-full"
                }`}
              >
                <span
                  className="w-4 h-4 rounded mr-2 border border-gray-300"
                  style={{ backgroundColor: item.color }}
                />
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full md:w-[50%] mt-6 md:mt-0 flex justify-center items-center relative">
          <Chart
            options={activeTab === "overview" ? overviewOptions : detailOptions}
            series={activeTab === "overview" ? overviewSeries : detailValues}
            type="donut"
            height={360}
          />
        </div>
      </div>

      <div className="flex mt-6 space-x-4">
        <button
          className={`px-5 py-2 rounded-lg font-semibold transition border ${
            activeTab === "overview"
              ? "bg-gray-100 text-gray-900 border-gray-300"
              : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
          }`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`px-5 py-2 rounded-lg font-semibold transition border ${
            activeTab === "details"
              ? "bg-gray-100 text-gray-900 border-gray-300"
              : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
          }`}
          onClick={() => setActiveTab("details")}
        >
          Details
        </button>
      </div>
    </div>
  );
};