import { FaUmbrellaBeach, FaUsers, FaGlobeAsia } from "react-icons/fa";

export const HolidayStats = () => {
  return (
    <div className="grid grid-cols-4 gap-6 mb-6 pr-4">
      {/* Total Holidays */}
      <div className="flex items-center gap-4 bg-purple-100 rounded-2xl p-5 shadow-sm">
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-purple-200 text-purple-700">
          <FaUmbrellaBeach size={20} />
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Holidays</p>
          <h2 className="text-2xl font-semibold text-gray-800">65</h2>
        </div>
      </div>

      {/* Cultural Festivals */}
      <div className="flex items-center gap-4 bg-violet-100 rounded-2xl p-5 shadow-sm">
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-violet-200 text-violet-700">
          <FaGlobeAsia size={20} />
        </div>
        <div>
          <p className="text-sm text-gray-500">Cultural Festivals</p>
          <h2 className="text-2xl font-semibold text-gray-800">28</h2>
        </div>
      </div>

      {/* Public Participation */}
      <div className="flex items-center gap-4 bg-indigo-100 rounded-2xl p-5 shadow-sm">
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-200 text-indigo-700">
          <FaUsers size={20} />
        </div>
        <div>
          <p className="text-sm text-gray-500">Religious Festivals</p>
          <h2 className="text-2xl font-semibold text-gray-800">18</h2>
        </div>
      </div>

      {/* Add New Holiday/Event */}
      <div className="flex items-center gap-4 bg-indigo-100 rounded-2xl p-5 shadow-sm">
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-200 text-indigo-700">
          <FaUsers size={20} />
        </div>
        <div>
          <p className="text-sm text-gray-500">Events created</p>
          <h2 className="text-2xl font-semibold text-gray-800">23</h2>
        </div>
      </div>
    </div>
  );
};
