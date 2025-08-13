import { useContext, useState } from "react";
import {
  FiSearch,
  FiFileText,
  FiClock,
  FiCopy,
  FiBox,
  FiAlertCircle,
  FiBarChart2,
  FiTool,
  FiSettings,
  FiServer,
} from "react-icons/fi";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarRightCollapse,
} from "react-icons/tb";
import { SidebarItem } from "../../shared/sidebarItem/SidebarItem";
import AuthContext from "../../../contexts/authContext/authContext";
import { IoFileTrayOutline } from "react-icons/io5";
import { TiStarOutline } from "react-icons/ti";
import { RiAccountPinBoxLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { MdGroups } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";

export const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // const handleLogout = () => {
  //   setUser({});
  //   localStorage.removeItem("user");
  //   localStorage.removeItem("token");
  //   window.location.href = "/login";
  // };
  return (
    <div
      className={`${
        isCollapsed ? "w-22" : "w-48 sm:w-44 md:w-44 lg:w-56 xl:w-66"
      } h-screen bg-[#F7F7F5] p-4 transition-all duration-300 flex flex-col justify-between`}
    >
        {/* <div
    className={`${
      isCollapsed ? "w-22" : "w-48 sm:w-44 md:w-44 lg:w-56 xl:w-66"
    } h-screen p-4 transition-all duration-300 flex flex-col justify-between
    bg-gradient-to-br from-pink-200/60 via-yellow-100/50 via-purple-200/50 to-pink-300/60
    backdrop-blur-lg border border-white/25 shadow-xl rounded-xl`}
  ></div> */}
      {/* Top Section */}
      <div>
        {/* Logo + Toggle */}
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
        <div className="relative mb-6">
          {isCollapsed ? (
            <div className="flex justify-center mt-4">
              <FiSearch className="text-gray-400 mt-3" />
            </div>
          ) : (
            <>
              <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-3 py-2 rounded-md bg-gray-100 text-sm placeholder-gray-500 focus:outline-none"
              />
            </>
          )}
        </div>

        <div className="mb-2">
          {/* Shown when expanded */}
          <div
            className={`text-xs text-gray-400 uppercase font-semibold ${
              isCollapsed ? "hidden" : "block"
            }`}
          >
            Briefs
          </div>

          {/* Shown when collapsed */}
          <div
            className={`text-gray-400 text-center ${
              isCollapsed ? "block" : "hidden"
            }`}
          >
            •
          </div>
        </div>

        <div className="space-y-1 mb-">
          {user?.role === "ADMIN" ? (
            <>
              <SidebarItem
                icon={<IoFileTrayOutline />}
                label="Issues"
                isCollapsed={isCollapsed}
                route={"/admin/issues"}
              />
              <SidebarItem
                icon={<FiClock />}
                label="Events"
                isCollapsed={isCollapsed}
                route={"/admin/events"}
              />

              <SidebarItem
                icon={<FiCopy />}
                label="Final Briefs"
                isCollapsed={isCollapsed}
                route={"/admin/final-briefs"}
              />
            </>
          ) : (
            <>
              <SidebarItem
                icon={<FiFileText />}
                label="Briefs"
                isCollapsed={isCollapsed}
                route={"/client/briefs"}
              />
              <SidebarItem
                icon={<FiClock />}
                label="Events"
                isCollapsed={isCollapsed}
                route={"/client/events"}
              />

              <SidebarItem
                icon={<FiCopy />}
                label="Holidays"
                isCollapsed={isCollapsed}
                route={"/client/holidays"}
              />
              <SidebarItem
                icon={<FaRegHeart />}
                label="Donor Engagement"
                isCollapsed={isCollapsed}
                route={"/client/donor-engagement"}
              />
              <SidebarItem
                icon={<MdGroups />}
                label="Previous Outreach"
                isCollapsed={isCollapsed}
                route={"/client/PreviousOutreach"}
              />
            </>
          )}
        </div>

        {/* Section 2 */}

        <div className="space-y-1 mb-6">
          <SidebarItem
            icon={<FiBox />}
            label="Bulletins"
            isCollapsed={isCollapsed}
            route={""}
          />
          <SidebarItem
            icon={<FiAlertCircle />}
            label="Alerts"
            isCollapsed={isCollapsed}
            route={""}
          />
          <SidebarItem
            icon={<FiBarChart2 />}
            label="Data"
            isCollapsed={isCollapsed}
            route={"/client/data"}
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div>
        <div className="space-y-1 mb-4">
          {user?.role === "ADMIN" ? (
            <>
              <SidebarItem
                icon={<FiTool />}
                label="Client Tools"
                isCollapsed={isCollapsed}
                route={""}
              />
              <SidebarItem
                icon={<FiServer />}
                label="Backend Users"
                isCollapsed={isCollapsed}
                route={""}
              />
            </>
          ) : (
            <>
              <SidebarItem
                icon={<RiAccountPinBoxLine />}
                label="Constituent Profile"
                isCollapsed={isCollapsed}
                route={""}
              />
              <SidebarItem
                icon={<TiStarOutline />}
                label="Started"
                isCollapsed={isCollapsed}
                route={""}
              />
            </>
          )}
        </div>

        <div
          // onClick={handleLogout}
          className={`flex items-center p-2 rounded-md border-2 border-gray-300 hover:shadow-sm transition cursor-pointer `}
        >
          <img
            src={"https://media.licdn.com/dms/image/sync/v2/D4E27AQEvbuass5EBeA/articleshare-shrink_800/articleshare-shrink_800/0/1712246208786?e=1755723600&v=beta&t=d_utJKTXC5RYwEChLlp7tTKFebsxJ_1aalK1t1PvmDk"}
            alt="Profile"
            className={`rounded-md object-cover transition-all duration-200 h-10 w-10 `}
          />

          {!isCollapsed && (
            <>
              <div className="flex-1 ml-2">
                <p className="text-sm font-semibold">Sudhanshu Kaushik</p>
                <p className="text-xs text-gray-500">{user?.role}</p>
              </div>
              <FiSettings size={16} className="text-gray-500" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Sidebar Item
