/* eslint-disable @typescript-eslint/no-explicit-any */
import { Layout } from "../../layout/Layout";
import Navbar from "../../../components/main/navbar/Navbar";
import { ArticleActionsPanel } from "../../../components/shared/acordition/ArticleActionsPanel";
import { useHeading } from "../../../contexts/headingContext";
import { useEffect, useState } from "react";
import { Article } from "../../../components/shared/articleSections/Article.tsx";
import { DonorOutreach } from "../../../components/shared/articleSections/DonorOutreach.tsx";
import Data from "../../../components/shared/articleSections/Data.tsx";
import { useParams } from "react-router-dom";
import data from "../../../database/articles.json";
import { IconTabs } from "../../../components/shared/sectionTabs/SectionTabs.tsx";
import { FiUsers } from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";
import { Header } from "../../../components/shared/header/Header.tsx";

export const ClientArticles = () => {
  const { id } = useParams<{ id: any }>();
  const { setHeading } = useHeading();
  const [currentSection, setCurrentSection] = useState("Article");

  const image=data?.[id - 1].image

  console.log(id);
  console.log(data?.[0]);

  useEffect(() => {
    setHeading("News");
  }, [setHeading]);

  return (
    <Layout>
      <Navbar back={true} />
      <div className="flex flex-col md:flex-row">
        <div className="px-6 md:w-5/7 h-[90vh] overflow-y-auto   text-sm text-gray-800 space-y-6">
          <Header
            title={data?.[id - 1]?.title}
            author="Exalt"
            date="Sun April 7, 2023"
            readTime="5 min"
            category={""}
          />

          <IconTabs
            tabs={[
              { label: "Article", icon: FiUsers },
              { label: "Data", icon: MdOutlineDashboard },
              { label: "Donor Outreach", icon: FiUsers },
            ]}
            current={currentSection}
            onChange={setCurrentSection}
          />

          {currentSection == "Article" && <Article id={id} />}
          {currentSection == "Data" && <Data id={id} />}
          {currentSection == "Donor Outreach" && <DonorOutreach />}
        </div>
        <ArticleActionsPanel />
      </div>
    </Layout>
  );
};
