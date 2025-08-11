import { useEffect } from "react";
import Navbar from "../../components/main/navbar/Navbar";
import { SentimentChart } from "../../components/main/sentimentChart/SentimentChart";
import { ArticleActionsPanel } from "../../components/shared/acordition/ArticleActionsPanel";
import { useHeading } from "../../contexts/headingContext";
import { Layout } from "../layout/Layout";
import { ItemLister } from "../../components/shared/itemLister/ItemLister";
import { TweeterPost } from "../../components/shared/tweeterPost/TweeterPost";
import { ReasonInput } from "../../components/shared/reasonINput/ReasonInput";

export const ViralDiscussion = () => {
  const { setHeading } = useHeading();

  useEffect(() => {
    setHeading("News");
  }, [setHeading]);

  return (
    <Layout>
      <Navbar back={true} />
      <div className="flex flex-col md:flex-row p-2 ">
        <div className="md:w-5/7 md:h-[85vh] overflow-y-scroll px-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Jane Street Fined By SEBI
              </h2>
              <p className="text-sm text-gray-500">July 7, 2025 • India News</p>
            </div>
          </div>
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
        <ArticleActionsPanel />
      </div>
    </Layout>
  );
};
