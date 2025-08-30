import React from "react";

type Article = { id: string; title: string };

const ArticlePicker: React.FC<{
  value: string[];
  onChange: (ids: string[]) => void;
}> = ({ value, onChange }) => {
  const [options, setOptions] = React.useState<Article[]>([]);

  React.useEffect(() => {
    fetch("/api/articles")
      .then((r) => r.json())
      .then((data) => setOptions(data || []))
      .catch(() => setOptions([]));
  }, []);

  const toggle = (id: string) => {
    if (value.includes(id)) onChange(value.filter((v) => v !== id));
    else onChange([...value, id]);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Further reading
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((a) => (
          <button
            key={a.id}
            onClick={() => toggle(a.id)}
            className={`px-3 py-1 rounded-full text-sm ${
              value.includes(a.id)
                ? "bg-indigo-600 text-white"
                : "border border-dashed border-gray-300 text-gray-700"
            }`}
          >
            {a.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ArticlePicker;
