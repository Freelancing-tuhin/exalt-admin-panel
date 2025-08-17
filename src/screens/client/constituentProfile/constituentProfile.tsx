import React, { useEffect, useState, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { Layout } from "../../layout/Layout";
import Navbar from "../../../components/main/navbar/Navbar";
import { useHeading } from "../../../contexts/headingContext";
import {
  FaCheckCircle,
  FaCalendarAlt,
  FaFileUpload,
  FaTimesCircle,
  FaNewspaper,
} from "react-icons/fa";
import CalendarGrid from "../../../components/shared/Calender/Calender";
import { HeaderBox } from "./headerBox/HeaderBox";
import { EventsList } from "../../../components/shared/listView/ListView";
import articlesData from "../../../database/articles.json";
import TodoModal from "../../../components/shared/modal/TodoModal";
import { ViralCard } from "../../../components/shared/viralCards/ViralCard";
import { HiOutlineMail } from "react-icons/hi";

// Netflix-style horizontal scroller (copied from ClientEvents/HolidayList)
const HorizontalScroller: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef<{ startX: number; startScrollLeft: number }>({
    startX: 0,
    startScrollLeft: 0,
  });

  const updateScrollState = React.useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollByAmount = (dir: number) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.9), behavior: "smooth" });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const el = containerRef.current;
    if (!el) return;
    setIsDragging(true);
    dragState.current.startX = e.clientX;
    dragState.current.startScrollLeft = el.scrollLeft;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const el = containerRef.current;
    if (!el) return;
    const delta = e.clientX - dragState.current.startX;
    el.scrollLeft = dragState.current.startScrollLeft - delta;
  };

  const endDrag = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      console.log("first");
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    const el = containerRef.current;
    if (!el) return;
    setIsDragging(true);
    dragState.current.startX = e.touches[0].clientX;
    dragState.current.startScrollLeft = el.scrollLeft;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const el = containerRef.current;
    if (!el) return;
    const delta = e.touches[0].clientX - dragState.current.startX;
    el.scrollLeft = dragState.current.startScrollLeft - delta;
  };
  const onTouchEnd = () => setIsDragging(false);

  return (
    <div className="relative group">
      {canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white/60 via-white/40 to-transparent pointer-events-none "></div>
      )}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white/60 via-white/40 to-transparent pointer-events-none "></div>
      )}
      <button
        aria-label="Scroll left"
        onClick={() => scrollByAmount(-1)}
        className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition 
          ${
            canScrollLeft
              ? "bg-gradient-to-br from-gray-100 to-gray-200 hover:bg-gray-100 cursor-pointer"
              : "bg-gray-200 opacity-0 cursor-not-allowed"
          }`}
      >
        <span className="text-2xl text-gray-800">&#8249;</span>
      </button>
      <button
        aria-label="Scroll right"
        onClick={() => scrollByAmount(1)}
        className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition 
          ${
            canScrollRight
              ? "bg-gradient-to-br  from-gray-100 to-gray-200 hover:bg-gray-100 cursor-pointer"
              : "bg-gray-200 opacity-0 cursor-not-allowed"
          }`}
      >
        <span className="text-2xl text-gray-800">&#8250;</span>
      </button>
      <div
        ref={containerRef}
        className={`flex flex-nowrap overflow-x-auto space-x-4 pb-4 hidescroll scrollbar-thin scrollbar-thumb-gray-300 scroll-smooth select-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
      >
        {children}
      </div>
    </div>
  );
};

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const ConstituentProfile: React.FC = () => {
  const { setHeading } = useHeading();
  const [showAll, setShowAll] = useState(false);
  const articlesToShow1 = showAll ? articlesData : articlesData.slice(0, 3);
  const viralDiscussions = showAll ? articlesData : articlesData.slice(3, 8);

  const [todos, setTodos] = useState<Todo[]>([
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

  // modal state
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);

  // file upload state
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Upload handlers
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setUploadedFile(event.target.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setUploadedFile(event.dataTransfer.files[0]);
      event.dataTransfer.clearData();
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
    setHeading("Campaign");
  }, [setHeading]);

  return (
    <Layout>
      <Navbar />
      <div className="p-4 h-[90vh] overflow-y-scroll space-y-6 mx-auto bg-gray-50">
        <HeaderBox />

        {/* What's Happening */}
        <div className="bg-gray-100 rounded-xl p-4 shadow-sm border border-gray-200 mt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-300">
            What's Happening in New Jersey
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex flex-col items-center h-[750px]">
              <h3 className="text-base font-semibold text-gray-700 mb-3 flex items-center">
                <FaCalendarAlt className="mr-2 text-purple-600 text-lg" />{" "}
                Calendar (Upcoming)
              </h3>
              <div className="w-full h-full bg-white rounded-lg border border-gray-200 shadow-inner overflow-hidden">
                <CalendarGrid />
              </div>
            </div>

            {/* Right column: Upcoming & To-Dos */}
            <div className="flex flex-col gap-4 h-[750px]">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex-1 min-h-[200px] flex flex-col">
  {/* Fixed Header */}
  <h3 className="text-base font-semibold text-gray-700 mb-3 flex items-center border-b pb-2 sticky top-0 bg-white z-10">
    <FaCalendarAlt className="mr-2 text-orange-600 text-lg" />
    Upcoming
  </h3>

  {/* Scrollable Events Box */}
  <div className="relative flex-1 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>

    {[
      { type: "upcoming", title: "Cultural Show XYZ", date: "August 15", checked: false },
      { type: "upcoming", title: "Annual Gala Prep Meeting", date: "August 20", checked: false },
      { type: "upcoming", title: "Board Meeting", date: "September 5", checked: false },
      { type: "upcoming", title: "Community Outreach Program", date: "Sept 10", checked: false },
      { type: "upcoming", title: "Holiday Event Planning Session", date: "Sept 25", checked: false },
      { type: "upcoming", title: "Attended Donor Meetup (July)", date: "August 28", checked: true },
      { type: "upcoming", title: "Email follow-up campaign completed", date: "July 10", checked: true },
      { type: "attended", title: "Independence Day Campaign launch", date: "August 5", checked: true },
      { type: "attended", title: "Temple Visit for Community Engagement", date: "July 30", checked: true },
      { type: "attended", title: "Volunteer Orientation Session", date: "June 10", checked: true },
      { type: "attended", title: "Fundraiser Review & Strategy", date: "July 15", checked: true },
    ].map((event, index) => (
      <div
        key={index}
        className="flex items-start relative pl-8 pr-3 py-2 mb-2 bg-gray-50 rounded-lg shadow-sm border border-gray-200"
      >
        {/* Dot/Check Icon */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-500 border border-white flex items-center justify-center">
          {event.checked ? (
            <FaCheckCircle className="text-white text-xs" />
          ) : (
            <FaCalendarAlt className="text-white text-[9px]" />
          )}
        </div>

        {/* Event Details */}
        <div>
          <p className="font-medium text-gray-800 text-sm">{event.title}</p>
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


              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 flex-1 min-h-[250px] flex flex-col">
  {/* Header */}
  <div className="flex justify-between items-center mb-5">
    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
      <FaNewspaper className="mr-2 text-purple-600 text-xl" /> Email Campaigns
    </h3>
  </div>

  {/* Table */}
  <div className="overflow-x-auto rounded-lg border border-gray-100">
    <table className="min-w-full divide-y divide-gray-200 text-sm">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-5 py-3 text-left text-gray-600 uppercase font-semibold tracking-wider">
            Campaign Name
          </th>
          <th className="px-5 py-3 text-left text-gray-600 uppercase font-semibold tracking-wider">
            Date
          </th>
          <th className="px-5 py-3 text-left text-gray-600 uppercase font-semibold tracking-wider flex items-center">
            <HiOutlineMail className="mr-2 text-blue-500 text-lg" /> Emails Sent
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {[
          { name: "Quarterly Newsletter", date: "Aug 1, 2025", sent: 1256 },
          { name: "Community Engagement Drive", date: "Aug 10, 2025", sent: 855 },
          { name: "Fundraiser Launch", date: "Aug 15, 2025", sent: 1437 },
          { name: "Volunteer Recruitment", date: "Aug 20, 2025", sent: 671 },
          { name: "Holiday Campaign", date: "Aug 25, 2025", sent: 986 },
        ].map((campaign, index) => (
          <tr
            key={index}
            className="hover:bg-blue-50/60 transition-colors even:bg-gray-50"
          >
            <td className="px-5 py-3 font-medium text-gray-800 whitespace-nowrap">
              {campaign.name}
            </td>
            <td className="px-5 py-3 text-gray-600 whitespace-nowrap">
              {campaign.date}
            </td>
            <td className="px-5 py-3 text-gray-700 font-semibold whitespace-nowrap">
              {campaign.sent.toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


              {/* To-Dos Card */}
              {/* <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex-1 min-h-[200px] flex flex-col">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-base font-semibold text-gray-700 flex items-center">
                    <FaCheckCircle className="mr-2 text-blue-600 text-lg" />{" "}
                    Orders / To Dos
                  </h3>
                  <button
                    onClick={() => setIsTodoModalOpen(true)}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-800 transition"
                    title="Expand To-Do List"
                    aria-label="Expand To-Do List"
                  >
                    <FaExpand className="text-lg" />
                  </button>
                </div>

                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="Add new task..."
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") addTodo();
                    }}
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                    aria-label="New task"
                  />
                  <button
                    onClick={addTodo}
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-md flex items-center justify-center hover:bg-blue-700 transition-colors text-sm"
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
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => toggleTodo(todo.id)}
                          className="form-checkbox h-3.5 w-3.5 text-blue-600 rounded mr-2.5"
                          aria-label={`Toggle ${todo.text}`}
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
              </div> */}
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-gray-100 p-4 space-y-4 shadow-sm">
          <p className="text-xl sm:text-2xl font-bold text-gray-800 px-4 py-2 rounded-lg">
            Viral Discussions
          </p>

          <div>
            {/* <h2 className="text-xl font-semibold text-gray-700 mb-3">
                    Viral Discussions
                  </h2> */}
            <HorizontalScroller>
              {viralDiscussions.map((item, i) => (
                <ViralCard item={item} i={i} key={i} viralp={true} />
              ))}
            </HorizontalScroller>
          </div>
        </div>

        {/* Exalt Coverage */}
        <div className="rounded-2xl bg-gray-100 p-4 space-y-4 shadow-sm">
          <p className="text-2xl sm:text-3xl font-bold text-gray-800 px-4 py-2 rounded-lg">
            Exalt Coverage
          </p>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <EventsList
                heading={"What's happening in US"}
                donor={true}
                articlesToShow={articlesToShow1}
                showAll={showAll}
                setShowAll={setShowAll}
                showDonor={true}
                seeMore={false}
              />
            </div>

            <div className="flex-1">
              <EventsList
                heading={"What's happening in India"}
                donor={true}
                articlesToShow={articlesToShow1}
                showAll={showAll}
                setShowAll={setShowAll}
                showDonor={true}
                seeMore={false}
              />
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
            onClick={() => fileInputRef.current?.click()}
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
                    e.stopPropagation();
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
              onChange={handleFileUpload}
              ref={fileInputRef}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (uploadedFile) {
                  alert(
                    `Uploading ${uploadedFile.name}... (Actual upload logic goes here!)`
                  );
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

      {/* Todo Modal */}
      <TodoModal
        open={isTodoModalOpen}
        onClose={() => setIsTodoModalOpen(false)}
        todos={todos}
        setTodos={setTodos}
      />
    </Layout>
  );
};

export default ConstituentProfile;
