import { Layout } from "../../layout/Layout";
import Navbar from "../../../components/main/navbar/Navbar";
// import { Link } from "react-router-dom";
import { EventsList } from "../../../components/shared/listView/ListView";
import { useHeading } from "../../../contexts/headingContext";
import { useEffect, useState } from "react";
import articlesData from "../../../database/articles.json";
import { GradientHeader } from "../../../components/shared/gradientHeader/GradientHedaer";
import { ViralCard } from "../../../components/shared/viralCards/ViralCard";

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
      <div className="p-6 h-[90vh] overflow-y-scroll space-y-8 mx-auto">
        {/* Viral Discussions */}
        <GradientHeader title="Data Dashboard" />
        <div>
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
        <div className="rounded-2xl bg-gray-100 p-4 space-y-4 shadow-sm">
  {/* Header */}
  <p className="text-2xl sm:text-3xl font-bold text-gray-800 px-4 py-2 rounded-lg bg-white shadow-inner">
    Exalt Coverage
  </p>

  {/* Content */}
  <div className="flex flex-col md:flex-row gap-4">
    <div className="flex-1">
      <EventsList
        heading={"What's happening in US"}
        donor={true}
        articlesToShow={articlesToShow1}
        showAll={showAll}
        setShowAll={setShowAll}
        showDonor={true}
      />
    </div>

    <div className="flex-1">
      <EventsList
        heading={"What's happening in India"}
        donor={true}
        articlesToShow={articlesToShow1}
        showAll={showAll}
        setShowAll={setShowAll}
        showDonor={true}
      />
    </div>
  </div>
</div>


                <div className="rounded-2xl bg-gray-100 p-4 space-y-4 shadow-sm">
  {/* Header */}
  <p className="text-2xl sm:text-3xl font-bold text-gray-800 px-4 py-2 rounded-lg bg-white shadow-inner">
    Previously Trending
  </p>

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
