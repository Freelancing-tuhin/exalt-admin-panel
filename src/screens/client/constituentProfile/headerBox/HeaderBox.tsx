// import React from "react";
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
      <div className="relative bg-gradient-to-br from-[#1a365d] via-[#2d3748] to-[#742a2a] rounded-xl overflow-hidden shadow-xl border border-slate-300/20">
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          //   style={{
          //     backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 0h20v20H0V0zm10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm10 0a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM10 37a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm10 0a7 7 0 1 0 0-14 7 7 0 0 0 0 14z'/%3E%3C/g%3E%3C/svg%3E")`,
          //   }}
        ></div>

        {/* Faded EXALT Logo Background */}
        <div className="absolute left-60 top-45 flex items-center justify-center opacity-5 scale-[3.7] pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="151.468"
            height="38.728"
            fill="none"
            overflow="visible"
          >
            <defs>
              <linearGradient
                id="exaltBackgroundGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>
            </defs>
            <g>
              <path
                d="M 0 38.728 L 0 0 L 151.468 0 L 151.468 38.728 Z"
                fill="transparent"
              ></path>
              <path
                d="M 123.206 7.636 L 123.206 0 L 151.358 0 L 151.358 7.636 L 141.392 7.636 L 141.392 38.728 L 133.42 38.728 L 133.42 7.636 Z"
                fill="url(#exaltBackgroundGradient)"
              ></path>
              <path
                d="M 109.006 0 L 109.006 30.82 L 122.958 30.82 L 122.958 38.728 L 101.034 38.728 L 101.034 0 Z"
                fill="url(#exaltBackgroundGradient)"
              ></path>
              <path
                d="M 72.758 38.728 L 64.648 38.728 L 77.302 0 L 84.886 0 L 97.546 38.728 L 89.292 38.728 L 86.756 29.048 L 81.022 29.048 L 75.286 29.048 Z M 80.086 11.964 L 76.794 23.266 L 85.296 23.266 L 82.006 11.964 C 81.622 10.65 81.19 9.128 81.046 8.182 C 80.902 9.074 80.518 10.546 80.086 11.964 Z"
                fill="url(#exaltBackgroundGradient)"
              ></path>
              <path
                d="M 54.112 24.648 C 52.512 21.442 52.54 17.53 54.188 14.288 C 56.134 10.468 58.48 5.764 60.204 2.004 C 60.232 1.942 60.26 1.884 60.288 1.824 C 60.416 1.562 60.74 0.882 61.16 0 L 52.468 0 C 50.936 3.242 49.066 6.982 47.442 10.174 C 44.528 15.904 44.438 22.9 47.336 28.704 L 52.342 38.728 L 61.14 38.728 L 60.2 36.84 Z"
                fill="url(#exaltBackgroundGradient)"
              ></path>
              <path
                d="M 33.092 24.648 C 34.694 21.442 34.664 17.53 33.016 14.288 C 31.072 10.468 28.726 5.764 27 2.004 C 26.972 1.942 26.944 1.884 26.916 1.824 C 26.79 1.562 26.464 0.882 26.044 0 L 34.736 0 C 36.27 3.242 38.138 6.982 39.762 10.174 C 42.676 15.904 42.766 22.9 39.87 28.704 L 34.864 38.728 L 26.066 38.728 L 27.004 36.84 Z"
                fill="url(#exaltBackgroundGradient)"
              ></path>
              <path
                d="M 22.556 38.728 L 0 38.728 L 0 0 L 22.516 0 L 22.516 7.608 L 7.734 7.608 L 7.734 15.228 L 20.836 15.228 L 20.836 22.688 L 7.734 22.688 L 7.734 30.728 L 22.516 30.728 Z"
                fill="url(#exaltBackgroundGradient)"
              ></path>
            </g>
          </svg>
        </div>

        <div className="relative z-10 h-[480px] p-10 flex flex-col lg:flex-row items-center lg:items-stretch gap-10">
          {/* Left Content Section */}
          <div className="flex-1 flex flex-col justify-center text-white space-y-8">
            {/* Header Badge */}
            {/* <div className="inline-flex items-center gap-3 bg-slate-600/30 backdrop-blur-md rounded-full px-4 py-2 border border-slate-400/20 w-fit">
              <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-sm shadow-emerald-400/50"></div>
              <span className="text-sm font-medium text-slate-200 tracking-wider uppercase letter-spacing-wide">
                Executive Dashboard
              </span>
            </div> */}

            {/* Main heading with enhanced typography */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-base tracking-tight text-white leading-none">
                Hello
                <span className="block font-semibold bg-gradient-to-r from-blue-300 via-slate-100 to-blue-200 bg-clip-text text-transparent">
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
