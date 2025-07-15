import { FiPlus } from "react-icons/fi";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
      {/* Left Title */}
      <h1 className="text-xl font-semibold">
        <span className="font-bold">Events</span> Dashboard
      </h1>

      {/* Right Button */}
      <button className="flex items-center gap-1 text-xs text-indigo-700 font-medium border border-indigo-200 px-3 py-1.5 rounded-full hover:bg-indigo-50 transition">
        <FiPlus className="text-xs" />
        Add Event
      </button>
    </div>
  );
};

export default Navbar;
