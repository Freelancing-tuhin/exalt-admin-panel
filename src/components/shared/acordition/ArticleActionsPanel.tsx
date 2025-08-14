import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";

const actionItems = [
  {
    label: "EXALT Actions Menu",
    content: "Here are some donor targeting strategies and messaging examples.",
  },
  {
    label: "Recommended Messages",
    content: "Use Kamala Harris’s speech as an anchor for outreach messaging.",
  },
  {
    label: "Further Readings",
    content: "See articles related to Indian-American political engagement.",
  },
];

export const ArticleActionsPanel = () => {
  const [openIndex, setOpenIndex] = useState<null | number>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="flex flex-col w-full mt-8 md:mt-0 md:w-96 mx-auto gap-2 p-3  md:p-2 ">
      {actionItems.map((item, i) => {
        const isOpen = openIndex === i;

        return (
          <div
            key={i}
            className=" rounded-md overflow-hidden bg-gray-100 transition-all duration-300"
          >
            {/* Toggle Header */}
            <button
              onClick={() => toggleAccordion(i)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium text-sm px-4 py-3 w-full flex items-center justify-between"
            >
              {item.label}
              <BiChevronDown
                className={`ml-1 h-5 w-5 transform transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Accordion Content */}
            <div
              className={`px-4 text-sm text-gray-600 bg-gray-50 transition-all duration-500 ease-in-out overflow-hidden ${
                isOpen ? "max-h-40 opacity-100 py-3" : "max-h-0 opacity-0 py-0"
              }`}
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
};
