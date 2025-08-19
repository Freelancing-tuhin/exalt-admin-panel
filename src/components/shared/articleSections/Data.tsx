/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
import { DataChart } from "../dataCharts/DataChart";
import { TweeterPost } from "../tweeterPost/TweeterPost";
import { SentimentChart } from "../../main/sentimentChart/SentimentChart";
import { ItemLister } from "../itemLister/ItemLister";
import { ReasonInput } from "../reasonINput/ReasonInput";
import data from "../../../database/articles.json";

const Data = ({ id }: { id: number }) => {
  const article: any = (data as any[])?.[id - 1];
  return (
    <div>
      <DataChart />
      <TweeterPost title="Top Tweets" tweetIds={article?.tweet_id} />
      <SentimentChart />
      <ItemLister
        title="Top Emotions"
        items={["Shocked", "Surprised", "Annoyed"]}
      />
      {/* <TweeterPost title="Top Shocked Posts" /> */}
      {/* <ReasonInput /> */}
      <ItemLister
        title="Related Topics"
        items={[
          "Finance • 12 potential donors",
          "Securities • 3 potential donors",
          "Trade • 2 potential donors",
        ]}
      />
      {/* <TweeterPost title="Top Trade Posts" /> */}
      <SentimentChart />
    </div>
  );
};

export default Data;
