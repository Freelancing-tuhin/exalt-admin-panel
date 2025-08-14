/* eslint-disable @typescript-eslint/no-explicit-any */
export const GradientHeader = ({ title }: any) => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="w-full">
      <div className="relative bg-gradient-to-br from-[#1a365d] via-[#2d3748] to-[#742a2a] rounded-xl overflow-hidden shadow-xl border border-slate-300/20">
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

        <div className="relative  h-[300px] p-10 flex flex-col justify-center text-white">
          {/* Header Badge */}
          <div
            className="inline-flex items-center gap-3 bg-slate-600/30 backdrop-blur-md
           rounded-full px-4 py-2 border border-slate-400/20 w-fit mb-6"
          >
            <div className="w-2 h-2 bg-purple-400 rounded-full shadow-sm shadow-purple-400/50"></div>
            <span className="text-sm font-medium text-slate-200 tracking-wider uppercase">
              Analytics Dashboard
            </span>
          </div>

          {/* Main heading */}
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight text-white leading-none">
              {/* Previous */}
              <span className="block font-normal bg-gradient-to-r from-purple-300 via-slate-100 to-purple-200 bg-clip-text text-transparent">
                {title}
              </span>
            </h1>
            <div className="w-16 h-0.5 bg-gradient-to-r from-purple-400 to-slate-400 rounded-full"></div>
          </div>

          {/* Date and Status Information */}
          <div className="mt-8 flex flex-wrap gap-4">
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <span className="text-base font-medium">Campaign Analytics</span>
            </div>

            <div className="bg-slate-700/40 backdrop-blur-sm rounded-lg px-6 py-2 flex items-center gap-2 border border-slate-500/30">
              <div className="text-xs text-slate-400 uppercase tracking-widest font-medium">
                Updated
              </div>
              <div className="text-xs font-semibold text-emerald-300">
                {currentDate}
              </div>
            </div>
          </div>
        </div>

        {/* Professional bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-400/50 to-transparent"></div>
      </div>
    </div>
  );
};
