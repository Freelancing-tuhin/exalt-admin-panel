import { Layout } from "../layout/Layout";
import Navbar from "../../components/main/navbar/Navbar";
import { useEffect } from "react";
import { useHeading } from "../../contexts/headingContext";
import DistrictDashboard from "../../components/main/districtDashboard/DistrictDashboard";

export const ClientHome = () => {
  const { setHeading } = useHeading();

  useEffect(() => {
    setHeading("Exalt");
  }, [setHeading]);

  return (
    <Layout>
      <Navbar />
      {/* Page Body */}
      <div className="p-4 md:p-6 space-y-8 bg-white h-[90vh] overflow-y-auto">
        {/* Welcome Bar */}
        <div
          className="w-full bg-[#f3f4f6] border border-gray-200 rounded-lg 
        px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
        >
          <div className="text-sm tracking-wide">
            <span className="font-semibold">WELCOME&nbsp;TEAM&nbsp;EXALT</span>
          </div>
          <div className="text-[11px] sm:text-xs text-gray-500 font-medium flex flex-wrap gap-4">
            <span>
              {new Date().toLocaleDateString(undefined, {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span>•</span>
            <span>
              {new Date().toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              CST
            </span>
          </div>
        </div>

        {/* What's Happening Section */}
        <DistrictDashboard />

        {/* Quick Links */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 bg-[#f3f4f6]">
            <h3 className="text-base font-semibold tracking-wide">
              Quick Links
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {[
              { label: "Issues / Articles", to: "/client/issues" },
              { label: "Events", to: "/client/events" },
              { label: "Holidays", to: "/client/holidays" },
              { label: "Final Briefs", to: "/client/briefs" },
              { label: "Data", to: "/client/data" },
            ].map((row, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 py-4 bg-white hover:bg-[#f3f4f6] transition-colors"
              >
                <span className="text-sm font-medium text-gray-700">
                  {row.label}...
                </span>
                <button
                  onClick={() => (window.location.href = row.to)}
                  className="text-xs tracking-wide font-semibold text-indigo-700 hover:underline"
                >
                  PREVIEW&nbsp;HERE
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
