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
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 p-2">
        <div className="md:col-span-5 md:h-[calc(100vh-theme(spacing.16)-theme(spacing.4))] md:overflow-y-auto">
          <SentimentChart />
        </div>
        <div className="mt-4 md:mt-0 md:col-span-2 md:h-[calc(100vh-theme(spacing.16)-theme(spacing.4))] md:overflow-y-auto">
          <ArticleActionsPanel />
        </div>
      </div>
    </Layout>
  );
};