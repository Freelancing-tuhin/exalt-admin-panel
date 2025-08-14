import React, { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

export const DonorSearch = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const files = [
    { name: "Health Care", date: "121 donors" },
    { name: "Education", date: "98 donors" },
    // { name: "Finance", date: "200 donors" },
  ];
  const categories = [
    { label: "Healthcare", count: 12 },
    { label: "Education", count: 3 },
    { label: "Finance", count: 2 },
    { label: "Transportation", count: 8 },
    { label: "Arts & Culture", count: 5 },
    { label: "Technology", count: 10 },
    { label: "Environment", count: 7 },
    { label: "Human Rights", count: 4 },
    { label: "Community Dev", count: 6 },
    { label: "Social Justice", count: 9 },
    { label: "Research", count: 11 },
    { label: "Child Welfare", count: 1 },
  ];
  return (
    <div className="max-w-6xl">
      <div className="bg-gray-100 p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Donors Search
        </h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full flex items-center gap-2 p-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white hover:bg-gray-50 transition cursor-pointer"
        >
          <img
            src="https://img.icons8.com/?size=100&id=7eX13e1GI7bn&format=gif"
            alt=""
            className="h-6 w-6"
          />
          <span className="text-gray-400">Search donors...</span>
        </button>
      </div>
      <div className="bg-gray-50 border-2 border-gray-100 rounded-2xl mt-8 flex flex-col items-center justify-center text-center py-16 px-4">
        {/* Icon */}
        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-100 mb-4">
          <img
            src="https://img.icons8.com/?size=160&id=DmOJKbilKUGv&format=png"
            alt=""
          />
        </div>

        {/* Title */}
        <h2 className="text-base font-semibold text-gray-800">
          No Donors found
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-500 mt-1">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </p>
        <p className="text-sm text-gray-500">Would you like to search again?</p>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
          {/* Blur Background */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity"
            onClick={() => setIsModalOpen(false)}
          ></div>

          {/* Modal */}
          <div className="relative bg-white rounded-[1.5rem] shadow-2xl w-full max-w-2xl mx-auto z-10 overflow-hidden">
            {/* Search Header */}
            <div className="flex items-center bg-gray-100 px-4 py-4 m-4 rounded-full">
              <FiSearch size={22} className="text-gray-400" />
              <input
                autoFocus
                type="text"
                placeholder="Search..."
                className="flex-1 ml-3 outline-none text-sm bg-transparent"
              />
              <button
                onClick={() => setIsModalOpen(false)}
                className="ml-3 text-gray-400 hover:text-gray-600 transition"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Filter Bar */}
            <span className="pl-6 text-gray-500 text-sm font-semibold">
              Interests
            </span>
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-white sticky top-0 flex flex-wrap ">
              {categories.map((cat, i) => (
                <button
                  key={i}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-700 transition whitespace-nowrap"
                >
                  {cat.label}
                  <span className="text-gray-500 font-normal">
                    ({cat.count})
                  </span>
                </button>
              ))}
              <button className="ml-auto text-blue-600 hover:underline text-xs whitespace-nowrap">
                Enable all
              </button>
            </div>

            {/* Scrollable Results */}
            <div className="max-h-[70vh] overflow-y-auto divide-y divide-gray-100">
              <div className="p-4 space-y-2">
                <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                  Top Searches
                  {/* <span className="text-gray-400 font-normal">(22)</span> */}
                </h4>
                {files.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center bg-gray-100 justify-between p-3 rounded-lg hover:bg-gray-50 transition cursor-pointer"
                  >
                    {/* Left section: icon + name */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                        {file.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">{file.date}</p>
                      </div>
                    </div>

                    {/* Right section: avatars + type */}
                    <div className="flex items-center gap-3">
                      {/* Stacked avatars */}
                      <div className="flex -space-x-2">
                        {[
                          "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFuJTIwYXZhdGFyfGVufDB8fDB8fHww",
                          "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXZhdGFyfGVufDB8fDB8fHww",
                          "https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fwww.gravatar.com%2Favatar%2F2c7d99fe281ecd3bcd65ab915bac6dd5%3Fs%3D250",
                        ].map((avatar, i) => (
                          <img
                            key={i}
                            src={avatar}
                            className="w-7 h-7 rounded-full  shadow-sm"
                            alt=""
                          />
                        ))}
                      </div>
                      <span className="text-sm  font-semibold ml-1 text-gray-400">
                        View
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Users */}

              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                    Donors
                    <span className="text-gray-400 font-normal">(22)</span>
                  </h4>
                  <button className="text-xs text-blue-600 hover:underline">
                    See all
                  </button>
                </div>
                {[
                  { name: "Maciej Gutkowski", email: "maciej@semiflat.com" },
                  { name: "Marcin Grygierczyk", email: "marcin@semiflat.com" },
                ].map((user, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-50 transition cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                      {user.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    {user.name && (
                      <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">
                        Guest
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Files */}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3 bg-gray-50 text-xs text-gray-500">
              <button className="text-blue-600 hover:underline">
                Open search page
              </button>
              <div className="flex gap-4">
                <button className="hover:text-gray-700">Move</button>
                <button className="hover:text-gray-700">Select</button>
                <button className="hover:text-gray-700">Quit</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
