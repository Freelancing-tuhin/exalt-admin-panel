import React from "react";

type Props = {
  categories: Record<string, string[]>;
  selectedCategoryTags: Record<string, string[]>;
  onToggleCategoryTag: (category: string, tag: string) => void;
  onAddTag: (category: string, tag: string) => void;
};

const EventCategories: React.FC<Props> = ({
  categories,
  selectedCategoryTags,
  onToggleCategoryTag,
  onAddTag,
}) => {
  return (
    <section className="bg-white p-8 rounded-2xl mb-8 border border-gray-200 relative">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-200 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-indigo-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 11H5m14 0a2 2 0 012 2v2a2 2 0 01-2 2h-5a2 2 0 01-2-2v-2a2 2 0 012-2h5zM7 3H5a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2zM7 13H5a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2z"
          />
        </svg>
        Event Categories
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {Object.entries(categories).map(([categoryTitle, tags]) => (
          <CategoryBlock
            key={categoryTitle}
            categoryTitle={categoryTitle}
            tags={tags}
            selectedTags={selectedCategoryTags[categoryTitle] || []}
            onToggleTag={(tag: string) =>
              onToggleCategoryTag(categoryTitle, tag)
            }
            onAddTag={(tag: string) => onAddTag(categoryTitle, tag)}
          />
        ))}
      </div>

      <span className="absolute top-4 right-4 text-xs italic text-indigo-500 bg-indigo-50 px-2 py-1 rounded-md inline-block shadow-sm">
        Researcher
      </span>
    </section>
  );
};

export default EventCategories;

// CategoryBlock component
const CategoryBlock: React.FC<{
  categoryTitle: string;
  tags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  onAddTag: (tag: string) => void;
}> = ({ categoryTitle, tags, selectedTags, onToggleTag, onAddTag }) => {
  const [newTag, setNewTag] = React.useState("");

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <h3 className="text-xl font-semibold text-indigo-700 mb-4 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-indigo-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
        {categoryTitle}
      </h3>
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag) => {
          const active = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => onToggleTag(tag)}
              className={`px-4 py-2 rounded-full text-sm transition duration-150 ease-in-out ${
                active
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "border-2 border-dashed border-gray-400 text-gray-600 hover:bg-gray-100"
              }`}
              style={{ backgroundClip: "padding-box" }}
            >
              {tag}
            </button>
          );
        })}
      </div>
      <div className="flex gap-2">
        <input
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          className="flex-1 border-2 border-dashed w-2/3   border-gray-200 rounded px-3 py-2"
          placeholder="Add tag"
        />
        <button
          onClick={() => {
            if (newTag.trim()) {
              onAddTag(newTag);
              setNewTag("");
            }
          }}
          className="px-4 bg-indigo-600 text-white text-xs rounded-xl"
        >
          Add
        </button>
      </div>
    </div>
  );
};
