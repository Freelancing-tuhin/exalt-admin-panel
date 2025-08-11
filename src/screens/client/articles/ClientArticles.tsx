import { Layout } from "../../layout/Layout";
import Navbar from "../../../components/main/navbar/Navbar";
import { ArticleActionsPanel } from "../../../components/shared/acordition/ArticleActionsPanel";
import { useHeading } from "../../../contexts/headingContext";
import { useEffect, useState } from "react";
import { Article } from "../../../components/shared/articleSections/Article.tsx";
import { DonorOutreach } from "../../../components/shared/articleSections/DonorOutreach.tsx";
import Data from "../../../components/shared/articleSections/Data.tsx";
import { useParams } from "react-router-dom";
import data from '../../../database/articles.json'

export const ClientArticles = () => {
const { id } = useParams<{ id: string }>();
  const { setHeading } = useHeading();
  const [currentSection, setCurrentSection] = useState("Article");

  console.log(id)
  console.log(data?.[1])

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
              {data?.[id].title}
            </h1>
            <div className="flex justify-between items-center mt-6">
              <p className="text-sm  text-gray-500 font-semibold">
                {data?.[id].month} · Category: Issue
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
                className={`px-4 py-2 flex items-center text-sm font-medium rounded-full transition-all duration-200 ${
                  currentSection === label
                    ? "bg-[#5042b7] text-white shadow-md border-2 border-[#5042b7]"
                    : "text-gray-700 bg-gray-100 border-2 border-gray-300 hover:bg-gray-200 hover:border-gray-400"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {currentSection == "Article" && <Article id={id} />}
          {currentSection == "Data" && <Data />}
          {currentSection == "Donor Outreach" && <DonorOutreach />}
        </div>
        <ArticleActionsPanel />
      </div>
    </Layout>
  );
};
