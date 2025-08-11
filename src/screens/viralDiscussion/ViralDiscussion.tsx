/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Navbar from "../../components/main/navbar/Navbar";
import { SentimentChart } from "../../components/main/sentimentChart/SentimentChart";
import { ArticleActionsPanel } from "../../components/shared/acordition/ArticleActionsPanel";
import { useHeading } from "../../contexts/headingContext";
import { Layout } from "../layout/Layout";
import { ItemLister } from "../../components/shared/itemLister/ItemLister";
import { TweeterPost } from "../../components/shared/tweeterPost/TweeterPost";
import { ReasonInput } from "../../components/shared/reasonINput/ReasonInput";
import { DonorOutreach } from "../../components/shared/articleSections/DonorOutreach";
import data from "../../database/articles.json";
import { useParams } from "react-router-dom";

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
      <div className="flex flex-col md:flex-row p-2 ">
        <div className="md:w-5/7 md:h-[85vh] overflow-y-scroll px-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl pt-6 font-semibold text-gray-900">
                {/* Jane Street Fined By SEBI */}
                {data?.[title - 1]?.title}
              </h2>
              <p className="text-sm text-gray-500">July 7, 2025 • India News</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-start gap-2 mb-6">
            {["Data", "Outreach"].map((label, i) => (
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

          {currentSection === "Data" && (
            <div className="data">
              <SentimentChart />
              <ItemLister
                title="Top Emotions"
                items={["Shocked", "Surprised", "Annoyed"]}
              />
              <TweeterPost title="Top Shocked Posts" />
              <ReasonInput />
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
