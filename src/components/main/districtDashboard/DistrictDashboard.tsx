import { useState } from "react";
import { FiPlus, FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

export default function DistrictDashboard() {
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [tasksByDate, setTasksByDate] = useState<Record<string, string[]>>({});
  const [newTask, setNewTask] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [adding, setAdding] = useState(false);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleAddTask = () => {
    if (newTask.trim() && selectedDate) {
      setAdding(true);
      setTimeout(() => {
        setTasksByDate((prev) => ({
          ...prev,
          [selectedDate]: [...(prev[selectedDate] || []), newTask.trim()],
        }));
        setNewTask("");
        setAdding(false);
        setShowModal(false);
      }, 350); // mimic async
    }
  };

  const handlePrevMonth = () => {
    setSelectedDate(null);
    setCurrentMonth((m) => (m === 0 ? 11 : m - 1));
    if (currentMonth === 0) setCurrentYear((y) => y - 1);
  };
  const handleNextMonth = () => {
    setSelectedDate(null);
    setCurrentMonth((m) => (m === 11 ? 0 : m + 1));
    if (currentMonth === 11) setCurrentYear((y) => y + 1);
  };

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const gridCells = firstDay + daysInMonth; // to pad leading blanks
  const tasks = selectedDate ? tasksByDate[selectedDate] || [] : [];

  const formatDisplayDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
  };

  // Wrapper
  return (
    <div className="relative overflow-hidden rounded-2xl  bg-[#f3f4f6] border border-gray-200  p-5 md:p-6 ">
      {/* Decorative gradient ring */}
      {/* <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/60 " /> */}

      {/* Title */}
      <div className="flex flex-wrap items-end gap-3 mb-4 ">
        <h2 className="text-lg md:text-md font-semibold tracking-tight flex items-center gap-">
          <span className=" px-2 py-1 text-gray-800">What's Happening</span>
          <span className=" text-gray-500">in District dummy</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {/* Calendar */}
        <div className="shadow relative rounded-xl bg-white/80 backdrop-blur-xs border border-gray-200  px-4 pt-4 pb-5 transition ">
          {/* Month Switcher */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={handlePrevMonth}
              aria-label="Previous month"
              className="p-2 rounded-lg hover:bg-gray-100 active:scale-95 transition"
            >
              <FiChevronLeft className="text-gray-600" />
            </button>
            <h3 className="text-sm font-semibold tracking-wide text-gray-800 select-none">
              {monthNames[currentMonth]} {currentYear}
            </h3>
            <button
              onClick={handleNextMonth}
              aria-label="Next month"
              className="p-2 rounded-lg hover:bg-gray-100 active:scale-95 transition"
            >
              <FiChevronRight className="text-gray-600" />
            </button>
          </div>

          {/* Weekday Headings */}
          <div className="grid grid-cols-7 gap-1 text-[10px] uppercase tracking-wide text-center mb-1">
            {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
              <div key={d} className="text-gray-400 font-medium py-1">
                {d}
              </div>
            ))}
          </div>
          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-sm text-center select-none">
            {Array.from({ length: gridCells }, (_, i) => {
              const dayNum = i - firstDay + 1;
              if (dayNum < 1) return <div key={`b-${i}`} />; // blank cell
              const dateKey = `${currentYear}-${String(
                currentMonth + 1
              ).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
              const isSelected = selectedDate === dateKey;
              const hasTasks = (tasksByDate[dateKey]?.length || 0) > 0;
              return (
                <button
                  key={dateKey}
                  onClick={() => setSelectedDate(dateKey)}
                  className={`relative py-1.5 rounded-md font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5042b7] transition-all ${
                    isSelected
                      ? "bg-[#5042b7] text-white shadow-sm scale-[1.04]"
                      : "text-gray-700 hover:bg-gray-100 active:scale-95"
                  }`}
                >
                  {dayNum}
                  {hasTasks && (
                    <span
                      className={`absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full border border-white shadow-sm ${
                        isSelected ? "bg-white" : "bg-[#5042b7] animate-pulse"
                      }`}
                    ></span>
                  )}
                </button>
              );
            })}
          </div>
          {/* Calendar subtle gradient hover effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition pointer-events-none rounded-xl bg-gradient-to-br from-white/0 via-white/60 to-white/0" />
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Upcoming */}
          <div className="relative rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm p-5 transition hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold tracking-wide text-gray-800 flex items-center gap-2">
                UPCOMING
              </h3>
              <span className="text-[10px] font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-500 border border-gray-200">
                Auto
              </span>
            </div>
            <div className="grid gap-3">
              {["Populate with News"].map((itm, i) => (
                <div
                  key={i}
                  className="h-20 flex items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 text-xs text-gray-500 italic"
                >
                  {itm}
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-transparent group-hover:ring-indigo-100" />
          </div>

          {/* To-Do List */}
          <div className="relative rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm p-5 transition hover:shadow-md">
            <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-200">
              <h3 className="text-sm font-semibold tracking-wide text-gray-800">
                TO-DO LIST{" "}
                {selectedDate && (
                  <span className="text-gray-500 font-normal ml-1">
                    ({formatDisplayDate(selectedDate)})
                  </span>
                )}
              </h3>
              {selectedDate && (
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium 
                  text-white bg-[#5042b7] rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 active:scale-95 transition"
                >
                  <FiPlus className="text-sm" /> Add
                </button>
              )}
            </div>

            <div className="space-y-2 min-h-[90px]">
              {tasks.length > 0 ? (
                tasks.map((task, i) => (
                  <label
                    key={i}
                    className="group flex items-start gap-3 rounded-md px-2
                     py-2 bg-gray-50 hover:bg-white  hover:border-indigo-100 text-[13px] text-gray-700 border border-gray-200 transition"
                  >
                    <input
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 transition"
                    />
                    <span className="flex-1 leading-relaxed relative">
                      {task}
                      <span className="absolute inset-x-0 bottom-0 h-px scale-x-0 group-hover:scale-x-100 origin-left bg-indigo-200 transition-transform" />
                    </span>
                  </label>
                ))
              ) : (
                <p className="text-sm text-gray-400 italic flex items-center gap-2 pl-1">
                  No tasks for this date
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50 animate-fade-in">
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 border border-gray-200 animate-scale-in">
            {/* Close */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 active:scale-95 transition"
              aria-label="Close modal"
            >
              <FiX className="text-gray-600" />
            </button>
            <h3 className="text-base font-semibold mb-4 pr-8">Add New Task</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Enter your task..."
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-3 py-2 text-xs font-medium rounded-md border border-gray-300 hover:bg-gray-100 active:scale-95 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddTask}
                  disabled={!newTask.trim() || adding}
                  className="relative px-4 py-2 text-xs font-semibold rounded-md bg-indigo-600 text-white shadow hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition"
                >
                  {adding ? (
                    <span className="flex items-center gap-2">
                      <span className="h-3 w-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />{" "}
                      Saving...
                    </span>
                  ) : (
                    "Add Task"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* Tailwind addition: animations (can place in a global css if preferred) */
// You can move these into a CSS file if purging removes them.
// .animate-fade-in { @apply animate-[fadeIn_.25s_ease-out]; }
// .animate-scale-in { @apply animate-[scaleIn_.25s_cubic-bezier(.4,0,.2,1)]; }
// @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
// @keyframes scaleIn { 0% { opacity:0; transform:scale(.95) } 100% { opacity:1; transform:scale(1) } }
