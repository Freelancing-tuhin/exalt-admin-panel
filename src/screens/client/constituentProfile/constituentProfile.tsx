import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
//@ts-ignore
import L from "leaflet";
import { Layout } from "../../layout/Layout";
import Navbar from "../../../components/main/navbar/Navbar";
import { useHeading } from "../../../contexts/headingContext";

import { FaCheckCircle, FaCalendarAlt, FaHandsHelping } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import CalendarGrid from "../../../components/shared/Calender/Calender";

// Marker data now defined inside ConstituentMap (can be passed as prop if needed)

const ConstituentProfile: React.FC = () => {
  const { setHeading } = useHeading();

  useEffect(() => {
    setHeading("Constituent Profile");
  }, [setHeading]);

  return (
    <Layout>
      <Navbar />

      <div className="p-6 h-[90vh] overflow-y-scroll space-y-8 mx-auto bg-white ">
        <div className="bg-white rounded-xl p-4 flex flex-col md:flex-col  shadow-sm border border-gray-200">
          <span className="text-5xl md:text-5xl font-semibold text-gray-800 mb-2 md:mb-0  pt-15">
            WELCOME TEAM <span className="text-indigo-700"> SMITH </span>
          </span>
          <span className="text-sm md:text-base text-gray-600 pb-15">
            Wednesday, August 6 · 5:17pm CST
          </span>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">
            STATE XYZ
          </h2>
          <div className="flex flex-col gap-4">
            <div className="w-full h-95 rounded-lg overflow-hidden shadow-md border border-gray-200">
              <MapContainer
                //@ts-ignore
                center={[38.5, -95.5]}
                zoom={7}
                className="h-full w-full rounded-lg"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  //@ts-ignore
                  attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                />
                {markerData.map((marker, idx) => (
                  <Marker
                    key={idx}
                    position={[marker.lat, marker.lng]}
                    //@ts-ignore
                    icon={createIcon(marker.color)}
                  >
                    <Popup>
                      <div className="font-semibold text-gray-800 text-md">
                        {marker.label}
                      </div>
                      <p className="text-xs text-gray-600">
                        Population data here...
                      </p>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-inner border border-gray-100">
              <span className="text-sm font-semibold text-gray-700 mb-2 block">
                LEGEND / Key
              </span>
              <div className="flex flex-wrap justify-around md:justify-start gap-x-6 gap-y-2 text-sm font-medium text-gray-700">
                {markerData
                  .filter(
                    (item, i, arr) =>
                      arr.findIndex(
                        (t) =>
                          t.label.split(" ")[0] === item.label.split(" ")[0]
                      ) === i
                  )
                  .map((marker, idx) => (
                    <span key={idx} className="flex items-center">
                      <div
                        style={{
                          backgroundColor: marker.color,
                          width: "12px",
                          height: "16px",
                          borderRadius: "50% 50% 50% 0",
                          transform: "rotate(-45deg)",
                          border: "1px solid rgba(255,255,255,0.8)",
                        }}
                        className="mr-1.5"
                      ></div>
                      {marker.label.split(" ")[0]}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <ConstituentMap />

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
