/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { HiCalendarDateRange } from "react-icons/hi2"; // for campaign icon
import { TbSpeakerphone } from "react-icons/tb";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

interface CampaignData {
  id: number;
  title: string;
  date: string;
  state: string;
  openRate: number;
  responseRate: number;
}

export const LocationTrack = () => {
  // --- Campaigns Data (20 items demo) ---
  const [campaigns] = useState<CampaignData[]>(
    Array.from({ length: 20 }, (_, i) => {
      const states = ["California", "New Jersey", "Illinois"];
      const titles = [
        "Healthcare Awareness Drive",
        "Education Reform Survey",
        "Clean Energy Outreach",
        "Tax Policy Feedback",
        "Infrastructure Planning Poll",
      ];
      const randomState = states[i % states.length];
      const randomTitle = titles[i % titles.length];
      const randomDate = `2025-${String((i % 12) + 1).padStart(
        2,
        "0"
      )}-${String((i % 28) + 1).padStart(2, "0")}`;

      return {
        id: i + 1,
        title: `${randomTitle} #${i + 1}`,
        date: randomDate,
        state: randomState,
        openRate: Math.round(Math.random() * 40 + 60), // 60–100%
        responseRate: Math.round(Math.random() * 30 + 50), // 50–80%
      };
    })
  );

  const [selectedCampaign, setSelectedCampaign] = useState<CampaignData>(
    campaigns[0]
  );
  const [scope, setScope] = useState<"nation" | "state" | "local">("nation");
  const [selectedState, setSelectedState] = useState<string | null>(
    campaigns[0].state
  );

  const [monthFilter, setMonthFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 3;

  const targetStates = ["California", "New Jersey", "Illinois"];

  const stateMaps: Record<string, string> = {
    California: `https://www.google.com/maps/embed/v1/place?key=AIzaSyD1jZREq84uPwaeeEFf_Kgq2RAgDMIiIf8&q=California`,
    "New Jersey": `https://www.google.com/maps/embed/v1/place?key=AIzaSyD1jZREq84uPwaeeEFf_Kgq2RAgDMIiIf8&q=New+Jersey`,
    Illinois: `https://www.google.com/maps/embed/v1/place?key=AIzaSyD1jZREq84uPwaeeEFf_Kgq2RAgDMIiIf8&q=Illinois`,
  };

  // --- Filtered Campaigns ---
  // --- Filtered Campaigns ---
  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((c) => {
      // If month filter is applied
      const matchesMonth =
        monthFilter === "all" || c.date.startsWith(`2025-${monthFilter}`);

      // If local scope, filter campaigns of only that state
      const matchesState =
        scope === "local" && selectedState ? c.state === selectedState : true;

      return matchesMonth && matchesState;
    });
  }, [campaigns, monthFilter, scope, selectedState]);

  // --- Paginated Campaigns ---
  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);
  const paginatedCampaigns = filteredCampaigns.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const radialChartOptions = (color: string): ApexOptions => ({
    chart: { type: "radialBar", sparkline: { enabled: true } },
    colors: [color],
    plotOptions: {
      radialBar: {
        hollow: { size: "50%" },
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 border-b border-gray-200 ">
        <div className="text-2xl font-medium  text-gray-800 tracking-tight">
          Campaign Location Tracking
        </div>
        {/* Scope toggle */}
      </div>

      {/* Layout: Map | Campaigns | Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_2fr_1fr] gap-6 bg-white p-4 rounded-xl">
        {/* Left - Map */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Campaign Reach Map
          </h3>
          <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm h-[350px] flex items-center justify-center">
            {scope === "nation" && (
              <ComposableMap projection="geoAlbersUsa" width={800} height={400}>
                <Geographies geography={geoUrl}>
                  {({ geographies }: any) =>
                    geographies.map((geo: any) => {
                      const stateName = geo.properties.name;
                      const isTarget = targetStates.includes(stateName);
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          data-tooltip-id="map-tooltip"
                          data-tooltip-content={stateName}
                          onClick={() => {
                            if (isTarget) {
                              setSelectedState(stateName); // update map
                              setScope("local"); // switch to local scope
                              setCurrentPage(1);
                              const camp = campaigns.find(
                                (c) => c.state === stateName
                              );
                              if (camp) setSelectedCampaign(camp); // optionally select first campaign in that state
                            }
                          }}
                          style={{
                            default: {
                              fill: isTarget ? "#3b82f6" : "#8d8e90ff",
                              opacity: isTarget ? 1 : 0.2,
                              outline: "none",
                              stroke: "#ffffff",
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
            <Tooltip id="map-tooltip" />
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
          <div className="flex gap-2 mx-auto justify-center mt-4">
            {["nation", "state", "local"].map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  setScope(mode as any);
                  if (mode === "nation") setSelectedState(null);
                }}
                className={`px-6 py-2 rounded-lg text-sm font-medium ${
                  scope === mode
                    ? "bg-gray-600 text-white"
                    : "bg-gray-100  text-gray-700"
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Middle - Campaigns */}
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 flex flex-col">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Campaigns
          </h3>

          {/* Month Filter */}
          <div className="mb-3">
            <select
              value={monthFilter}
              onChange={(e) => {
                setMonthFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-white 
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
               hover:border-blue-400 transition-colors"
            >
              <option value="all" className="text-gray-700">
                All Months
              </option>
              {Array.from({ length: 12 }, (_, i) => {
                const month = String(i + 1).padStart(2, "0");
                return (
                  <option key={month} value={month}>
                    {new Date(2025, i).toLocaleString("default", {
                      month: "long",
                    })}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Campaign List */}
          <div className="flex-1 space-y-3">
            {paginatedCampaigns.map((c) => {
              const isSelected = selectedCampaign?.id === c.id;

              return (
                <div
                  key={c.id}
                  className={`p-4 rounded-xl border cursor-pointer transition  mb-2
        ${
          isSelected
            ? "bg-blue-50 border-gray-300"
            : "bg-white border-gray-200 hover:bg-gray-50"
        }
      `}
                >
                  {/* Top Row */}
                  <div className="flex items-center justify-between">
                    {/* Left Icon + Info */}
                    <div
                      className="flex items-center gap-3 flex-1"
                      onClick={() => {
                        setSelectedCampaign(c);
                        // setSelectedState(c.state);
                        // setScope("local");
                      }}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <TbSpeakerphone size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-800">
                          {c.title}
                        </h4>
                        <div className="text-xs text-gray-600 w-[100%]">
                          Lorem ipsum dolor sit amet consectetur ...
                        </div>
                        <p className="text-xs text-gray-600">
                          State: <span className="font-medium">{c.state}</span>
                        </p>
                      </div>
                    </div>

                    {/* Right: Date + Plus Icon */}
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500">{c.date}</span>
                      <button className="p-1 rounded-full hover:bg-gray-100">
                        <HiCalendarDateRange
                          size={18}
                          className="text-gray-600"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center gap-2 mt-4">
            <div>
              <span className="text-sm text-gray-700 font-medium">
                Page {currentPage} of {totalPages}
              </span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg 
                 disabled:opacity-50 text-gray-700 font-medium hover:bg-gray-300 
                 transition-colors"
              >
                <HiChevronLeft className="w-5 h-5" />
                Prev
              </button>

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg 
                 disabled:opacity-50 text-gray-700 font-medium hover:bg-gray-300 
                 transition-colors"
              >
                Next
                <HiChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right - Performance */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Performance
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 text-center ">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Open Rate
              </h4>
              <Chart
                options={radialChartOptions("#818cf8")}
                series={[selectedCampaign.openRate]}
                type="radialBar"
                height={160}
              />
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 text-center ">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Response Rate
              </h4>
              <Chart
                options={radialChartOptions("#a78bfa")}
                series={[selectedCampaign.responseRate]}
                type="radialBar"
                height={160}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
