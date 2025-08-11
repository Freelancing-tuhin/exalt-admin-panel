// import React from "react";
import { DataChart } from "../dataCharts/DataChart";
import { TweeterPost } from "../tweeterPost/TweeterPost";
import { SentimentChart } from "../../main/sentimentChart/SentimentChart";
import { ItemLister } from "../itemLister/ItemLister";
import { ReasonInput } from "../reasonINput/ReasonInput";

const Data = () => {
  return (
    <div>
      <DataChart />
      <TweeterPost title="Top Tweets" />
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
  );
};

export default Data;
