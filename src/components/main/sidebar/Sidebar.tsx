/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from "react";
import {
  FiFileText,
  FiClock,
  FiCopy,
  FiBarChart2,
  FiTool,
  FiSettings,
  FiServer,
} from "react-icons/fi";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarRightCollapse,
} from "react-icons/tb";
import AuthContext from "../../../contexts/authContext/authContext";
import { IoFileTrayOutline } from "react-icons/io5";
import { RiAccountPinBoxLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import { MdGroups } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { SearchBar } from "../../shared/searchbar/SearchBar";

// Sidebar Component
export const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-72"
      } h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 p-4 transition-all duration-300 flex flex-col justify-between relative overflow-hidden border-r border-gray-200`}
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-pink-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-full blur-2xl"></div>

      {/* Top Section */}
      <div className="relative z-10">
        {/* Logo + Collapse toggle */}
        <div className="flex items-center justify-between mb-6 pt-2 pl-2">
          {!isCollapsed && (
            <Link to="/client/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="75.734"
                height="19.364"
                fill="none"
                overflow="visible"
              >
                <g>
                  <path
                    d="M 0 19.364 L 0 0 L 75.734 0 L 75.734 19.364 Z"
                    fill="transparent"
                  ></path>
                  <path
                    d="M 61.603 3.818 L 61.603 0 L 75.679 0 L 75.679 3.818 L 70.696 3.818 L 70.696 19.364 L 66.71 19.364 L 66.71 3.818 Z"
                    fill="#5042B7"
                  ></path>
                  <path
                    d="M 54.503 0 L 54.503 15.41 L 61.479 15.41 L 61.479 19.364 L 50.517 19.364 L 50.517 0 Z"
                    fill="#5042B7"
                  ></path>
                  <path
                    d="M 36.379 19.364 L 32.324 19.364 L 38.651 0 L 42.443 0 L 48.773 19.364 L 44.646 19.364 L 43.378 14.524 L 40.511 14.524 L 37.643 14.524 Z M 40.043 5.982 L 38.397 11.633 L 42.648 11.633 L 41.003 5.982 C 40.811 5.325 40.595 4.564 40.523 4.091 C 40.451 4.537 40.259 5.273 40.043 5.982 Z"
                    fill="#5042B7"
                  ></path>
                  <path
                    d="M 27.056 12.324 C 26.256 10.721 26.27 8.765 27.094 7.144 C 28.067 5.234 29.24 2.882 30.102 1.002 C 30.116 0.971 30.13 0.942 30.144 0.912 C 30.208 0.781 30.37 0.441 30.58 0 L 26.234 0 C 25.468 1.621 24.533 3.491 23.721 5.087 C 22.264 7.952 22.219 11.45 23.668 14.352 L 26.171 19.364 L 30.57 19.364 L 30.1 18.42 Z"
                    fill="#5042B7"
                  ></path>
                  <path
                    d="M 16.546 12.324 C 17.347 10.721 17.332 8.765 16.508 7.144 C 15.536 5.234 14.363 2.882 13.5 1.002 C 13.486 0.971 13.472 0.942 13.458 0.912 C 13.395 0.781 13.232 0.441 13.022 0 L 17.368 0 C 18.135 1.621 19.069 3.491 19.881 5.087 C 21.338 7.952 21.383 11.45 19.935 14.352 L 17.432 19.364 L 13.033 19.364 L 13.502 18.42 Z"
                    fill="#5042B7"
                  ></path>
                  <path
                    d="M 11.278 19.364 L 0 19.364 L 0 0 L 11.258 0 L 11.258 3.804 L 3.867 3.804 L 3.867 7.614 L 10.418 7.614 L 10.418 11.344 L 3.867 11.344 L 3.867 15.364 L 11.258 15.364 Z"
                    fill="#5042B7"
                  ></path>
                </g>
              </svg>
            </Link>
          )}
          <div
            className="ml-auto cursor-pointer"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <TbLayoutSidebarRightCollapse
                className="text-gray-700 -ml-9"
                size={20}
              />
            ) : (
              <TbLayoutSidebarLeftCollapse
                className="text-gray-700"
                size={20}
              />
            )}
          </div>
        </div>

        {/* Search */}
        <SearchBar isCollapsed={isCollapsed} />

        {/* Navigation */}
        <div className="">
          {user?.role === "ADMIN" ? (
            <>
              <ModernSidebarItem
                icon={<IoFileTrayOutline size={20} />}
                label="Issues"
                isCollapsed={isCollapsed}
                route={"/admin/issues"}
                isActive={location.pathname === "/admin/issues"}
              />
              <ModernSidebarItem
                icon={<FiClock size={20} />}
                label="Events"
                isCollapsed={isCollapsed}
                route={"/admin/events"}
                isActive={location.pathname === "/admin/events"}
              />
              <ModernSidebarItem
                icon={<FiCopy size={20} />}
                label="Final Briefs"
                isCollapsed={isCollapsed}
                route={"/admin/final-briefs"}
                isActive={location.pathname === "/admin/final-briefs"}
              />
            </>
          ) : (
            <>
              <ModernSidebarItem
                icon={<FiBarChart2 size={20} />}
                label="Data"
                isCollapsed={isCollapsed}
                route={"/client/data"}
                isActive={location.pathname === "/client/data"}
              />
              <ModernSidebarItem
                icon={<FiFileText size={22} />}
                label="Briefs"
                isCollapsed={isCollapsed}
                route={"/client/briefs"}
                isActive={location.pathname === "/client/briefs"}
              />
              <ModernSidebarItem
                icon={<FiClock size={20} />}
                label="Events"
                isCollapsed={isCollapsed}
                route={"/client/events"}
                isActive={location.pathname === "/client/events"}
              />
              <ModernSidebarItem
                icon={<FiCopy size={20} />}
                label="Holidays"
                isCollapsed={isCollapsed}
                route={"/client/holidays"}
                isActive={location.pathname === "/client/holidays"}
              />
              <ModernSidebarItem
                icon={<FaRegHeart size={20} />}
                label="Donor Engagement"
                isCollapsed={isCollapsed}
                route={"/client/donor-engagement"}
                isActive={location.pathname === "/client/donor-engagement"}
              />
              <ModernSidebarItem
                icon={<MdGroups size={20} />}
                label="Previous Outreach"
                isCollapsed={isCollapsed}
                route={"/client/PreviousOutreach"}
                isActive={location.pathname === "/client/PreviousOutreach"}
              />
            </>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative z-10">
        <div className="">
          {user?.role === "ADMIN" ? (
            <>
              <ModernSidebarItem
                icon={<FiTool size={20} />}
                label="Client Tools"
                isCollapsed={isCollapsed}
                route={"/admin/client-tools"}
                isActive={location.pathname === "/admin/client-tools"}
              />
              <ModernSidebarItem
                icon={<FiServer size={20} />}
                label="Backend Users"
                isCollapsed={isCollapsed}
                route={"/admin/backend-users"}
                isActive={location.pathname === "/admin/backend-users"}
              />
            </>
          ) : (
            <>
              <ModernSidebarItem
                icon={<RiAccountPinBoxLine size={20} />}
                label="Campaign Dashboard"
                isCollapsed={isCollapsed}
                route={"/client/"}
                isActive={
                  location.pathname === "/client/" ||
                  location.pathname === "/client"
                }
              />
            </>
          )}
        </div>

        {/* Profile */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 hover:bg-white hover:shadow-md transition-all duration-200 cursor-pointer group">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src="https://media.licdn.com/dms/image/sync/v2/D4E27AQEvbuass5EBeA/articleshare-shrink_800/articleshare-shrink_800/0/1712246208786?e=1755723600&v=beta&t=d_utJKTXC5RYwEChLlp7tTKFebsxJ_1aalK1t1PvmDk"
                alt="Profile"
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-gray-200 group-hover:ring-pink-500/50 transition-all duration-200"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>

            {!isCollapsed && (
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">
                  Sudhanshu Kaushik
                </p>
                <p className="text-xs text-gray-500">
                  {user?.role || "Client"}
                </p>
              </div>
            )}

            {!isCollapsed && (
              <FiSettings
                size={16}
                className="text-gray-400 group-hover:text-gray-600 transition-colors duration-200"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Modern Sidebar Item Component
const ModernSidebarItem = ({
  icon,
  label,
  isCollapsed,
  route,
  isActive = false,
  badge = null,
  badgeColor = "bg-pink-500",
}: any) => {
  return (
    <Link to={route || "#"}>
      <div
        className={`
          group flex items-center p-2.5 mb-0.5 rounded-2xl transition-all duration-300 cursor-pointer relative
          ${
            isActive
              ? "bg-gradient-to-r from-gray-500/10 to-indigo-500/10 text-gray-800 translate-x-1"
              : "hover:bg-gray-100 text-gray-600 hover:text-gray-800   translate-x-1"
          }
        
        `}
      >
        <div
          className={`
            flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-300 transform
            ${
              isActive
                ? "bg-gradient-to-br from-gray-300 to-gray-400 text-white s scale-110"
                : "text-gray-500 group-hover:text-gray-700 group-hover:bg-gray-100 scale-100"
            }
          `}
        >
          {icon}
        </div>

        {!isCollapsed && (
          <>
            <span className="ml-3 font-medium text-sm tracking-wide transition-all duration-300">
              {label}
            </span>
            {badge && (
              <div
                className={`
                  ml-auto px-2 py-1 rounded-full text-xs font-bold text-white shadow-lg
                  ${badgeColor}
                  ${badge === "!" ? "animate-pulse" : ""}
                `}
              >
                {badge}
              </div>
            )}
          </>
        )}

        {badge && isCollapsed && (
          <div
            className={`
              absolute -top-1 -right-1 w-3 h-3 rounded-full
              ${badgeColor}
              ${badge === "!" ? "animate-pulse" : ""}
            `}
          ></div>
        )}
      </div>
    </Link>
  );
};
