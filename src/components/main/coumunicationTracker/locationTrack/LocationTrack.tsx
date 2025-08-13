/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

interface EmailLocationData {
  email: string;
  subject: string;
  date: string;
  location: string;
}

export const LocationTrack = () => {
  const [emailData] = useState<EmailLocationData[]>([
    {
      email: "EMAIL",
      subject: "SUBJECT",
      date: "DATE",
      location: "Washington",
    },
    {
      email: "EMAIL",
      subject: "SUBJECT",
      date: "DATE",
      location: "Washington",
    },
    {
      email: "EMAIL",
      subject: "SUBJECT",
      date: "DATE",
      location: "Washington",
    },
    {
      email: "EMAIL",
      subject: "SUBJECT",
      date: "DATE",
      location: "Washington",
    },
    {
      email: "EMAIL",
      subject: "SUBJECT",
      date: "DATE",
      location: "Washington",
    },
  ]);

  const [mapView, setMapView] = useState<"Local" | "State" | "National">(
    "State"
  );

  // Image URLs for toggle views
  const mapImages: Record<string, string> = {
    Local: "https://via.placeholder.com/500x300?text=Local+Map",
    State:
      "https://gisgeography.com/wp-content/uploads/2020/02/US-Capitals-Map-scaled.jpg",
    National: "https://via.placeholder.com/500x300?text=National+Map",
  };

  const openRateData = { series: [66.7] };
  const responseRateData = { series: [64.7] };

  const pieChartOptions = (color: string): ApexOptions => ({
    chart: { type: "radialBar", height: 120, sparkline: { enabled: true } },
    colors: [color],
    plotOptions: {
      radialBar: {
        startAngle: 0,
        endAngle: 360,
        track: { background: "#ffffffff", strokeWidth: "100%", margin: 5 },
        dataLabels: {
          name: { show: false },
          value: {
            show: false,
            fontSize: "10px",
            fontWeight: "600",
            color: "#ffffff",
            formatter: (val: number) => val + "%",
          },
        },
        hollow: { size: "50%" },
      },
    },
    stroke: { lineCap: "round" },
    labels: ["Progress"],
  });

  return (
    <div className="bg-gray-200 rounded-lg border border-gray-200 p-6 shadow-sm mt-5">
      <div className="border-b border-gray-200 pb-4 mb-2">
        <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
          Email Campaign Analytics
        </h2>
      </div>

      {/* Single row layout */}
      <div className="bg-white p-6 rounded-xl grid grid-cols-1 lg:grid-cols-[2fr_2fr_0.7fr] gap-6">
        {/* Left - Map */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-2">
            Emails by Location
          </h3>

          <div className="bg-gray-100 rounded-lg border border-gray-200 p-4 h- flex items-center justify-center">
            <img
              src={mapImages[mapView]}
              alt={`${mapView} Map`}
              className="w-full h-full object-contain rounded"
            />
          </div>

          {/* Toggle */}
          <div className="flex justify-center gap-2 mt-3">
            {["Local", "State", "National"].map((view) => (
              <button
                key={view}
                onClick={() => setMapView(view as any)}
                className={`px-3 py-1 text-sm rounded border ${
                  mapView === view
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {view}
              </button>
            ))}
          </div>
        </div>

        {/* Middle - Best Performing Outreach */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-2">
            Best Performing Outreach
          </h3>

          <select className="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm mt-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>MONTH ▼</option>
            <option>January</option>
            <option>February</option>
            <option>March</option>
            <option>April</option>
            <option>May</option>
            <option>June</option>
          </select>

          <div className="space-y-2">
            {emailData.map((item, index) => (
              <div key={index} className="bg-gray-100 rounded-md p-3 text-sm">
                <div className="grid grid-cols-3 gap-2 text-gray-600">
                  <span>{item.email}</span>
                  <span>{item.subject}</span>
                  <span>{item.date}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {item.location}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Charts */}
        <div>
          {/* <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-2">
            Performance
          </h3> */}

          <div className="grid grid-cols-1 gap-4 mt-22">
            <div className="bg-gray-100 rounded-lg p-4 text-center">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Open Rate
              </h4>
              <Chart
                options={pieChartOptions("#3b82f6")}
                series={openRateData.series}
                type="radialBar"
                height={96}
              />
              <p className="text-xs text-gray-500 mt-1">66.7%</p>
            </div>

            <div className="bg-gray-100 rounded-lg p-4 text-center">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Response Rate
              </h4>
              <Chart
                options={pieChartOptions("#10b981")}
                series={responseRateData.series}
                type="radialBar"
                height={96}
              />
              <p className="text-xs text-gray-500 mt-1">64.7%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
