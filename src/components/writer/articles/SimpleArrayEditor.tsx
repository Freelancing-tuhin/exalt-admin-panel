import React from "react";

const SimpleArrayEditor: React.FC<{
  label: string;
  value: string[];
  onChange: (arr: string[]) => void;
}> = ({ value, onChange }) => {
  const [input, setInput] = React.useState("");

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <input
          className="w-full p-2.5 border rounded-xl border-gray-200 bg-gray-50"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={() => {
            if (!input.trim()) return;
            onChange([...value, input.trim()]);
            setInput("");
          }}
          className="px-8 py-1 bg-blue-500 text-white rounded-xl"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {value.map((v) => (
          <span
            key={v}
            className="px-4 shadow py-2 bg-gray-50 border border-gray-200 rounded-full text-sm flex items-center gap-2"
          >
            {v}
            <button
              onClick={() => onChange(value.filter((x) => x !== v))}
              className="ml-2 text-red-500"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default SimpleArrayEditor;
