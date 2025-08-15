import { useState, useMemo } from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { Search, ArrowUpDown } from "lucide-react";
import { SlActionRedo } from "react-icons/sl";

interface EmailCampaign {
  email: string;
  date: string;
  sentCount: number;
  status: "Responded" | "Forwarded" | "Deleted" | "Opened";
}

export const DonorTracker = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "sentCount">("date");
  const [activeTab, setActiveTab] = useState<
    "All" | "Responded" | "Forwarded" | "Deleted"
  >("All");

  const [emailCampaigns] = useState<EmailCampaign[]>([
    {
      email: "Candidate Jones Town Hall",
      date: "05/03/25",
      sentCount: 100,
      status: "Responded",
    },
    {
      email: "Vote for Smith Campaign Launch",
      date: "04/10/25",
      sentCount: 20,
      status: "Forwarded",
    },
    {
      email: "District 5 Policy Update",
      date: "04/01/25",
      sentCount: 35,
      status: "Opened",
    },
    {
      email: "Get Out the Vote Drive",
      date: "04/01/25",
      sentCount: 15,
      status: "Deleted",
    },
    {
      email: "Volunteer Recruitment",
      date: "03/03/25",
      sentCount: 101,
      status: "Responded",
    },
    {
      email: "Fundraiser for Davis",
      date: "03/01/25",
      sentCount: 95,
      status: "Forwarded",
    },
    {
      email: "Meet the Candidate Event",
      date: "02/01/25",
      sentCount: 75,
      status: "Opened",
    },
  ]);

  // Filter + sort data
  const filteredCampaigns = useMemo(() => {
    let data = emailCampaigns.filter((c) =>
      c.email.toLowerCase().includes(search.toLowerCase())
    );

    if (activeTab !== "All") {
      data = data.filter((c) => c.status === activeTab);
    }

    if (sortBy === "date") {
      data = [...data].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else {
      data = [...data].sort((a, b) => b.sentCount - a.sentCount);
    }

    return data;
  }, [emailCampaigns, search, sortBy, activeTab]);

  // Summary stats
  const totalSent = emailCampaigns.reduce((sum, c) => sum + c.sentCount, 0);
  const avgSent = Math.round(totalSent / emailCampaigns.length);

  // Chart data (built from status counts)
  const statusCounts: Record<string, number> = {
    Responded: emailCampaigns.filter((c) => c.status === "Responded").length,
    Forwarded: emailCampaigns.filter((c) => c.status === "Forwarded").length,
    Opened: emailCampaigns.filter((c) => c.status === "Opened").length,
    Deleted: emailCampaigns.filter((c) => c.status === "Deleted").length,
  };

  const chartData = {
    series: Object.values(statusCounts),
    labels: Object.keys(statusCounts),
  };

  const chartOptions: ApexOptions = {
    chart: { type: "donut", fontFamily: "Inter, sans-serif" },
    colors: ["#c084fc", "#a78bfa", "#818cf8", "#f87171"],
    labels: chartData.labels,
    legend: { position: "bottom", horizontalAlign: "center" },
    plotOptions: {
      pie: {
        donut: { size: "55%" },
      },
    },

    dataLabels: {
      enabled: true,
      formatter: (val: number) => Math.round(val) + "%",
    },
  };

  // Pagination
  const [page, setPage] = useState(1);
  const rowsPerPage = 4;
  const totalPages = Math.ceil(filteredCampaigns.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedData = filteredCampaigns.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  return (
    <div className="bg-gray-200 rounded-xl border border-gray-200 shadow-md p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-gray-200 pb-3">
        <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
          Outreach Tracker
        </h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search email..."
              className="pl-8 pr-3 py-2 w-72 text-sm rounded-lg bg-white shadow focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            onClick={() => setSortBy(sortBy === "date" ? "sentCount" : "date")}
            className="flex bg-white items-center gap-1 px-3 py-2 text-sm shadow rounded-lg hover:bg-gray-100 transition"
          >
            <ArrowUpDown size={14} />
            Sort by {sortBy === "date" ? "Date" : "Sent"}
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg ">
            <p className="text-xs text-gray-700">Total Emails Sent</p>
            <p className="text-xl font-semibold">{totalSent}</p>
          </div>
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg ">
            <p className="text-xs text-gray-700">Average per Campaign</p>
            <p className="text-xl font-semibold">{avgSent}</p>
          </div>
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg ">
            <p className="text-xs text-gray-700">Top Campaign</p>
            <p className="text-sm font-semibold">
              {
                emailCampaigns
                  .reduce((a, b) => (a.sentCount > b.sentCount ? a : b))
                  .email.split("@")[0]
              }
            </p>
          </div>
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg ">
            <p className="text-xs text-gray-700">Campaigns Tracked</p>
            <p className="text-xl font-semibold">{emailCampaigns.length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 mt-4 lg:grid-cols-2 gap-8">
          {/* Table */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Email Campaigns
            </h3>
            <div className="rounded-2xl border border-gray-200">
              {/* Tabs */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200">
                {["All", "Responded", "Forwarded", "Deleted"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab as typeof activeTab);
                      setPage(1);
                    }}
                    className={`px-6 py-1.5 text-sm font-medium rounded-lg ${
                      activeTab === tab
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Table */}
              <table className="w-full text-sm">
                <thead className="text-left text-gray-500 border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-4 py-2">Campaign</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2 text-right">Sent</th>
                    <th className="px-4 py-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedData.map((c, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {c.email}
                      </td>
                      <td className="px-4 py-3 text-gray-600">{c.date}</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">
                        {c.sentCount}
                      </td>
                      <td className="px-4 py-3 flex justify-end gap-2">
                        <button className="p-2 rounded-lg bg-gray-100">
                          <SlActionRedo />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Page {page} of {totalPages || 1}
                </p>
                <div className="flex gap-2">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="px-4 py-1.5 text-sm font-medium rounded-full disabled:opacity-50 bg-gray-100 transition"
                  >
                    Prev
                  </button>
                  <button
                    disabled={page === totalPages || totalPages === 0}
                    onClick={() => setPage((p) => p + 1)}
                    className="px-4 py-1.5 text-sm font-medium rounded-full disabled:opacity-50 bg-gray-100 transition"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Response Analysis
            </h3>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <Chart
                options={chartOptions}
                series={chartData.series}
                type="donut"
                height={325}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
