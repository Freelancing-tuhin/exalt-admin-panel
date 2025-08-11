import { Layout } from "../../layout/Layout";
import Navbar from "../../../components/main/navbar/Navbar";
import { ArticleActionsPanel } from "../../../components/shared/acordition/ArticleActionsPanel";
import { useHeading } from "../../../contexts/headingContext";
import { useEffect, useState } from "react";
import { Article } from "../../../components/shared/articleSections/Article.tsx";
import { DonorOutreach } from "../../../components/shared/articleSections/DonorOutreach.tsx";
import Data from "../../../components/shared/articleSections/Data.tsx";

export const ClientArticles = () => {
  const { setHeading } = useHeading();
  const [currentSection, setCurrentSection] = useState("Donor Outreach");

  useEffect(() => {
    setHeading("News");
  }, [setHeading]);

  return (
    <Layout>
      <Navbar back={true} />
      <div className="flex flex-col md:flex-row">
        <div className="px-6 md:w-5/7 h-[90vh] overflow-y-auto py-4  text-sm text-gray-800 space-y-6">
          <div>
            <h1 className="text-2xl mt-5 font-bold">
              Vice President Kamala Harris Illuminates her Indian Ties at the
              Democratic National Convention
            </h1>
            <div className="flex justify-between items-center mt-6">
              <p className="text-sm  text-gray-500 font-semibold">
                October 20, 2023 · Category: Issue
              </p>
              <p className="text-lg text-gray-600 font-semibold">
                21 Likely Interested Donors
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-start gap-2">
            {["Article", "Data", "Donor Outreach"].map((label, i) => (
              <button
                key={i}
                onClick={() => setCurrentSection(label)}
                className=" px-3 py-1 flex items-center text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-full hover:bg-gray-200"
              >
                {label}
              </button>
            ))}
          </div>

          {currentSection == "Article" && <Article />}
          {currentSection == "Data" && <Data />}
          {currentSection == "Donor Outreach" && <DonorOutreach />}
        </div>
        <ArticleActionsPanel />
      </div>
    </Layout>
  );
};
