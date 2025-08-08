import { useState } from "react";
import { FiPlus, FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

export default function DistrictDashboard() {
  const [currentMonth, setCurrentMonth] = useState(7); // August (0-indexed)
  const [currentYear, setCurrentYear] = useState(2025);
  const [selectedDate, setSelectedDate] = useState(null);
  const [tasksByDate, setTasksByDate] = useState({});
  const [newTask, setNewTask] = useState("");
  const [showModal, setShowModal] = useState(false);

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
    if (newTask.trim() !== "" && selectedDate) {
      setTasksByDate((prev) => ({
        ...prev,
        [selectedDate]: [...(prev[selectedDate] || []), newTask.trim()],
      }));
      setNewTask("");
      setShowModal(false);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const tasks = selectedDate ? tasksByDate[selectedDate] || [] : [];

  const formatDisplayDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    return `${dateObj.getDate()} ${
      monthNames[dateObj.getMonth()]
    } ${dateObj.getFullYear()}`;
  };

  return (
    <div className="border border-gray-200 rounded-xl p-4 md:p-6 bg-gray-100">
      {/* Title */}
      <h2 className="text-base md:text-lg font-semibold tracking-wide mb-4 flex flex-wrap items-center gap-2">
        <span>WHAT'S HAPPENING</span>
        <span className="text-sm font-normal text-gray-600">
          in District XXXX
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Calendar */}
        <div className="border border-dashed border-gray-300 rounded-xl p-4 bg-white">
          <div className="flex justify-between items-center mb-2">
            <button
              onClick={handlePrevMonth}
              className="p-1 hover:bg-gray-200 rounded"
            >
              <FiChevronLeft />
            </button>
            <h3 className="text-sm font-semibold">
              {monthNames[currentMonth]} {currentYear}
            </h3>
            <button
              onClick={handleNextMonth}
              className="p-1 hover:bg-gray-200 rounded"
            >
              <FiChevronRight />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-[11px] text-center select-none">
            {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
              <div key={d} className="text-gray-500 font-medium py-1">
                {d}
              </div>
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
              const dateKey = `${currentYear}-${String(
                currentMonth + 1
              ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const isSelected = selectedDate === dateKey;
              return (
                <div
                  key={day}
                  onClick={() => setSelectedDate(dateKey)}
                  className={`py-1.5 rounded-md cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-indigo-600 text-white font-semibold"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming + To-Do */}
        <div className="space-y-6">
          {/* Upcoming */}
          <div>
            <h3 className="text-sm font-semibold mb-2 border-b border-gray-300 inline-block pb-0.5">
              UPCOMING
            </h3>
            <div className="bg-white border border-gray-200 rounded-md p-4 text-sm text-gray-700 min-h-[90px] flex items-center justify-center">
              <span className="italic text-gray-500">Populate with News</span>
            </div>
          </div>

          {/* To-Do List */}
          <div>
            <div className="flex justify-between items-center mb-2 border-b border-gray-300 pb-0.5">
              <h3 className="text-sm font-semibold">
                TO-DO LIST{" "}
                {selectedDate && (
                  <span className="text-gray-500 font-normal">
                    ({formatDisplayDate(selectedDate)})
                  </span>
                )}
              </h3>
              {selectedDate && (
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                >
                  <FiPlus className="text-base" /> Add
                </button>
              )}
            </div>

            <div className="bg-white border border-gray-200 rounded-md p-3 space-y-3">
              {tasks.length > 0 ? (
                tasks.map((task, i) => (
                  <label
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <input
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>{task}</span>
                  </label>
                ))
              ) : (
                <p className="text-sm text-gray-500 italic">
                  No tasks for this date
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-5">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Task</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded hover:bg-gray-100"
              >
                <FiX className="text-lg" />
              </button>
            </div>

            {/* Input */}
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter your task..."
              className="w-full px-3 py-2 mb-4 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* Actions */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1.5 text-sm rounded border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
