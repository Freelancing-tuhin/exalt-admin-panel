import React from "react";
import TagSelector from "./TagSelector";

type Props = {
  tagIds: string[];
  setTagIds: (s: string[]) => void;
  writerName: string;
  setWriterName: (s: string) => void;
  donors: string[];
  setDonors: (s: string[]) => void;
  sentimentData: string;
  setSentimentData: (s: string) => void;
  countryTags: { usa?: boolean; india?: boolean };
  setCountryTags: (s: { usa?: boolean; india?: boolean }) => void;
};

const UtilsTab: React.FC<Props> = ({
  tagIds,
  setTagIds,
  writerName,
  setWriterName,
  countryTags,
  setCountryTags,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold mb-2">Country Tags</h3>
        <div className="flex space-x-2 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <button
            onClick={() =>
              setCountryTags(countryTags.usa ? {} : { usa: true, india: false })
            }
            className={`px-6 py-2.5 rounded-full text-sm shadow-sm transition-colors duration-200 ${
              countryTags.usa
                ? "bg-blue-500 text-white "
                : "bg-white  border border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            Whats happening in the USA
          </button>
          <button
            onClick={() =>
              setCountryTags(
                countryTags.india ? {} : { india: true, usa: false }
              )
            }
            className={`px-6 py-2.5 rounded-full text-sm shadow-sm transition-colors duration-200 ${
              countryTags.india
                ? "bg-blue-500 text-white "
                : "bg-white  border border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            Whats happening in India
          </button>
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Category Tags</h3>
        <TagSelector value={tagIds} onChange={setTagIds} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Writer Name</h3>
        <input
          value={writerName}
          onChange={(e) => setWriterName(e.target.value)}
          placeholder="Writer full name"
          className="w-full p-2.5 border rounded-xl border-gray-200 bg-gray-50"
        />
      </div>
    </div>
  );
};

export default UtilsTab;
