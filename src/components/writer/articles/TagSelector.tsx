import React from "react";

type Tag = { id: string; name: string; category?: string };

const defaultTags: Record<string, Tag[]> = {
  Religions: [
    { id: "religion-hindu", name: "Hindu", category: "Religions" },
    { id: "religion-muslim", name: "Muslim", category: "Religions" },
    { id: "religion-christian", name: "Christian", category: "Religions" },
    { id: "religion-jain", name: "Jain", category: "Religions" },
    { id: "religion-sikh", name: "Sikh", category: "Religions" },
  ],
  Cultural: [
    { id: "cultural-festivals", name: "Festivals", category: "Cultural" },
    { id: "cultural-food", name: "Food", category: "Cultural" },
    { id: "cultural-music", name: "Music", category: "Cultural" },
  ],
  Ethnicity: [
    { id: "ethnicity-indian", name: "Indian", category: "Ethnicity" },
    { id: "ethnicity-bengali", name: "Bengali", category: "Ethnicity" },
    { id: "ethnicity-tamil", name: "Tamil", category: "Ethnicity" },
  ],
};

const categoryOrder = ["Religions", "Cultural", "Ethnicity"];

const TagSelector: React.FC<{
  value: string[];
  onChange: (ids: string[]) => void;
}> = ({ value, onChange }) => {
  const [serverTags, setServerTags] = React.useState<Tag[]>([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalCategory, setModalCategory] = React.useState<string | null>(null);
  const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
    // local-only: seed tags from defaults (no network calls)
    const seeded: Tag[] = Object.values(defaultTags).flat();
    setServerTags(seeded);
  }, []);

  // Merge categories
  const categories: Record<string, Tag[]> = { ...defaultTags };
  serverTags.forEach((t) => {
    const cat =
      t.category && categoryOrder.includes(t.category) ? t.category : "Other";
    if (!categories[cat]) categories[cat] = [];
    if (!categories[cat].some((x) => x.id === t.id)) categories[cat].push(t);
  });

  const toggle = (id: string) => {
    if (value.includes(id)) onChange(value.filter((v) => v !== id));
    else onChange([...value, id]);
  };

  const createTag = async (category: string, name: string) => {
    if (!name.trim()) return;
    const trimmed = name.trim();
    // local-only creation: no API calls
    const id = `${category.toLowerCase()}-${trimmed
      .toLowerCase()
      .replace(/\s+/g, "-")}`;
    const tag: Tag = { id, name: trimmed, category };
    setServerTags((s) => (s.some((x) => x.id === tag.id) ? s : [...s, tag]));
    onChange([...value, tag.id]);
    setInputValue("");
    setModalOpen(false);
  };

  return (
    <div>
      <div className="space-y-6 bg-gray-50 p-4 rounded-xl border border-gray-200">
        {categoryOrder
          .concat(
            Object.keys(categories).filter((k) => !categoryOrder.includes(k))
          )
          .map((cat) => {
            const tags = categories[cat] || [];
            if (!tags.length) return null;
            return (
              <div key={cat} className="mb-4">
                <div className="text-sm font-semibold text-gray-600 mb-2 ">
                  {cat}
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((t) => {
                    const active = value.includes(t.id);
                    return (
                      <button
                        key={t.id}
                        onClick={() => toggle(t.id)}
                        className={`px-6 py-2.5 rounded-full text-sm shadow-sm transition-colors duration-200 ${
                          active
                            ? "bg-blue-500 text-white "
                            : "bg-white  border border-gray-300 text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {t.name}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => {
                      setModalCategory(cat);
                      setModalOpen(true);
                    }}
                    className="px-4 py-2 rounded-full text-sm border border-dashed border-gray-400 text-gray-500 hover:bg-gray-50"
                  >
                    + Add
                  </button>
                </div>
              </div>
            );
          })}
      </div>

      {/* Modal */}
      {modalOpen && modalCategory && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 bg-opacity-40 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">
              Add {modalCategory} Tag
            </h2>
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Enter ${modalCategory.slice(0, -1)} name`}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => createTag(modalCategory, inputValue)}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TagSelector;
