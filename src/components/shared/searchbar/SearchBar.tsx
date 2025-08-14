/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const SearchBar = ({ isCollapsed }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="relative mb-4">
        {isCollapsed ? (
          <div className="flex justify-center">
            <button
              onClick={() => setIsOpen(true)}
              className="bg-gray-100 hover:bg-gray-200 p-3 rounded-xl transition-all duration-200 hover:scale-110 backdrop-blur-sm border border-gray-200"
            >
              <img
                src="https://img.icons8.com/?size=96&id=Q2SEGLVjvL7L&format=png"
                alt="Search Icon"
                className="h-5 w-5"
              />
            </button>
          </div>
        ) : (
          <div
            onClick={() => setIsOpen(true)}
            className="relative cursor-pointer bg-white flex w-full py-3 rounded-2xl bg-white/80 backdrop-blur-sm 
              text-gray-700 text-sm placeholder-gray-400 
              focus:outline-none focus:ring-2 focus:ring-pink-500/50 
              focus:bg-white transition-all duration-200 
              border border-gray-200 shadow-sm"
          >
            <span className="flex items-center pl-4 text-gray-400">
              <img
                src="https://img.icons8.com/?size=96&id=Q2SEGLVjvL7L&format=png"
                alt="Search Icon"
                className="h-5 w-5"
              />
            </span>

            <span className="outline-none pl-3 text-gray-500">Search...</span>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-start justify-center z-[999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              key="modal"
              initial={{ y: -50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -30, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="mt-40 w-full max-w-2xl bg-white/90 backdrop-blur-lg shadow-xl border border-gray-200 rounded-2xl p-4 z-[200]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <img
                  src="https://img.icons8.com/?size=96&id=Q2SEGLVjvL7L&format=png"
                  alt="Search Icon"
                  className="h-6 w-6 text-gray-400"
                />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search anything..."
                  className="w-full outline-none bg-transparent text-lg text-gray-800 placeholder-gray-400"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
