import React, { useState } from 'react';

// Define event types and their associated colors (matching the specific red and blue from the image)
const EVENT_TYPES = {
  festival: { color: 'bg-[#C70F1E]', label: 'Festivals' }, // Dark Red
  concert: { color: 'bg-[#293B9F]', label: 'Concerts' },   // Dark Blue
  major_event: { color: 'bg-[#293B9F]', label: 'Other Major Events' }, // Same dark blue for consistency
};

// Event data based *exactly* on the bars visible in your new image
const calendarEvents = [
  { date: new Date(2023, 6, 15), type: 'major_event' }, // July 15 (Tuesday), first blue bar
  { date: new Date(2023, 7, 17), type: 'festival' },    // August 17 (Thursday), red bar
  { date: new Date(2023, 7, 19), type: 'concert' },     // August 19 (Saturday), blue bar
  { date: new Date(2023, 7, 20), type: 'concert' },     // August 20 (Sunday), blue bar
  { date: new Date(2023, 7, 21), type: 'festival' },    // August 21 (Monday), red bar
  { date: new Date(2023, 7, 27), type: 'concert' },     // August 27 (Sunday), blue bar
];


const CalendarGrid: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2023, 7, 1)); // Start at August 2023 for sketch match

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    // getDay() returns 0 for Sunday, 1 for Monday...
    // We want 0 for Monday, so adjust: (day + 6) % 7
    return (new Date(date.getFullYear(), date.getMonth(), 1).getDay() + 6) % 7;
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDayOfWeek = getFirstDayOfMonth(currentMonth); // 0 for Monday, 6 for Sunday

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth(); // 0-indexed

  const days = [];

  // Add days from previous month to fill the first week
  const prevMonthDaysCount = getDaysInMonth(new Date(year, month - 1));
  for (let i = 0; i < firstDayOfWeek; i++) {
    const day = prevMonthDaysCount - firstDayOfWeek + i + 1;
    days.push({
      date: new Date(year, month - 1, day),
      isCurrentMonth: false,
    });
  }

  // Add days of the current month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: new Date(year, month, i),
      isCurrentMonth: true,
    });
  }

  // Add days from next month to fill the grid (total 42 cells for 6 full weeks)
  const remainingCells = 42 - days.length;
  for (let i = 1; i <= remainingCells; i++) {
    days.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false,
    });
  }

  // Group events by date for quick lookup
  const eventsByDate: { [key: string]: typeof calendarEvents } = {};
  calendarEvents.forEach(event => {
    const dateKey = event.date.toDateString();
    if (!eventsByDate[dateKey]) {
      eventsByDate[dateKey] = [];
    }
    eventsByDate[dateKey].push(event);
  });

  const getMonthName = (date: Date) => {
    return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newMonth;
    });
  };

  const numRows = 6; 

  return (
    <div className="w-full h-full flex flex-col text-xs">
      <div className="flex justify-between items-center px-3 py-2 bg-white border-b border-gray-200">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-1 text-gray-700 font-bold text-lg" 
        >
          &lt;
        </button>
        <span className="text-lg font-bold text-gray-800">
          {getMonthName(currentMonth)}
        </span>
        <button
          onClick={() => navigateMonth('next')}
          className="p-1 text-gray-700 font-bold text-lg" 
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 text-center font-semibold text-gray-600 border-b border-gray-200">
        {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
          <div key={day} className="flex items-center justify-center bg-white py-1.5 text-[11px] uppercase tracking-wide">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 flex-grow border-r border-b border-gray-200"> 
        {days.map((day, index) => {
          const dateKey = day.date.toDateString();
          const dayEvents = eventsByDate[dateKey] || [];

          return (
            <div
              key={index}
              className={`
                bg-white               /* All cells are white */
                flex flex-col p-0.5    /* Smaller padding */
                border-l border-t border-gray-200 /* Individual cell borders */
              `}
              style={{ height: `calc(100% / ${numRows})` }} 
            >
              <span className={`font-medium text-gray-800 ml-1 mt-0.5 ${!day.isCurrentMonth ? 'opacity-50' : ''}`}>
                {day.date.getDate()}
              </span>
              <div className="flex flex-col items-center justify-start flex-grow py-0.5">
                {dayEvents.map((event, eventIdx) => (
                  <div
                    key={eventIdx}
                    className={`
                      ${EVENT_TYPES[event.type as keyof typeof EVENT_TYPES]?.color || 'bg-gray-400'}
                      w-[calc(100%-8px)] h-1.5 rounded-sm my-0.5
                    `} 
                  ></div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;