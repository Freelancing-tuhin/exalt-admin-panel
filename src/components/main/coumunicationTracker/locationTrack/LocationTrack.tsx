/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// Campaign data model
interface CampaignData {
  id: number;
  title: string;
  date: string;
  state: string;
  openRate: number;
  responseRate: number;
}

export const LocationTrack = () => {
  const [campaigns] = useState<CampaignData[]>([
    {
      id: 1,
      title: "Healthcare Awareness Drive",
      date: "2025-08-01",
      state: "California",
      openRate: 72.5,
      responseRate: 68.2,
    },
    {
      id: 2,
      title: "Education Reform Survey",
      date: "2025-08-08",
      state: "New Jersey",
      openRate: 65.4,
      responseRate: 61.1,
    },
    {
      id: 3,
      title: "Clean Energy Outreach",
      date: "2025-08-12",
      state: "Illinois",
      openRate: 78.9,
      responseRate: 70.3,
    },
  ]);

  const [selectedCampaign, setSelectedCampaign] = useState<CampaignData>(
    campaigns[0]
  );

  const [scope, setScope] = useState<"nation" | "state" | "local">("nation");
  const [selectedState, setSelectedState] = useState<string | null>(
    campaigns[0].state
  );

  // States we care about in Nation view
  const targetStates = ["California", "New Jersey", "Illinois"];

  // Google map URLs for each state (replace with real ones)
  const stateMaps: Record<string, string> = {
    California: `https://www.google.com/maps/embed/v1/place?key=AIzaSyD1jZREq84uPwaeeEFf_Kgq2RAgDMIiIf8&q=California`,
    "New Jersey": `https://www.google.com/maps/embed/v1/place?key=AIzaSyD1jZREq84uPwaeeEFf_Kgq2RAgDMIiIf8&q=New+Jersey`,
    Illinois: `https://www.google.com/maps/embed/v1/place?key=AIzaSyD1jZREq84uPwaeeEFf_Kgq2RAgDMIiIf8&q=Illinois`,
  };

  // Radial chart options
  const radialChartOptions = (color: string): ApexOptions => ({
    chart: { type: "radialBar", sparkline: { enabled: true } },
    colors: [color],
    plotOptions: {
      radialBar: {
        hollow: { size: "55%" },
        dataLabels: {
          name: { show: false },
          value: {
            fontSize: "16px",
            fontWeight: "700",
            formatter: (val: number) => val + "%",
          },
        },
      },
    },
    stroke: { lineCap: "round" },
  });

  return (
    <div className="bg-gray-200 rounded-lg border border-gray-200 p-6 shadow-sm mt-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4 mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Campaign Location Tracking
        </h2>
        {/* Scope toggle */}
        <div className="flex gap-2">
          {["nation", "state", "local"].map((mode) => (
            <button
              key={mode}
              onClick={() => {
                setScope(mode as any);
                if (mode === "nation") setSelectedState(null);
              }}
              className={`px-3 py-1 rounded-lg text-sm font-medium ${
                scope === mode
                  ? "bg-blue-600 text-white"
                  : "bg-white border text-gray-700"
              }`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Layout: Map | Campaigns | Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_2fr_1fr] gap-6 bg-white p-4 rounded-xl">
        {/* Left - Map Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Campaign Reach Map
          </h3>
          <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm h-[350px] flex items-center justify-center">
            {scope === "nation" && (
              <ComposableMap projection="geoAlbersUsa" width={800} height={400}>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const stateName = geo.properties.name;
                      const isTarget = targetStates.includes(stateName);
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onClick={() => {
                            if (isTarget) {
                              setSelectedState(stateName);
                              setScope("local");
                              const camp = campaigns.find(
                                (c) => c.state === stateName
                              );
                              if (camp) setSelectedCampaign(camp);
                            }
                          }}
                          style={{
                            default: {
                              fill: isTarget ? "#3b82f6" : "#8d8e90ff",
                              opacity: isTarget ? 1 : 0.2,
                              outline: "none",
                            },
                            hover: {
                              fill: isTarget ? "#2563EB" : "#939394ff",
                              outline: "none",
                            },
                            pressed: {
                              fill: "#1D4ED8",
                              outline: "none",
                            },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
              </ComposableMap>
            )}

            {scope === "state" && (
              <p className="text-gray-500 text-sm">
                (State-level zoom could be implemented here)
              </p>
            )}

            {scope === "local" && selectedState && (
              <iframe
                title="Google Map"
                src={stateMaps[selectedState]}
                className="w-full h-full"
                allowFullScreen
                loading="lazy"
              ></iframe>
            )}
          </div>
          {selectedState && (
            <p className="text-sm text-gray-500 mt-2 text-center">
              Showing activity in{" "}
              <span className="font-semibold">{selectedState}</span>
            </p>
          )}
        </div>

        {/* Middle - Campaign List */}
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Campaigns
          </h3>
          <div className="space-y-3">
            {campaigns.map((c) => (
              <div
                key={c.id}
                onClick={() => {
                  setSelectedCampaign(c);
                  setSelectedState(c.state);
                  setScope("local");
                }}
                className={`p-4 rounded-lg border cursor-pointer transition ${
                  selectedCampaign.id === c.id
                    ? "bg-blue-50 border-blue-500"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
              >
                <h4 className="text-sm font-semibold text-gray-800">
                  {c.title}
                </h4>
                <p className="text-xs text-gray-500">{c.date}</p>
                <p className="text-xs text-gray-600 mt-1">
                  State: <span className="font-medium">{c.state}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Performance Charts */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Performance
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Open Rate
              </h4>
              <Chart
                options={radialChartOptions("#3b82f6")}
                series={[selectedCampaign.openRate]}
                type="radialBar"
                height={140}
              />
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Response Rate
              </h4>
              <Chart
                options={radialChartOptions("#10b981")}
                series={[selectedCampaign.responseRate]}
                type="radialBar"
                height={140}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
