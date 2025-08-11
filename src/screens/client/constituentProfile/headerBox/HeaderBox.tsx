import React from "react";
import ConstituentMap from "../../../../components/shared/map/ConstituentMap";

export const HeaderBox = () => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });

  return (
    <div className="w-full">
      <div className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 rounded-xl overflow-hidden shadow-xl border border-slate-300/20">
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 0h20v20H0V0zm10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm10 0a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM10 37a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm10 0a7 7 0 1 0 0-14 7 7 0 0 0 0 14z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        <div className="relative z-10 h-[480px] p-10 flex flex-col lg:flex-row items-center lg:items-stretch gap-10">
          {/* Left Content Section */}
          <div className="flex-1 flex flex-col justify-center text-white space-y-8">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-3 bg-slate-600/30 backdrop-blur-md rounded-full px-4 py-2 border border-slate-400/20 w-fit">
              <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-sm shadow-emerald-400/50"></div>
              <span className="text-sm font-medium text-slate-200 tracking-wider uppercase letter-spacing-wide">
                Executive Dashboard
              </span>
            </div>

            {/* Main heading with enhanced typography */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight text-white leading-none">
                Hello
                <span className="block font-bold bg-gradient-to-r from-blue-300 via-slate-100 to-blue-200 bg-clip-text text-transparent">
                  Team Smith
                </span>
              </h1>
              <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-slate-400 rounded-full"></div>
            </div>

            {/* Date and Time Information */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-300">
                <svg
                  className="w-5 h-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-base font-medium">{currentDate}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <svg
                  className="w-5 h-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-base font-medium">{currentTime}</span>
              </div>
            </div>

            {/* Professional Info Cards */}
            <div className="flex flex-wrap gap-4 pt-2">
              {/* <div className="bg-slate-700/40 backdrop-blur-sm rounded-lg px-5 py-3 border border-slate-500/30 hover:bg-slate-600/40 transition-all duration-200">
                <div className="text-xs text-slate-400 uppercase tracking-widest font-medium mb-1">
                  Scope
                </div>
                <div className="text-sm font-semibold text-white">
                  District Overview
                </div>
              </div> */}
              <div
                className="bg-slate-700/40 backdrop-blur-sm rounded-lg px-8 py-2 flex items-center gap-2
               border border-slate-500/30 hover:bg-slate-600/40 transition-all duration-200"
              >
                <div className="text-xs text-slate-400 uppercase tracking-widest font-medium ">
                  Status
                </div>
                <div className="text-xs font-semibold text-emerald-300">
                  Live Data
                </div>
              </div>
            </div>
          </div>

          {/* Right Map Section */}
          {/* <div className="flex-1 lg:flex-none lg:w-1/2 h-full"> */}
          {/* <div className="h-full rounded-lg overflow-hidden border border-slate-400/30 shadow-xl bg-slate-800/20 backdrop-blur-sm"> */}
          <ConstituentMap embedded heightClass="h-full" />
          {/* </div> */}
          {/* </div> */}
        </div>

        {/* Professional bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-400/50 to-transparent"></div>
      </div>
    </div>
  );
};
