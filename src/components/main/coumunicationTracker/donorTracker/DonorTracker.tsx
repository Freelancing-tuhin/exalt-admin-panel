import { useState } from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

interface EmailCampaign {
  email: string;
  date: string;
  sentCount: number;
}

export const DonorTracker = () => {
  const [emailCampaigns] = useState<EmailCampaign[]>([
    { email: "JohnSmith@gmail.com", date: "05/03/25", sentCount: 100 },
    { email: "MaryMiller@yahoo.com", date: "04/10/25", sentCount: 20 },
    { email: "Joe.Smith@comcast.net", date: "04/01/25", sentCount: 35 },
    { email: "LilySmith@verizon.net", date: "04/01/25", sentCount: 15 },
    { email: "CollinJones@gmail.net", date: "03/03/25", sentCount: 101 },
    { email: "Joe.Smith@yahoo.com", date: "03/01/25", sentCount: 95 },
    { email: "MonicaMeek@gmail.com", date: "02/01/25", sentCount: 75 },
  ]);

  // Chart data
  const chartData = {
    series: [25, 30, 20, 25], // Sample percentages for each category
    labels: ["Responded", "Opened", "Forwarded", "Deleted"],
  };

  const chartOptions: ApexOptions = {
    chart: {
      type: "pie",
      height: 300,
      fontFamily: "Inter, sans-serif",
    },
    colors: ["#10b981", "#3b82f6", "#f59e0b", "#ef4444"], // Green, Blue, Yellow, Red
    labels: chartData.labels,
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "12px",
      fontWeight: 500,
      markers: {
        size: 8,
        strokeWidth: 0,
      },
      itemMargin: {
        horizontal: 15,
        vertical: 5,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "0%",
        },
        expandOnClick: false,
        dataLabels: {
          offset: 0,
          minAngleToShowLabel: 10,
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return Math.round(val) + "%";
      },
      style: {
        fontSize: "12px",
        fontWeight: "600",
        colors: ["#fff"],
      },
      dropShadow: {
        enabled: false,
      },
    },
    stroke: {
      width: 2,
      colors: ["#fff"],
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return val + "%";
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 250,
          },
          legend: {
            fontSize: "10px",
          },
        },
      },
    ],
  };

  return (
    <div className="bg-gray-200 rounded-lg border border-gray-200 p-6 shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4 mb-2">
        <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
          Outreach Tracker
        </h2>
      </div>

      <div className="grid grid-cols-1 bg-white lg:grid-cols-2 gap-8 p-6 rounded-lg ">
        {/* Left Side - Emails Sent to Donors Table */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-100 pb-2">
            Emails Sent to Donors
          </h3>

          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email Campaign
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    # Sent
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {emailCampaigns.map((campaign, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                      {campaign.email}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {campaign.date}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 font-semibold">
                      {campaign.sentCount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side - Chart */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-100 pb-2">
            Monthly Response Analysis
          </h3>

          <div className="bg-gray-100 rounded-lg p-4">
            <Chart
              options={chartOptions}
              series={chartData.series}
              type="pie"
              height={325}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
