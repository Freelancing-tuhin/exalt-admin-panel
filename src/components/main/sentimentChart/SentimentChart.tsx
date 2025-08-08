import React from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts"; 

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-2xl shadow-md border border-gray-200 bg-white">
    {children}
  </div>
);

const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="p-6">{children}</div>
);

export const SentimentChart = () => {
  const chartOptions: ApexOptions = {
    chart: {
      type: 'bar', 
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
        text: 'Posts',
        style: {
          fontSize: '14px',
          fontWeight: 600,
          color: '#4B5563'
        }
      },
      labels: {
        style: {
          colors: ['#4B5563'],
          fontSize: '12px',
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
      borderColor: '#E5E7EB', 
    },
  };

  const chartSeries = [
    {
      name: "Posts",
      data: [2800, 400, 1600],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Jane Street Fined By SEBI
          </h2>
          <p className="text-sm text-gray-500">July 7, 2025 • India News</p>
        </div>
      </div>

      <Card>
        <CardContent>
          <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div className="flex gap-2 flex-wrap">
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                reddit.com/r/IndiaNews
              </span>
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                @kentheseb
              </span>
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                twitter.com/#Boeing
              </span>
            </div>
            <p className="text-sm font-medium text-gray-600 mt-4 sm:mt-0">
              21 Likely Interested Donors
            </p>
          </div>

          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Discussion Sentiment
          </h3>

          <Chart
            options={chartOptions}
            series={chartSeries}
            type="bar" 
            height={300}
          />
        </CardContent>
      </Card>
    </div>
  );
};