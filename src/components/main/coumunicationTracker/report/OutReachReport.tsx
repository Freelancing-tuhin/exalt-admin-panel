/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

export const OutReachReport: React.FC = () => {
  // Bar chart: Donations by Month
  const donationsByMonthOptions: ApexOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    xaxis: {
      categories: ["January", "February", "March", "April", "May", "June"],
      labels: { style: { fontSize: "12px" } },
    },
    yaxis: {
      labels: {
        formatter: (val) => `$${val.toLocaleString()}`,
        style: { fontSize: "12px" },
      },
    },
    colors: ["#c084fc", "#a78bfa", "#818cf8", "#9f7aea", "#d8b4fe"], // added more shades
    plotOptions: {
      bar: { borderRadius: 4, columnWidth: "50%" },
    },
    grid: { strokeDashArray: 4 },
  };
  const donationsByMonthSeries = [
    { name: "Donations", data: [10000, 15000, 10000, 8000, 11000, 14000] },
  ];

  // Donut chart: One-time vs Recurring
  const oneTimeRecurringOptions: ApexOptions = {
    chart: { type: "donut" },
    labels: ["One-Time", "Recurring"],
    colors: ["#818cf8", "#a78bfa"],
    legend: { position: "bottom" },
    dataLabels: { formatter: (val: any) => `${Math.round(val)}%` },
  };
  const oneTimeRecurringSeries = [75000.05, 45000.0];

  return (
    <div className="bg-gray-200 rounded-lg shadow p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 border-b border-gray-200 ">
        <div className="text-2xl font-medium  text-gray-800 tracking-tight">
          Your Outreach Report
        </div>
        <select className="border border-gray-200  bg-white rounded-xl px-6 py-3 text-gray-500 text-sm">
          <option>Last 6 Months</option>
          <option>Last Month</option>
          <option>Last Year</option>
        </select>
      </div>
      <div className="bg-white space-y-6 px-4 py-6 rounded-xl">
        {/* Top stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="border rounded-xl border-gray-200 pb-4">
            <h2 className="text-sm font-semibold py-3 px-4 bg-gray-100 mb-2">
              Total Donations
            </h2>
            <p className="text-2xl font-semibold px-4">$120,600.05</p>
            <p className="text-xs text-green-600 px-4">+3.5% growth</p>
          </div>

          <div className="border rounded-xl border-gray-200 pb-4">
            <h2 className="text-sm font-semibold py-3 px-4 bg-gray-100 mb-2">
              Donor Count
            </h2>
            <p className="text-2xl font-semibold px-4">550 Donors</p>
            <p className="text-xs text-green-600 px-4">+0.5% growth</p>
          </div>

          <div className="border rounded-xl border-gray-200 pb-4">
            <h2 className="text-sm font-semibold py-3 px-4 bg-gray-100 mb-2">
              One-Time Donations (Cumulative)
            </h2>
            <p className="text-2xl font-semibold px-4">$75,000.05</p>
            <p className="text-xs text-green-600 px-4">+0.3% growth</p>
          </div>

          <div className="border rounded-xl border-gray-200 pb-4">
            <h2 className="text-sm font-semibold py-3 px-4 bg-gray-100 mb-2">
              Recurring Donations (Cumulative)
            </h2>
            <p className="text-2xl font-semibold px-4">$45,000.00</p>
            <p className="text-xs text-green-600 px-4">+0.3% growth</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 border border-gray-200 bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Donations by Month</h3>
            <Chart
              options={donationsByMonthOptions}
              series={donationsByMonthSeries}
              type="bar"
              height={250}
            />
          </div>
          <div className="border border-gray-200 bg-gray-50 rounded-lg p-4 flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4">One-Time / Recurring</h3>
            <Chart
              options={oneTimeRecurringOptions}
              series={oneTimeRecurringSeries}
              type="donut"
              height={250}
            />
          </div>
        </div>

        {/* Map */}
        <div className="border border-gray-100 bg-gray-100 rounded p-4">
          <h3 className="text-lg font-semibold mb-4">Donation by State</h3>
          <div className="bg-gray-100 rounded h-48 flex items-center justify-center text-gray-400">
            Map Placeholder
          </div>
        </div>
      </div>
    </div>
  );
};
