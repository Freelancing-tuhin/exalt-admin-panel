import React, { useState, useMemo } from "react";
import { 
  FaBriefcase, 
  FaBullhorn, 
  FaUsers, 
  FaChalkboardTeacher, 
  FaCalendarCheck, 
  FaTimes, 
  FaPlusCircle 
} from "react-icons/fa";

// Define a more robust type for events
interface CalendarEvent {
  date: Date;
  type: keyof typeof EVENT_TYPES;
  desc: string;
  title?: string;
}

// Professional event types
const EVENT_TYPES = {
  meeting: { 
    color: "bg-blue-600", 
    text: "text-blue-600", 
    label: "Meeting", 
    icon: <FaBriefcase size={18} />, 
    chipIcon: <FaBriefcase size={9} /> 
  },
  campaign: { 
    color: "bg-teal-600", 
    text: "text-teal-600", 
    label: "Campaign", 
    icon: <FaBullhorn size={18} />, 
    chipIcon: <FaBullhorn size={9} /> 
  },
  conference: { 
    color: "bg-indigo-600", 
    text: "text-indigo-600", 
    label: "Conference", 
    icon: <FaUsers size={18} />, 
    chipIcon: <FaUsers size={9} /> 
  },
  workshop: { 
    color: "bg-purple-600", 
    text: "text-purple-600", 
    label: "Workshop", 
    icon: <FaChalkboardTeacher size={18} />, 
    chipIcon: <FaChalkboardTeacher size={9} /> 
  },
  deadline: { 
    color: "bg-red-600", 
    text: "text-red-600", 
    label: "Deadline", 
    icon: <FaCalendarCheck size={18} />, 
    chipIcon: <FaCalendarCheck size={9} /> 
  },
};

// Light background for full boxes
const EVENT_LIGHT_BG: { [key in keyof typeof EVENT_TYPES]: string } = {
  meeting: "bg-blue-100",
  campaign: "bg-teal-100",
  conference: "bg-indigo-100",
  workshop: "bg-purple-100",
  deadline: "bg-red-100",
};

// Initial professional calendar events
const initialCalendarEvents: CalendarEvent[] = [
  { date: new Date(2023, 6, 15), type: "meeting", title: "Team Standup", desc: "Daily sync meeting with the project team." },
  { date: new Date(2023, 7, 17), type: "campaign", title: "Product Launch Campaign", desc: "Kick-off meeting for marketing campaign." },
  { date: new Date(2023, 7, 19), type: "conference", title: "Tech Conference", desc: "Annual technology conference with keynote speakers." },
  { date: new Date(2023, 7, 20), type: "workshop", title: "UI/UX Workshop", desc: "Design workshop for improving user experience." },
  { date: new Date(2023, 7, 21), type: "deadline", title: "Client Proposal Submission", desc: "Final deadline to submit project proposal." },
  { date: new Date(2023, 7, 21), type: "meeting", title: "Client Call", desc: "Discuss proposal with client." },
];

