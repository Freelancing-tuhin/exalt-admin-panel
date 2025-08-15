/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Navbar from "../../components/main/navbar/Navbar";
import { ArticleActionsPanel } from "../../components/shared/acordition/ArticleActionsPanel";
import { useHeading } from "../../contexts/headingContext";
import { Layout } from "../layout/Layout";
import { ItemLister } from "../../components/shared/itemLister/ItemLister";
import { TweeterPost } from "../../components/shared/tweeterPost/TweeterPost";
// import { ReasonInput } from "../../components/shared/reasonINput/ReasonInput";
import { DonorOutreach } from "../../components/shared/articleSections/DonorOutreach";
import data from "../../database/articles.json";
import { useParams } from "react-router-dom";
import { Header } from "../../components/shared/header/Header";
import { IconTabs } from "../../components/shared/sectionTabs/SectionTabs";
import { MdOutlineDashboard } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
// import { MultiLevelSentimentChart } from "../../components/main/sentimentChart/Graph";
import { SentimentChart } from "../../components/main/sentimentChart/SentimentChart";

export const ViralDiscussion = () => {
  const { title } = useParams<{ title: any }>();
  const { setHeading } = useHeading();
  const [currentSection, setCurrentSection] = useState("Data");

  console.log(title);

  useEffect(() => {
    setHeading("News");
    setCurrentSection("Data");
  }, [setHeading]);

  return (
    <Layout>
      <Navbar back={true} />
      <div className="flex flex-col md:flex-row">
        <div className="md:w-5/7 md:h-[92vh] overflow-y-scroll px-5">
          <Header
            title={data?.[title - 1]?.title}
            author="By Exalt Data"
            date="Sun April 7, 2023"
            readTime="5 min"
            category={""}
          />

          <IconTabs
            tabs={[
              { label: "Data", icon: MdOutlineDashboard },
              { label: "Outreach", icon: FiUsers },
            ]}
            current={currentSection}
            onChange={setCurrentSection}
          />

          {currentSection === "Data" && (
            <div className="data">
              {/* <MultiLevelSentimentChart /> */}
              <SentimentChart />
              <ItemLister
                title="Top Emotions"
                items={["Shocked", "Surprised", "Annoyed"]}
              />
              <TweeterPost title="Top Shocked Posts" />
              {/* <ReasonInput /> */}
              <ItemLister
                title="Related Topics"
                items={[
                  "Finance • 12 potential donors",
                  "Securities • 3 potential donors",
                  "Trade • 2 potential donors",
                ]}
              />
              <TweeterPost title="Top Trade Posts" />
              <SentimentChart />
            </div>
          )}

          {currentSection === "Outreach" && (
            <div className="Outreach">
              {/* Outreach content will go here */}
              <DonorOutreach />
            </div>
          )}
        </div>
        <ArticleActionsPanel />
      </div>
    </Layout>
  );
};
