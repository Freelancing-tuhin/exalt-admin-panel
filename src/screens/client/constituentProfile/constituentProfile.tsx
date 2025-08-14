/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState, useRef } from "react"; // Import useRef
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import L from "leaflet";
import { Layout } from "../../layout/Layout";
import Navbar from "../../../components/main/navbar/Navbar";
import { useHeading } from "../../../contexts/headingContext";
import {
  FaCheckCircle,
  FaCalendarAlt,
  FaPlusCircle,
  FaTag,
  FaNewspaper,
  FaFileUpload, // Added for file upload icon
  FaTimesCircle, // Added for remove file icon
} from "react-icons/fa";
// import { MdEmail } from "react-icons/md";
import CalendarGrid from "../../../components/shared/Calender/Calender";
import { HeaderBox } from "./headerBox/HeaderBox";

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
//   iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
// });

// const markerData = [
//   {
//     lat: 39.0997,
//     lng: -94.5786,
//     color: "#EF4444",
//     label: "Gujarati (Kansas City)",
//   },
//   { lat: 37.6872, lng: -97.33, color: "#22C55E", label: "Punjabi (Wichita)" },
//   { lat: 39.0473, lng: -95.6781, color: "#3B82F6", label: "Tamil (Topeka)" },
//   {
//     lat: 37.2153,
//     lng: -93.2982,
//     color: "#EAB308",
//     label: "Telugu (Springfield)",
//   },
//   {
//     lat: 38.6,
//     lng: -94.2,
//     color: "#EF4444",
//     label: "Gujarati (Overland Park)",
//   },
//   { lat: 38.0, lng: -96.0, color: "#22C55E", label: "Punjabi (Emporia)" },
//   { lat: 39.5, lng: -95.0, color: "#EF4444", label: "Gujarati (St. Joseph)" },
// ];

// const createIcon = (color: string) => {
//   return new L.DivIcon({
//     className: 'custom-teardrop-icon-wrapper',
//     html: `
//       <div style="
//         background-color: ${color};
//         width: 20px;
//         height: 25px;
//         border-radius: 50% 50% 50% 0;
//         transform: rotate(-45deg);
//         box-shadow: 0 2px 6px rgba(0,0,0,0.3);
//         border: 1px solid rgba(255,255,255,0.8);
//       "></div>
//     `,
//     iconSize: [20, 25],
//     iconAnchor: [10, 25],
//     popupAnchor: [0, -20]
//   });
// };