const CalendarGrid: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2023, 7, 1));
  const [allCalendarEvents, setAllCalendarEvents] = useState<CalendarEvent[]>(initialCalendarEvents);
  const [selectedDayEvents, setSelectedDayEvents] = useState<CalendarEvent[] | null>(null);
  const [selectedDayDate, setSelectedDayDate] = useState<Date | null>(null);

  const [isAddingNewEvent, setIsAddingNewEvent] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDesc, setNewEventDesc] = useState("");
  const [newEventTopicType, setNewEventTopicType] = useState<keyof typeof EVENT_TYPES>("meeting");

  const today = useMemo(() => new Date(), []);

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const { days, eventsByDate } = useMemo(() => {
    const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const getFirstDayOfMonth = (date: Date) => (new Date(date.getFullYear(), date.getMonth(), 1).getDay() + 6) % 7;

    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDayOfWeek = getFirstDayOfMonth(currentMonth);

    const allDays: { date: Date; isCurrentMonth: boolean }[] = [];
    const prevMonthDaysCount = getDaysInMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));

    for (let i = 0; i < firstDayOfWeek; i++) {
      allDays.push({ date: new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, prevMonthDaysCount - firstDayOfWeek + i + 1), isCurrentMonth: false });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      allDays.push({ date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i), isCurrentMonth: true });
    }

    const remainingCells = 42 - allDays.length;
    for (let i = 1; i <= remainingCells; i++) {
      allDays.push({ date: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, i), isCurrentMonth: false });
    }

    const eventsGroupedByDate: { [key: string]: CalendarEvent[] } = {};
    allCalendarEvents.forEach((event) => {
      const dateKey = event.date.toDateString();
      if (!eventsGroupedByDate[dateKey]) eventsGroupedByDate[dateKey] = [];
      eventsGroupedByDate[dateKey].push(event);
    });

    return { days: allDays, eventsByDate: eventsGroupedByDate };
  }, [currentMonth, allCalendarEvents]);

  const getMonthName = (date: Date) => date.toLocaleString("en-US", { month: "long", year: "numeric" });

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + (direction === "next" ? 1 : -1));
      return newMonth;
    });
  };

  const openDayModal = (day: { date: Date; isCurrentMonth: boolean }) => {
    const dayEvents = eventsByDate[day.date.toDateString()] || [];
    setSelectedDayEvents(dayEvents);
    setSelectedDayDate(day.date);
    setIsAddingNewEvent(false);
    setNewEventTitle("");
    setNewEventDesc("");
    setNewEventTopicType("meeting");
  };

  const closeDayModal = () => {
    setSelectedDayEvents(null);
    setSelectedDayDate(null);
    setIsAddingNewEvent(false);
    setNewEventTitle("");
    setNewEventDesc("");
    setNewEventTopicType("meeting");
  };

  const handleAddEvent = () => {
    if (newEventTitle.trim() === "" || newEventDesc.trim() === "" || !selectedDayDate) {
      alert("Please fill in all event details.");
      return;
    }

    const newEvent: CalendarEvent = {
      date: selectedDayDate,
      type: newEventTopicType,
      title: newEventTitle.trim(),
      desc: newEventDesc.trim(),
    };

    setAllCalendarEvents((prevEvents) => [...prevEvents, newEvent]);
    openDayModal({ date: selectedDayDate, isCurrentMonth: true });
  };

  return (
    <div className="relative w-full h-full flex flex-col text-xs bg-gray-50 rounded-lg shadow-xl overflow-hidden">
      {/* Event Details Modal */}
      {selectedDayEvents && selectedDayDate && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={closeDayModal}
              aria-label="Close event details"
            >
              <FaTimes size={20} />
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">
              {isAddingNewEvent
                ? "Add New Event"
                : `Events on ${selectedDayDate.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`}
            </h2>

            {!isAddingNewEvent ? (
              <>
                {selectedDayEvents.length > 0 ? (
                  <div className="space-y-4">
                    {selectedDayEvents.map((event, index) => (
                      <div
                        key={index}
                        className={`flex items-start gap-3 p-4 rounded-lg border border-gray-200 ${EVENT_LIGHT_BG[event.type]} hover:shadow-md transition`}
                      >
                        <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${EVENT_TYPES[event.type].color} text-white`}>
                          {EVENT_TYPES[event.type].icon}
                        </span>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-lg flex items-center gap-2">
                            {event.title}
                            <span className="text-xs font-medium text-gray-700 px-2 py-0.5 rounded-full bg-gray-200">
                              {EVENT_TYPES[event.type].label}
                            </span>
                          </h3>
                          <p className="text-sm text-gray-700 mt-1">{event.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-center py-4">No events scheduled for this day.</p>
                )}
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setIsAddingNewEvent(true)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    <FaPlusCircle size={16} /> Add New Event
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div>
                  <label htmlFor="eventTitle" className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                  <input
                    type="text"
                    id="eventTitle"
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Client Review Meeting"
                  />
                </div>
                <div>
                  <label htmlFor="eventDesc" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    id="eventDesc"
                    value={newEventDesc}
                    onChange={(e) => setNewEventDesc(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 resize-y"
                    placeholder="Brief description of the event..."
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {Object.entries(EVENT_TYPES).map(([key, value]) => (
                      <label key={key} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="eventType"
                          value={key}
                          checked={newEventTopicType === key}
                          onChange={() => setNewEventTopicType(key as keyof typeof EVENT_TYPES)}
                          className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-800 flex items-center gap-1">
                          <span className={`w-4 h-4 rounded-full flex items-center justify-center ${value.color} text-white`}>
                            {value.chipIcon}
                          </span>
                          {value.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setIsAddingNewEvent(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddEvent}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                  >
                    Save Event
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Calendar Header */}
      <div className="flex justify-between items-center px-3 py-2 bg-white border-b border-gray-200 shadow-sm">
        <button onClick={() => navigateMonth("prev")} className="p-1 text-gray-700 font-bold text-lg">&lt;</button>
        <span className="text-lg font-bold text-gray-800">{getMonthName(currentMonth)}</span>
        <button onClick={() => navigateMonth("next")} className="p-1 text-gray-700 font-bold text-lg">&gt;</button>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 text-center font-semibold text-gray-600 border-b border-gray-200 bg-gray-50">
        {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
          <div key={day} className="py-1.5 text-[11px] uppercase tracking-wide">{day}</div>
        ))}
      </div>

      {/* Calendar Grid Days */}
      <div className="grid grid-cols-7 flex-grow border-r border-b border-gray-200">
        {days.map((day, index) => {
          const dateKey = day.date.toDateString();
          const dayEvents = eventsByDate[dateKey] || [];
          const isToday = isSameDay(day.date, today);

          const dayBgColor = dayEvents.length > 0 
            ? EVENT_LIGHT_BG[dayEvents[0].type] 
            : day.isCurrentMonth 
              ? "bg-white" 
              : "bg-gray-100";

          return (
            <div
              key={index}
              className={`relative flex flex-col items-center justify-start p-1 border-l border-t border-gray-200 cursor-pointer
                ${dayBgColor} ${!day.isCurrentMonth ? "text-gray-400" : "text-gray-900"}
                ${isToday ? "border-2 border-blue-500 z-10" : ""} 
                hover:shadow-md hover:scale-105 transition-all duration-150`}
              style={{ minHeight: '90px' }}
              onClick={() => openDayModal(day)}
            >
              <span className={`flex-shrink-0 font-medium text-sm w-8 h-8 flex items-center justify-center rounded-full
                  ${isToday ? "bg-blue-500 text-white" : ""}`}>
                {day.date.getDate()}
              </span>

              {dayEvents.length > 0 && (
                <div className="flex flex-wrap justify-center gap-1 mt-1 w-full px-1">
                  {dayEvents.slice(0, 2).map((event, eventIndex) => (
                    <div
                      key={eventIndex}
                      className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full ${EVENT_TYPES[event.type].color} text-white text-[9px] font-medium`}
                      title={event.title}
                    >
                      {EVENT_TYPES[event.type].chipIcon}
                      <span>{EVENT_TYPES[event.type].label}</span>
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="px-1.5 py-0.5 rounded-full bg-gray-300 text-gray-800 text-[9px] font-medium">
                      +{dayEvents.length - 2}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
