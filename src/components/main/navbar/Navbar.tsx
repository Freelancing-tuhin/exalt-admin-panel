/* eslint-disable @typescript-eslint/no-explicit-any */
import { FiPlus } from "react-icons/fi";
import AuthContext from "../../../contexts/authContext/authContext";
import { useHeading } from "../../../contexts/headingContext";
import { useContext } from "react";
import { IoArrowBack } from "react-icons/io5";

const Navbar = ({ back , heading_input  }: any) => {
  const { user } = useContext(AuthContext);
  const { heading } = useHeading();

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
      {/* Left Title */}
      <h1 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
        {back && (
          <span
            className="cursor-pointer mr-1 text-gray-500 hover:text-gray-700 transition"
            onClick={() => window.history.back()}
          >
            <IoArrowBack className="inline-block mr-2" />
          </span>
        )}
        <span className="font-bold">{!heading_input ? heading : heading_input}</span> {!back && <>{!heading_input? "Dashboard" :"" }</>}
      </h1>

      {user?.roll === "ADMIN" && (
        <button className="flex items-center gap-1 text-xs text-indigo-700 font-medium border border-indigo-200 px-3 py-1.5 rounded-full hover:bg-indigo-50 transition">
          <FiPlus className="text-xs" />
          Add Event
        </button>
      )}
    </div>
  );
};

export default Navbar;