const ConstituentProfile: React.FC = () => {
  const { setHeading } = useHeading();

  const [todos, setTodos] = useState([
    { id: 1, text: "Finalize quarterly financial report", completed: false },
    { id: 2, text: "Schedule team meeting for Q4 planning", completed: false },
    {
      id: 3,
      text: "Review client feedback from Donor A (complete)",
      completed: true,
    },
    { id: 4, text: "Draft newsletter for August campaign", completed: false },
    { id: 5, text: "Update volunteer database records", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  // State for file upload
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref to programmatically click the file input

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([
        ...todos,
        { id: Date.now(), text: newTodo.trim(), completed: false },
      ]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Handler for file selection
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setUploadedFile(event.target.files[0]);
    }
  };

  // Handler for drag over (to prevent default behavior)
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  // Handler for drop (to get the file)
  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setUploadedFile(event.dataTransfer.files[0]);
      event.dataTransfer.clearData(); // Clear data after drop
    }
  };

  // Handler to remove the selected file
  const removeFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input
    }
  };

  const popularTopics = [
    "Community Outreach",
    "Fundraising Success",
    "Volunteer Program",
    "Youth Development",
    "Environmental Initiatives",
    "Partnerships",
  ];
  const recentArticles = [
    { id: 1, title: "Impact Report 2023: A Year of Progress", link: "#" },
    { id: 2, title: "Local Heroes: Volunteers Making a Difference", link: "#" },
    {
      id: 3,
      title: "New Fundraising Goal for Educational Programs",
      link: "#",
    },
  ];

  useEffect(() => {
    setHeading("Campaign");
  }, [setHeading]);

  return (
    <Layout>
      <Navbar />
      {/* Main container: Reduced padding (p-6 -> p-4) and vertical spacing (space-y-8 -> space-y-6) */}
      <div className="p-4 h-[90vh] overflow-y-scroll space-y-6 mx-auto bg-gray-50">
        <HeaderBox />

        {/* "What's Happening" section: Reduced padding (p-6 -> p-4) and top margin (mt-8 -> mt-6) */}
        <div className="bg-gray-100 rounded-xl p-4 shadow-sm border border-gray-200 mt-6">
          {/* Main heading: Reduced text size (text-3xl -> text-2xl) and bottom margin (mb-5 -> mb-4) */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-300">
            What's Happening in New Jersey
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {" "}
            {/* Reduced gap (gap-6 -> gap-4) */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex flex-col items-center h-[450px]">
              {" "}
              {/* Reduced height (h-[550px] -> h-[450px]) */}
              {/* Sub-heading: Reduced text size (text-lg -> text-base) and icon size (text-xl -> text-lg) */}
              <h3 className="text-base font-semibold text-gray-700 mb-3 flex items-center">
                <FaCalendarAlt className="mr-2 text-purple-600 text-lg" />{" "}
                Calendar (Upcoming)
              </h3>
              <div className="w-full h-full bg-white rounded-lg border border-gray-200 shadow-inner overflow-hidden">
                <CalendarGrid />
              </div>
            </div>
            <div className="flex flex-col gap-4 h-[450px]">
              {" "}
              {/* Reduced gap (gap-6 -> gap-4) and height (h-[550px] -> h-[450px]) */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex-1 min-h-[200px] overflow-y-auto custom-scrollbar">
                {" "}
                {/* Reduced min-height (min-h-[250px] -> min-h-[200px]) */}
                {/* Sub-heading: Reduced text size (text-lg -> text-base) and icon size (text-xl -> text-lg) */}
                <h3 className="text-base font-semibold text-gray-700 mb-3 flex items-center">
                  <FaCalendarAlt className="mr-2 text-orange-600 text-lg" />{" "}
                  Upcoming
                </h3>
                <div className="relative space-y-3 pt-1">
                  {" "}
                  {/* Reduced space-y (space-y-4 -> space-y-3) */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>
                  {[
                    {
                      type: "upcoming",
                      title: "Cultural Show XYZ",
                      date: "August 15",
                      checked: false,
                    },
                    {
                      type: "upcoming",
                      title: "Annual Gala Prep Meeting",
                      date: "August 20",
                      checked: false,
                    },
                    {
                      type: "upcoming",
                      title: "Board Meeting",
                      date: "September 5",
                      checked: false,
                    },
                    {
                      type: "upcoming",
                      title: "Community Outreach Program",
                      date: "Sept 10",
                      checked: false,
                    },
                    {
                      type: "upcoming",
                      title: "Holiday Event Planning Session",
                      date: "Sept 25",
                      checked: false,
                    },
                    {
                      type: "attended",
                      title: "Attended Donor Meetup (July)",
                      date: "July 28",
                      checked: true,
                    },
                    {
                      type: "attended",
                      title: "Email follow-up campaign completed",
                      date: "July 10",
                      checked: true,
                    },
                    {
                      type: "attended",
                      title: "Independence Day Campaign launch",
                      date: "August 5",
                      checked: true,
                    },
                    {
                      type: "attended",
                      title: "Temple Visit for Community Engagement",
                      date: "July 30",
                      checked: true,
                    },
                    {
                      type: "attended",
                      title: "Volunteer Orientation Session",
                      date: "June 10",
                      checked: true,
                    },
                    {
                      type: "attended",
                      title: "Fundraiser Review & Strategy",
                      date: "July 15",
                      checked: true,
                    },
                  ].map((event, index) => (
                    <div
                      key={index}
                      className="flex items-start relative pl-8 pr-2 py-1.5 bg-gray-50 rounded-lg shadow-xs border border-gray-200"
                    >
                      {" "}
                      {/* Reduced padding and increased left padding */}
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-500 border border-white flex items-center justify-center">
                        {" "}
                        {/* Reduced size of icon dot */}
                        {event.checked ? (
                          <FaCheckCircle className="text-white text-xs" />
                        ) : (
                          <FaCalendarAlt className="text-white text-[9px]" />
                        )}{" "}
                        {/* Slightly reduced icon size */}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-sm">
                          {event.title}
                        </p>
                        <p className="text-xs text-gray-600">{event.date}</p>
                        {event.checked && (
                          <p className="text-[10px] text-green-600 mt-0.5">
                            <FaCheckCircle className="inline mr-1" /> Attended
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex-1 min-h-[200px] flex flex-col">
                {" "}
                {/* Reduced min-height */}
                {/* Sub-heading: Reduced text size (text-lg -> text-base) and icon size (text-xl -> text-lg) */}
                <h3 className="text-base font-semibold text-gray-700 mb-3 flex items-center">
                  <FaCheckCircle className="mr-2 text-blue-600 text-lg" />{" "}
                  Orders / To Dos
                </h3>
                <div className="flex gap-2 mb-3">
                  {" "}
                  {/* Reduced mb (mb-4 -> mb-3) */}
                  <input
                    type="text"
                    placeholder="Add new task..."
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") addTodo();
                    }}
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                  <button
                    onClick={addTodo}
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-md flex items-center justify-center hover:bg-blue-700 transition-colors text-sm" // Adjusted padding (px-4 py-2 -> px-3 py-1.5)
                  >
                    <FaPlusCircle className="mr-1" /> Add
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar pr-2">
                  {todos.length > 0 ? (
                    todos.map((todo) => (
                      <div
                        key={todo.id}
                        className="flex items-center bg-gray-50 p-2.5 rounded-lg border border-gray-200 shadow-xs"
                      >
                        {" "}
                        {/* Reduced padding (p-3 -> p-2.5) */}
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => toggleTodo(todo.id)}
                          className="form-checkbox h-3.5 w-3.5 text-blue-600 rounded mr-2.5" // Reduced checkbox size
                        />
                        <span
                          className={`text-gray-800 text-sm flex-1 ${
                            todo.completed
                              ? "line-through text-gray-500 italic"
                              : ""
                          }`}
                        >
                          {todo.text}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm text-center py-4">
                      No tasks to display. Start by adding one!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links section: Reduced padding (p-6 -> p-4) and top margin (mt-8 -> mt-6) */}
        <div className="bg-gray-100 rounded-xl p-4 shadow-sm border border-gray-200 mt-6">
          {/* Main heading: Reduced text size (text-3xl -> text-2xl) and bottom margin (mb-5 -> mb-4) */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-300">
            Quick Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {" "}
            {/* Reduced gap (gap-6 -> gap-4) */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 min-h-[120px]">
              {" "}
              {/* Reduced min-height (min-h-[150px] -> min-h-[120px]) */}
              {/* Sub-heading: Reduced text size (text-lg -> text-base) and icon size (text-xl -> text-lg) */}
              <h3 className="text-base font-semibold text-gray-700 mb-3 flex items-center">
                {" "}
                {/* Reduced mb (mb-4 -> mb-3) */}
                <FaTag className="mr-2 text-green-600 text-lg" /> Popular
                Topics
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {" "}
                {/* Reduced gap (gap-2 -> gap-1.5) */}
                {popularTopics.map((topic, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full cursor-pointer hover:bg-green-200 transition-colors"
                  >
                    {" "}
                    {/* Reduced padding (px-3 py-1 -> px-2.5 py-0.5) */}
                    {topic}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 min-h-[120px]">
              {" "}
              {/* Reduced min-height */}
              {/* Sub-heading: Reduced text size (text-lg -> text-base) and icon size (text-xl -> text-lg) */}
              <h3 className="text-base font-semibold text-gray-700 mb-3 flex items-center">
                {" "}
                {/* Reduced mb */}
                <FaNewspaper className="mr-2 text-indigo-600 text-lg" /> Recent
                Articles
              </h3>
              <ul className="space-y-1.5 text-sm">
                {" "}
                {/* Reduced space-y (space-y-2 -> space-y-1.5) */}
                {recentArticles.map((article) => (
                  <li key={article.id}>
                    <a
                      href={article.link}
                      className="text-indigo-700 hover:text-indigo-900 font-medium transition-colors"
                    >
                      • {article.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* Upload Data Section */}
        <div className="bg-gray-100 rounded-xl p-6 shadow-sm border border-gray-200 mt-6 ">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-300">
            Upload Data for Insights and Cleaning
          </h2>

          <div
            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 bg-white hover:bg-blue-50 transition-colors cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={handleFileDrop}
            onClick={() => fileInputRef.current?.click()} // Click hidden input when box is clicked
          >
            {uploadedFile ? (
              <div className="flex flex-col items-center">
                <FaFileUpload className="w-12 h-12 text-green-500 mb-3" />
                <p className="text-gray-700 font-medium text-center">
                  File selected:{" "}
                  <span className="text-blue-600 font-semibold">
                    {uploadedFile.name}
                  </span>
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent clicking the file input again
                    removeFile();
                  }}
                  className="mt-2 text-red-500 hover:text-red-700 text-sm flex items-center"
                >
                  <FaTimesCircle className="mr-1" /> Remove File
                </button>
              </div>
            ) : (
              <>
                <svg
                  className="w-12 h-12 text-gray-400 mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5.002 5.002 0 0115.9 6H16a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="text-gray-700 font-medium">
                  Drag & drop your file here, or{" "}
                  <span className="text-blue-600 underline">browse</span>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Supported formats: CSV, XLSX, JSON
                </p>
              </>
            )}

            <input
              type="file"
              className="hidden"
              id="fileUpload"
              accept=".csv,.xlsx,.json"
              onChange={handleFileUpload} // Add logic here
              ref={fileInputRef} // Connect the ref to the input
            />
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the parent div's onClick
                // Add actual upload logic here, e.g., send uploadedFile to server
                if (uploadedFile) {
                  alert(`Uploading ${uploadedFile.name}... (Actual upload logic goes here!)`);
                  // For a real application, you'd send `uploadedFile` to your backend
                } else {
                  alert("Please select a file first.");
                }
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors text-sm"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ConstituentProfile;