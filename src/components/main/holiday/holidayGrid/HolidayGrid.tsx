export const HolidayGrid = () => {
  const ongoingEvents = [
    {
      id: 1,
      title: "Diwali ",
      time: "Started 6:00 pm",
      attendees: "1,200 attendees",
      image:
        "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1vTqIo.img?w=768&h=403&m=6",
    },
    {
      id: 2,
      title: "Navratri Garba ",
      time: "Started 8:30 pm",
      attendees: "900 attendees",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz5UJujhmbgdLKmPQQI_foPVKf6JQF3VKGqg&s",
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Holi ",
      time: "Mar 10, Mon | 11:00 am",
      booked: "92% booked",
      image:
        "https://media.gettyimages.com/id/2048291393/vector/blue-poster-of-holi-festival-with-text-happy-holi-festival-and-many-hands-sprinkling-various.jpg?s=612x612&w=gi&k=20&c=ZdhKcGl4tWDeLfSsVXpwUwPMX27NEsRPm67YNW5qLqk=",
    },
    {
      id: 2,
      title: "Ganesh Chaturthi ",
      time: "Sep 18, Thu | 7:00 pm",
      booked: "85% booked",
      image:
        "https://idolkart.com/cdn/shop/articles/Ganesh_Chaturthi_2023.jpg?v=1695019135",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {/* Ongoing Events */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 ">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-xl">Ongoing Holidays</h3>
          <a href="#" className="text-sm text-teal-600 font-medium">
            View all
          </a>
        </div>
        <div className="space-y-3">
          {ongoingEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-start gap-3 bg-white border-2 border-gray-100 rounded-2xl p-2"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-44 h-24 rounded-lg object-cover"
              />
              <div className="flex-1 pt-2">
                <h4 className="text-lg font-medium">{event.title}</h4>
                <p className="text-sm text-gray-500">{event.time}</p>
              </div>
              <span className="text-md mt-5 py-2 font-semibold text-gray-700 bg-gray-100 border-gray-200 border rounded-xl px-6 ">
                View
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 ">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-xl">Upcoming Holidays</h3>
          <a href="#" className="text-sm text-teal-600 font-medium">
            View all
          </a>
        </div>
        <div className="space-y-3">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-start gap-3 bg-white border-2 border-gray-100 rounded-2xl p-2"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-44 h-24 rounded-lg object-cover"
              />
              <div className="flex-1 pt-2">
                <h4 className="text-lg font-medium">{event.title}</h4>
                <p className="text-sm text-gray-500">{event.time}</p>
              </div>
              <span className="text-md mt-5 py-2 font-semibold text-gray-700 bg-gray-100 border-gray-200 border rounded-xl px-6 ">
                View
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
