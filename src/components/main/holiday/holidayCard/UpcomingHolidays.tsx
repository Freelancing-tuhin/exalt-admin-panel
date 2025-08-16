import { FiArrowUpRight } from "react-icons/fi";

export const UpcomingHolidays = () => {
  const holidays = [
    {
      id: 1,
      title: "California Art Festival: 2023 Dana Point 29-30",
      date: "29",
      month: "Mar",
      location: "California",
      time: "10:00 PM",
      image:
        "https://rudralife.com/blog/wp-content/uploads/2025/06/3.-Janmashtami-2025-during-shravan-1600x630.jpg",
    },
    {
      id: 2,
      title: "Diwali Celebration: Festival of Lights",
      location: "Delhi",
      time: "7:30 PM",
      image:
        "https://www.timeanddate.com/scripts/calendarog.php?image=new-york1&calendar=CALENDAR&year=2025&country=United%20States&abstract=Holidays%20and%20Observances",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pr-2">
      {holidays.map((holiday, index) => (
        <div
          key={holiday.id}
          className="relative rounded-xl overflow-hidden shadow-lg group"
        >
          {/* Background Image */}
          <img
            src={holiday.image}
            alt={holiday.title}
            className="h-64 w-full object-cover"
          />

          {/* === Card 1 → date + info === */}
          {index === 0 && (
            <>
              {/* Date Badge */}
              <div className="absolute top-3 right-3 bg-white rounded-xl shadow px-3 py-1 text-center">
                <p className="text-xl font-bold text-gray-800">
                  {holiday.date}
                </p>
                <p className="text-xs text-gray-500">{holiday.month}</p>
              </div>

              {/* Floating Info Section */}
              <div className="absolute bottom-3 left-3 right-3 bg-white/60 backdrop-blur-md rounded-xl shadow-md p-4">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                  {holiday.title}
                </h3>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-md text-gray-700 drop-shadow">
                    {holiday.location} • {holiday.time}
                  </p>
                  <button className="text-md font-medium text-purple-600 bg-purple-100/70 backdrop-blur-sm px-3 py-1 rounded-lg hover:bg-purple-200/70">
                    View
                  </button>
                </div>
              </div>
            </>
          )}

          {/* === Card 2 → interactive arrow === */}
          {index === 1 && (
            <div className="absolute top-3 right-3 bg-white rounded-xl shadow px-3 py-3 text-center">
              <FiArrowUpRight className="text-black text-2xl my-0.5 drop-shadow-lg" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
