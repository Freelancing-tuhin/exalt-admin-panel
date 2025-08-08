import React, { useEffect } from "react";
import { Layout } from "../../layout/Layout";
import Navbar from "../../../components/main/navbar/Navbar";
import { useHeading } from "../../../contexts/headingContext";

import { FaCheckCircle, FaCalendarAlt, FaHandsHelping } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import CalendarGrid from "../../../components/shared/Calender/Calender";
import ConstituentMap from "../../../components/shared/map/ConstituentMap";

// Marker data now defined inside ConstituentMap (can be passed as prop if needed)

const ConstituentProfile: React.FC = () => {
  const { setHeading } = useHeading();

  useEffect(() => {
    setHeading("Constituent Profile");
  }, [setHeading]);

  return (
    <Layout>
      <Navbar />

      <div className="px-5 rounded-lg h-[90vh] overflow-y-scroll space-y-8 mx-auto bg-white ">
        {/* Header band with embedded map */}
        <div className="relative  px-8 py-10 md:py-14 bg-gradient-to-br from-purple-800 to-purple-900 overflow-hidden flex flex-col md:flex-row md:items-center gap-10">
          {/* Decorative angled lines */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-0 w-full h-px bg-purple-500/40" />
            <div className="absolute top-1/2 left-0 w-full h-px bg-purple-400/30 translate-y-6" />
            <div className="absolute top-1/2 left-0 w-full h-px bg-purple-400/20 -translate-y-6" />
            <div className="absolute top-1/2 left-0 h-0 w-1/2 border-t-4 border-b-4 border-purple-600/50 rotate-12 origin-left opacity-40" />
          </div>

          <div className="relative flex-1 z-10">
            <h1 className="text-white font-handwriting text-4xl md:text-5xl tracking-wide mb-4">
              Hello Team <span className="text-white/90">Smith</span>
            </h1>
            <p className="text-purple-200 font-handwriting text-lg">
              August 6, 4:18 CST
            </p>
          </div>
          <div className="relative w-full md:w-[520px] max-w-[560px] aspect-[5/3] md:aspect-[5/3] px-6 md:px-0">
            <ConstituentMap embedded heightClass="h-full" />
          </div>
        </div>

        <h2 className="text-lg font-bold text-gray-700 text-center my-4">
          <span className="text-gray-400 mr-2">•</span> XYZX TRACKER{" "}
          <span className="text-gray-400 ml-2">•</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <MdEmail className="mr-2 text-indigo-500 text-lg" /> Emails Sent
              to Donors
            </h3>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-indigo-50 rounded-lg border border-indigo-200 shadow-xs">
                <FaCheckCircle className="text-green-500 mr-3 text-md" />
                <div>
                  <p className="font-medium text-gray-800 text-sm">
                    Welcome Email Sent to Donor A
                  </p>
                  <p className="text-xs text-gray-500">
                    Recipient:{" "}
                    <span className="font-normal">john.doe@example.com</span>
                  </p>
                </div>
                <span className="ml-auto text-xs text-gray-400">Aug 1</span>
              </div>
              <div className="flex items-center p-3 bg-indigo-50 rounded-lg border border-indigo-200 shadow-xs">
                <FaCheckCircle className="text-green-500 mr-3 text-md" />
                <div>
                  <p className="font-medium text-gray-800 text-sm">
                    Reminder Email Sent to Donor B
                  </p>
                  <p className="text-xs text-gray-500">
                    Recipient:{" "}
                    <span className="font-normal">jane.smith@example.com</span>
                  </p>
                </div>
                <span className="ml-auto text-xs text-gray-400">Jul 28</span>
              </div>
              <div className="flex items-center p-3 bg-indigo-50 rounded-lg border border-indigo-200 shadow-xs">
                <FaCheckCircle className="text-green-500 mr-3 text-md" />
                <div>
                  <p className="font-medium text-gray-800 text-sm">
                    Follow-up on Pledge C
                  </p>
                  <p className="text-xs text-gray-500">
                    Recipient:{" "}
                    <span className="font-normal">bob.johnson@example.com</span>
                  </p>
                </div>
                <span className="ml-auto text-xs text-gray-400">Jul 20</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <FaHandsHelping className="mr-2 text-green-500 text-lg" /> Donors
              Tracker
            </h3>
            <div className="bg-green-50 rounded-lg p-3 border-l-3 border-green-300 shadow-xs mb-3">
              <p className="text-sm text-gray-700 font-medium">
                Keep track of your donor engagement and contributions.
              </p>
              <ul className="list-disc list-inside mt-2 text-gray-800 text-xs space-y-1">
                <li>
                  <span className="font-bold">Total Active Donors:</span> 250
                </li>
                <li>
                  <span className="font-bold">New Donors Last Month:</span> 15
                </li>
                <li>
                  <span className="font-bold">Total Pledged Amount:</span>{" "}
                  $150,000
                </li>
              </ul>
            </div>
            <button className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-md text-sm hover:bg-green-700 transition-colors duration-200 shadow-sm">
              View All Donor Details
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center border border-gray-200 h-[400px]">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <FaCalendarAlt className="mr-2 text-purple-500 text-lg" />{" "}
              Calendar (Upcoming)
            </h3>
            <div className="w-full h-full bg-white rounded-lg border border-gray-200 shadow-inner overflow-hidden">
              <CalendarGrid />
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm custom-scrollbar border border-gray-200 h-[400px] overflow-y-auto">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <FaCheckCircle className="mr-2 text-orange-500 text-lg" />{" "}
              Upcoming & Attended
            </h3>
            <div className="relative space-y-4 pt-1">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>

              {[
                {
                  type: "upcoming",
                  title: "Cultural Show XYZ",
                  date: "August 15",
                  checked: false,
                },
                {
                  type: "attended",
                  title: "Attended Donor Meet",
                  date: "July 28",
                  checked: true,
                },
                {
                  type: "attended",
                  title: "Email follow-up campaign",
                  date: "July 10",
                  checked: true,
                },
                {
                  type: "attended",
                  title: "Independence Day Campaign",
                  date: "August 5",
                  checked: true,
                },
                {
                  type: "attended",
                  title: "Temple Visit",
                  date: "July 30",
                  checked: true,
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
                  type: "attended",
                  title: "Volunteer Orientation",
                  date: "June 10",
                  checked: true,
                },
                {
                  type: "upcoming",
                  title: "Community Outreach",
                  date: "Sept 10",
                  checked: false,
                },
                {
                  type: "attended",
                  title: "Fundraiser Review",
                  date: "July 15",
                  checked: true,
                },
                {
                  type: "upcoming",
                  title: "Holiday Event Planning",
                  date: "Sept 25",
                  checked: false,
                },
              ].map((event, index) => (
                <div
                  key={index}
                  className="flex items-start relative pl-10 pr-2 py-2 bg-gray-50 rounded-lg shadow-xs border border-gray-200"
                >
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-blue-500 border border-white flex items-center justify-center">
                    {event.checked ? (
                      <FaCheckCircle className="text-white text-xs" />
                    ) : (
                      <FaCalendarAlt className="text-white text-[10px]" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">
                      {event.title}
                    </p>
                    <p className="text-xs text-gray-600">{event.date}</p>
                    {event.checked && (
                      <p className="text-[10px] text-green-600 mt-0.5">
                        <FaCheckCircle className="inline mr-1" /> Attended on{" "}
                        {event.date}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ConstituentProfile;
