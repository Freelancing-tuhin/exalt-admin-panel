import { Layout } from "../../layout/Layout";
import Navbar from "../../../components/main/navbar/Navbar";
// import { Link } from "react-router-dom";
import { EventsList } from "../../../components/shared/listView/ListView";
import { useHeading } from "../../../contexts/headingContext";
import { useEffect, useState } from "react";
import articlesData from "../../../database/articles.json";
import { GradientHeader } from "../../../components/shared/gradientHeader/GradientHedaer";
import { ViralCard } from "../../../components/shared/viralCards/ViralCard";
import { DetailedListView } from "../../../components/shared/listView/DetailedListView";

export const ClientData = () => {
  const { setHeading } = useHeading();
  const [showAll, setShowAll] = useState(false);

  const articlesToShow1 = showAll ? articlesData : articlesData.slice(0, 3);
  // const articlesToShow2 = showAll ? articlesData : articlesData.slice(3, 6);
  const viralDiscussions = showAll ? articlesData : articlesData.slice(6, 8);

  useEffect(() => {
    setHeading("Data");
  }, [setHeading]);

  return (
    <Layout>
      <Navbar />
      <div className="p-6 h-[90vh] overflow-y-scroll space-y-5 mx-auto">
        {/* Viral Discussions */}
        <GradientHeader title="Data Dashboard" />
        <div className="">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">
            Viral Discussions
          </h2>
          <div className="flex flex-nowrap overflow-x-auto space-x-4 pb-4">
            {viralDiscussions.map((item, i) => (
              <ViralCard item={item} i={i} key={i} />
            ))}
          </div>
        </div>

        {/* Exalt Coverage */}
        <div className="rounded-2xl  ">
          {/* Header */}
          <h2 className="text-xl font-semibold text-gray-700 mb-3">
            Exalt Coverage
          </h2>

          {/* Content */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <DetailedListView
                heading={"What's happening in US"}
                donor={true}
                articlesToShow={articlesToShow1}
                showAll={showAll}
                setShowAll={setShowAll}
                showDonor={true}
              />
            </div>
          </div>
        </div>

        <div className="mt-8">
          {/* Header */}
          <h2 className="text-xl font-semibold text-gray-700 mb-3">
            Previously Trending
          </h2>

          {/* Content */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <EventsList
                heading={"What's happening in US"}
                donor={true}
                articlesToShow={articlesToShow1}
                showAll={showAll}
                setShowAll={setShowAll}
                showDonor={false}
              />
            </div>

            <div className="flex-1">
              <EventsList
                heading={"What's happening in India"}
                donor={true}
                articlesToShow={articlesToShow1}
                showAll={showAll}
                setShowAll={setShowAll}
                showDonor={false}
              />
            </div>
          </div>
        </div>

        {/* <EventsList
          heading={"Exalt Coverage"}
          donor={true}
          articlesToShow={articlesToShow1}
          showAll={showAll}
          setShowAll={setShowAll}
        />
        <EventsList
          heading={"Previously Trending"}
          donor={false}
          articlesToShow={articlesToShow2}
          showAll={showAll}
          setShowAll={setShowAll}
        /> */}
      </div>
    </Layout>
  );
};
