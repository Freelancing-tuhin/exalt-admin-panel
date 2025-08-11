// import React from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

export const SentimentChart = () => {
  const chartOptions: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        horizontal: false,
        columnWidth: "45%",
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["Negative", "Neutral", "Positive"],
      labels: {
        style: {
          colors: ["#00000080", "#00000080", "#00000080"],
          fontSize: "14px",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        text: "Posts",
        style: {
          fontSize: "14px",
          fontWeight: 600,
          color: "#4B5563",
        },
      },
      labels: {
        style: {
          colors: ["#4B5563"],
          fontSize: "12px",
        },
      },
    },
    colors: ["#DC2626", "#FACC15", "#16A34A"],
    tooltip: {
      y: {
        formatter: (val: number) => `${val} Posts`,
      },
    },
    grid: {
      strokeDashArray: 4,
      borderColor: "#E5E7EB",
    },
  };

  const chartSeries = [
    {
      name: "Posts",
      data: [2800, 400, 1600],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h3 className="text-xl font-bold text-gray-800 mb-2">
        Discussion Sentiment
      </h3>
      <div className="px-10 ">
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={300}
        />
      </div>
    </div>
  );
};
