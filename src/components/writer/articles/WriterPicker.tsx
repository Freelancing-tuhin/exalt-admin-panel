import React from "react";

type Writer = { id: string; name: string };

const WriterPicker: React.FC<{
  value?: string;
  onChange: (id?: string) => void;
}> = ({ value, onChange }) => {
  const [options, setOptions] = React.useState<Writer[]>([]);

  React.useEffect(() => {
    fetch("/api/writers")
      .then((r) => r.json())
      .then((data) => setOptions(data || []))
      .catch(() => setOptions([]));
  }, []);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Writer
      </label>
      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value || undefined)}
        className="w-full border rounded px-3 py-2"
      >
        <option value="">-- Select writer --</option>
        {options.map((w) => (
          <option key={w.id} value={w.id}>
            {w.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default WriterPicker;
