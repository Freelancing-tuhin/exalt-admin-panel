import React from "react";
import SimpleArrayEditor from "./SimpleArrayEditor";

import type { Dispatch, SetStateAction } from "react";

type Props = {
  tweetIds: string[];
  setTweetIds: (s: string[]) => void;
  furtherReadings: Array<{ title: string; url: string }>;
  setFurtherReadings: Dispatch<
    SetStateAction<Array<{ title: string; url: string }>>
  >;
  openModal: () => void;
};

const SiteLinksTab: React.FC<Props> = ({
  tweetIds,
  setTweetIds,
  furtherReadings,
  setFurtherReadings,
  openModal,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold mb-2">Tweet IDs</h3>
        <SimpleArrayEditor
          label="Tweet IDs"
          value={tweetIds}
          onChange={setTweetIds}
        />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Further Readings</h3>
        <div className="space-y-2">
          {furtherReadings.map((f, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between border rounded px-3 py-2"
            >
              <div>
                <div className="font-medium">{f.title}</div>
                <div className="text-sm text-gray-600">{f.url}</div>
              </div>
              <button
                onClick={() =>
                  setFurtherReadings(
                    (s: Array<{ title: string; url: string }>) =>
                      s.filter((_, i: number) => i !== idx)
                  )
                }
                className="text-sm text-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <div>
            <button
              onClick={openModal}
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              + Add Further Reading
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteLinksTab;
