/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useImperativeHandle,
} from "react";
interface ContentItem {
  id: number;
  type: "point" | "paragraph" | "image" | "graph";
  text?: string;
  url?: string;
  caption?: string;
  graphTitle?: string;
  graphDataJson?: string;
}

interface Subsection {
  id: number;
  title: string;
  content: ContentItem[];
}

interface Section {
  id: number;
  heading: string;
  subsections: Subsection[];
}

const StructuredInput = React.forwardRef(function StructuredInput(
  { content: _content, setContent }: any,
  ref: React.Ref<any>
): React.ReactElement {
  const [sections, setSections] = useState<Section[]>([]);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const [exportedHtml, setExportedHtml] = useState<string>("");

  const addSection = (): void => {
    setSections([
      ...sections,
      { id: Date.now(), heading: "", subsections: [] },
    ]);
  };

  const deleteSection = (id: number): void => {
    if (
      window.confirm(
        "Are you sure you want to delete this section and all its content?"
      )
    ) {
      setSections(sections.filter((section) => section.id !== id));
    }
  };

  const updateSectionHeading = (id: number, value: string): void => {
    const updated = sections.map((section) =>
      section.id === id ? { ...section, heading: value } : section
    );
    setSections(updated);
  };

  const addSubsection = (sectionId: number): void => {
    const updated = sections.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            subsections: [
              ...section.subsections,
              { id: Date.now(), title: "", content: [] },
            ],
          }
        : section
    );
    setSections(updated);
  };

  const deleteSubsection = (sectionId: number, subId: number): void => {
    if (
      window.confirm(
        "Are you sure you want to delete this subsection and its content?"
      )
    ) {
      const updated = sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              subsections: section.subsections.filter(
                (sub) => sub.id !== subId
              ),
            }
          : section
      );
      setSections(updated);
    }
  };

  const updateSubsectionTitle = (
    sectionId: number,
    subId: number,
    value: string
  ): void => {
    const updated = sections.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            subsections: section.subsections.map((sub) =>
              sub.id === subId ? { ...sub, title: value } : sub
            ),
          }
        : section
    );
    setSections(updated);
  };

  const addContentItem = (
    sectionId: number,
    subId: number,
    type: "point" | "paragraph" | "image" | "graph"
  ): void => {
    const newItem: ContentItem = { id: Date.now(), type };
    if (type === "point" || type === "paragraph") {
      newItem.text = "";
    } else if (type === "image") {
      newItem.url = "";
      newItem.caption = "";
    } else if (type === "graph") {
      newItem.graphTitle = "";
      newItem.graphDataJson = "";
    }

    const updated = sections.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            subsections: section.subsections.map((sub) =>
              sub.id === subId
                ? { ...sub, content: [...sub.content, newItem] }
                : sub
            ),
          }
        : section
    );
    setSections(updated);
  };

  const deleteContentItem = (
    sectionId: number,
    subId: number,
    contentId: number
  ): void => {
    if (window.confirm("Are you sure you want to delete this content item?")) {
      const updated = sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              subsections: section.subsections.map((sub) =>
                sub.id === subId
                  ? {
                      ...sub,
                      content: sub.content.filter(
                        (item) => item.id !== contentId
                      ),
                    }
                  : sub
              ),
            }
          : section
      );
      setSections(updated);
    }
  };

  const updateContentItem = (
    sectionId: number,
    subId: number,
    contentId: number,
    field: keyof ContentItem,
    value: string
  ): void => {
    const updated = sections.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            subsections: section.subsections.map((sub) =>
              sub.id === subId
                ? {
                    ...sub,
                    content: sub.content.map((item) =>
                      item.id === contentId ? { ...item, [field]: value } : item
                    ),
                  }
                : sub
            ),
          }
        : section
    );
    setSections(updated);
  };

  const handleImageUpload = (
    sectionId: number,
    subId: number,
    contentId: number,
    file: File | null
  ) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          updateContentItem(
            sectionId,
            subId,
            contentId,
            "url",
            reader.result as string
          );
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // (Removed unused helper getStructuredOutput)

  // escape html to avoid breaking the output
  const escapeHtml = (unsafe: string) =>
    unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const generateHtml = useCallback((): string => {
    let html = "";

    sections.forEach((section, sIdx) => {
      const secNum = sIdx + 1;
      if (section.heading) {
        html += `<h2 id="${secNum}">${secNum}. ${escapeHtml(
          section.heading
        )}</h2>\n`;
      }

      section.subsections.forEach((sub, subIdx) => {
        const subNum = `${secNum}.${subIdx + 1}`;
        if (sub.title) {
          html += `<h3 id="${subNum}">${subNum} ${escapeHtml(
            sub.title
          )}</h3>\n`;
        }

        // iterate content in order, grouping points into lists
        let pendingPoints: string[] = [];

        const flushPoints = () => {
          if (pendingPoints.length) {
            html += "<ul>\n";
            pendingPoints.forEach((pt) => {
              html += `<li>${escapeHtml(pt)}</li>\n`;
            });
            html += "</ul>\n";
            pendingPoints = [];
          }
        };

        sub.content.forEach((item) => {
          if (item.type === "point") {
            if (item.text) pendingPoints.push(item.text);
          } else if (item.type === "paragraph") {
            flushPoints();
            if (item.text) html += `<p>${escapeHtml(item.text)}</p>\n`;
          } else if (item.type === "image") {
            flushPoints();
            if (item.url) {
              const alt = escapeHtml(item.caption || "");
              html += `<p><img src="${escapeHtml(
                item.url
              )}" alt="${alt}" /></p>\n`;
            }
          } else if (item.type === "graph") {
            flushPoints();
            const title = escapeHtml(item.graphTitle || "");
            const data = escapeHtml(item.graphDataJson || "");
            html += `<div class="graph">`;
            if (title) html += `<h4>${title}</h4>`;
            if (data) html += `<pre>${data}</pre>`;
            html += `</div>\n`;
          }
        });

        // flush any remaining points
        flushPoints();
      });
    });

    return html;
  }, [sections]);

  // expose imperative API to parent so it can request current HTML
  useImperativeHandle(ref, () => ({
    getHtml: () => generateHtml(),
  }));

  // keep parent content in sync in realtime
  useEffect(() => {
    const html = generateHtml();
    setExportedHtml(html);
    try {
      if (typeof setContent === "function") setContent(html);
    } catch {
      // ignore if parent did not pass setContent
    }
  }, [generateHtml, setContent]);

  // if parent passed initial content HTML, reflect it in exportedHtml
  useEffect(() => {
    if (typeof _content === "string" && _content !== exportedHtml) {
      setExportedHtml(_content);
    }
  }, [_content, exportedHtml]);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6">
      {sections.length === 0 && (
        <p className="text-gray-500 italic mb-4 p-4 bg-gray-50 rounded-md border border-dashed border-gray-200 text-center">
          Start building your content by adding a new section below.
        </p>
      )}

      {sections.map((section, secIndex) => (
        <div
          key={section.id}
          className="mb-8 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm relative group"
        >
          {/* Section Header */}
          <div className="flex items-center gap-2 mb-3">
            <input
              type="text"
              value={section.heading}
              onChange={(e) => updateSectionHeading(section.id, e.target.value)}
              placeholder={`Section ${
                secIndex + 1
              } Heading (e.g., Introduction, History)`}
              className="flex-grow min-w-0 border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
            <button
              onClick={() => deleteSection(section.id)}
              className="text-red-500 hover:text-red-700 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Delete section"
              title="Delete Section"
              type="button"
            >
              ✕
            </button>
          </div>

          {/* Subsections */}
          {section.subsections.map((sub, subIndex) => (
            <div
              key={sub.id}
              className="ml-6 mt-4 p-3 bg-white border border-gray-100 rounded-md shadow-sm relative group/subsection"
            >
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={sub.title}
                  onChange={(e) =>
                    updateSubsectionTitle(section.id, sub.id, e.target.value)
                  }
                  placeholder={`Subsection ${
                    subIndex + 1
                  } Title (e.g., Key Features, Benefits)`}
                  className="flex-grow min-w-0 border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                />
                <button
                  onClick={() => deleteSubsection(section.id, sub.id)}
                  className="text-red-400 hover:text-red-600 p-1 rounded-full opacity-0 group-hover/subsection:opacity-100 transition-opacity duration-200"
                  aria-label="Delete subsection"
                  title="Delete Subsection"
                  type="button"
                >
                  ✕
                </button>
              </div>

              {/* Content items */}
              {sub.content.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-2 ml-4 mb-3 p-2 bg-gray-50 rounded-md group/content-item border border-gray-100"
                >
                  {item.type === "point" && (
                    <>
                      <span className="text-gray-500 text-sm mt-2">•</span>
                      <input
                        type="text"
                        value={item.text || ""}
                        onChange={(e) =>
                          updateContentItem(
                            section.id,
                            sub.id,
                            item.id,
                            "text",
                            e.target.value
                          )
                        }
                        placeholder="Add a concise point here..."
                        className="flex-grow min-w-0 border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                    </>
                  )}
                  {item.type === "paragraph" && (
                    <>
                      <span className="text-gray-500 text-sm mt-2">¶</span>
                      <textarea
                        value={item.text || ""}
                        onChange={(e) =>
                          updateContentItem(
                            section.id,
                            sub.id,
                            item.id,
                            "text",
                            e.target.value
                          )
                        }
                        placeholder="Write a paragraph here for detailed information..."
                        className="flex-grow w-full min-w-0 border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:ring-green-500 focus:border-green-500 text-sm resize-y"
                      />
                    </>
                  )}
                  {item.type === "image" && (
                    <div className="flex-grow space-y-2">
                      <label className="block text-xs font-medium text-gray-600">
                        Image Source:
                      </label>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="file"
                          accept="image/*"
                          ref={(el) => {
                            fileInputRefs.current[
                              `${section.id}-${sub.id}-${item.id}`
                            ] = el;
                          }}
                          style={{ display: "none" }}
                          onChange={(e) =>
                            handleImageUpload(
                              section.id,
                              sub.id,
                              item.id,
                              e.target.files ? e.target.files[0] : null
                            )
                          }
                        />
                        <button
                          type="button"
                          onClick={() =>
                            fileInputRefs.current[
                              `${section.id}-${sub.id}-${item.id}`
                            ]?.click()
                          }
                          className="flex-shrink-0 px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-md flex items-center justify-center gap-1 transition-colors duration-200 shadow-sm"
                        >
                          Upload Image
                        </button>
                        <input
                          type="url"
                          value={item.url || ""}
                          onChange={(e) =>
                            updateContentItem(
                              section.id,
                              sub.id,
                              item.id,
                              "url",
                              e.target.value
                            )
                          }
                          placeholder="Or paste image URL here"
                          className="flex-grow border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                      </div>

                      {item.url && (
                        <div className="mt-2 p-2 border border-gray-200 rounded-md overflow-hidden bg-white text-center">
                          <img
                            src={item.url}
                            alt={item.caption || "Image preview"}
                            className="max-w-full h-auto mx-auto object-contain max-h-60"
                          />
                          <p className="text-xs text-gray-500 mt-2">
                            Image Preview
                          </p>
                        </div>
                      )}
                      <label className="block text-xs font-medium text-gray-600 mt-2">
                        Caption:
                      </label>
                      <input
                        type="text"
                        value={item.caption || ""}
                        onChange={(e) =>
                          updateContentItem(
                            section.id,
                            sub.id,
                            item.id,
                            "caption",
                            e.target.value
                          )
                        }
                        placeholder="Add a caption for the image"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                    </div>
                  )}
                  {item.type === "graph" && (
                    <div className="flex-grow space-y-2">
                      <label className="block text-xs font-medium text-gray-600">
                        Graph Title:
                      </label>
                      <input
                        type="text"
                        value={item.graphTitle || ""}
                        onChange={(e) =>
                          updateContentItem(
                            section.id,
                            sub.id,
                            item.id,
                            "graphTitle",
                            e.target.value
                          )
                        }
                        placeholder="Title for your graph"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:ring-purple-500 focus:border-purple-500 text-sm"
                      />
                      <label className="block text-xs font-medium text-gray-600 mt-2">
                        Graph Data (JSON):
                      </label>
                      <textarea
                        rows={5}
                        value={item.graphDataJson || ""}
                        onChange={(e) =>
                          updateContentItem(
                            section.id,
                            sub.id,
                            item.id,
                            "graphDataJson",
                            e.target.value
                          )
                        }
                        placeholder='Paste your graph data in JSON format, e.g., {"labels": ["Jan", "Feb"], "datasets": [{"data": [10, 20]}]}'
                        className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:ring-purple-500 focus:border-purple-500 text-sm resize-y font-mono"
                      ></textarea>
                      {item.graphDataJson && (
                        <p className="text-xs text-gray-500 italic mt-1">
                          (Data preview/rendering would be handled by a
                          dedicated graph component)
                        </p>
                      )}
                    </div>
                  )}

                  <button
                    onClick={() =>
                      deleteContentItem(section.id, sub.id, item.id)
                    }
                    className="text-red-300 hover:text-red-500 p-1 rounded-full opacity-0 group-hover/content-item:opacity-100 transition-opacity duration-200 mt-1"
                    aria-label="Delete content item"
                    title="Delete Item"
                    type="button"
                  >
                    ✕
                  </button>
                </div>
              ))}

              {/* Add Content Buttons */}
              <div className="flex flex-wrap gap-2 mt-3 ml-4">
                <button
                  onClick={() => addContentItem(section.id, sub.id, "point")}
                  className="px-4 py-2 text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md border border-blue-200 flex items-center gap-1 transition-colors duration-200"
                  type="button"
                >
                  + Add Point
                </button>
                <button
                  onClick={() =>
                    addContentItem(section.id, sub.id, "paragraph")
                  }
                  className="px-4 py-2 text-sm bg-green-50 hover:bg-green-100 text-green-700 rounded-md border border-green-200 flex items-center gap-1 transition-colors duration-200"
                  type="button"
                >
                  + Add Paragraph
                </button>
                <button
                  onClick={() => addContentItem(section.id, sub.id, "image")}
                  className="px-4 py-2 text-sm bg-yellow-50 hover:bg-yellow-100 text-yellow-700 rounded-md border border-yellow-200 flex items-center gap-1 transition-colors duration-200"
                  type="button"
                >
                  + Add Image
                </button>
                <button
                  onClick={() => addContentItem(section.id, sub.id, "graph")}
                  className="px-4 py-2 text-sm bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-md border border-purple-200 flex items-center gap-1 transition-colors duration-200"
                  type="button"
                >
                  + Add Graph
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={() => addSubsection(section.id)}
            className="mt-4 ml-6 px-4 py-2 text-sm bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded-md border border-indigo-300 flex items-center gap-1 transition-colors duration-200"
            type="button"
          >
            + Add Subsection
          </button>
        </div>
      ))}

      <button
        onClick={addSection}
        className="mt-6 w-full px-6 py-3 text-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md flex items-center justify-center gap-2 transition-colors duration-200"
        type="button"
      >
        + Add New Section
      </button>
    </div>
  );
});

export default StructuredInput;
