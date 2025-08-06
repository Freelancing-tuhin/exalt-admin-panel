import { useEffect } from "react";
import Navbar from "../../components/main/navbar/Navbar";
import { SentimentChart } from "../../components/main/sentimentChart/SentimentChart";
import { ArticleActionsPanel } from "../../components/shared/acordition/ArticleActionsPanel";
import { useHeading } from "../../contexts/headingContext";
import { Layout } from "../layout/Layout";

export const ViralDiscussion = () => {
  const { setHeading } = useHeading();

  useEffect(() => {
    setHeading("News");
  }, [setHeading]);

  return (
    <Layout>
      <Navbar back={true} />
      <div className="flex p-2 ">
        <div className="w-5/7 h-[85vh] overflow-y-scroll">
          <SentimentChart />
        </div>
        <ArticleActionsPanel />
      </div>
    </Layout>
  );
};
