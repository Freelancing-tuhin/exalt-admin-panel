import React, { useState } from "react";
import { Layout } from "../../layout/Layout";
import Navbar from "../../../components/main/navbar/Navbar";
import EventCoreDetails from "../../../components/writer/events/EventCoreDetails";
import EventCategories from "../../../components/writer/events/EventCategories";
import EventLogistics from "../../../components/writer/events/EventLogistics";
import EventEditor from "../../../components/writer/events/EventEditor";

export const WriterEvent: React.FC = () => {
  // available tags
  const diasporaOptions = [
    "Hindu",
    "Muslim",
    "Christian",
    "Telugu",
    "Gujarati",
    "Bengali",
    "General",
  ];
  const importanceOptions = ["Low", "Medium", "High"];

  // state held at page level and passed down
  const [selectedDiaspora, setSelectedDiaspora] = useState<string[]>([]);
  const [selectedImportance, setSelectedImportance] = useState<string[]>([]);
  const [selectedCategoryTags, setSelectedCategoryTags] = useState<
    Record<string, string[]>
  >({});
  const [categories, setCategories] = useState<Record<string, string[]>>({
    Cultural: ["Art", "Dance", "Theatre", "Music"],
    Political: ["Dinner", "Charity Event", "Rally", "Summit"],
    Religious: ["Service", "Performance", "Festival", "Procession"],
    Other: ["Grand Opening", "Wedding", "Community Fair", "Workshop"],
  });

  const toggleDiaspora = (tag: string) => {
    setSelectedDiaspora((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const toggleImportance = (tag: string) => {
    setSelectedImportance((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const toggleCategoryTag = (category: string, tag: string) => {
    setSelectedCategoryTags((prev) => {
      const cur = prev[category] || [];
      const nextTags = cur.includes(tag)
        ? cur.filter((t) => t !== tag)
        : [...cur, tag];
      return { ...prev, [category]: nextTags };
    });
  };

  const addCategoryTag = (category: string, tag: string) => {
    setCategories((prev) => {
      const cur = prev[category] || [];
      if (cur.includes(tag) || !tag.trim()) return prev;
      return { ...prev, [category]: [...cur, tag.trim()] };
    });
    // auto-select new tag
    setSelectedCategoryTags((prev) => {
      const cur = prev[category] || [];
      return { ...prev, [category]: [...cur, tag.trim()] };
    });
  };

  return (
    <Layout>
      <Navbar />
      <div className="p-6 space-y-5 mx-auto">
        <EventCoreDetails
          diasporaOptions={diasporaOptions}
          importanceOptions={importanceOptions}
          selectedDiaspora={selectedDiaspora}
          selectedImportance={selectedImportance}
          onToggleDiaspora={toggleDiaspora}
          onToggleImportance={toggleImportance}
        />

        <EventCategories
          categories={categories}
          selectedCategoryTags={selectedCategoryTags}
          onToggleCategoryTag={toggleCategoryTag}
          onAddTag={addCategoryTag}
        />

        <EventLogistics />
        <EventEditor />
      </div>
    </Layout>
  );
};
<Navbar />;
