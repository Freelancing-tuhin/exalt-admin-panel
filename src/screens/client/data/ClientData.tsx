import { Layout } from "../../layout/Layout";
import Navbar from "../../../components/main/navbar/Navbar";
import { Link } from "react-router-dom";
import { EventsList } from "../../../components/shared/listView/ListView";
import { useHeading } from "../../../contexts/headingContext";
import { useEffect, useState } from "react";
import articlesData from "../../../database/articles.json";

const viralDiscussions = [
  {
    title: "Jane Street Banned",
    posts: "3,485 posts",
    image:
      "https://framerusercontent.com/images/YeGE3q3PZFkrrtdNS7tuHmXYQA.png",
    tag: "New",
  },
  {
    title: "Indian Gov Orders Accounts Blocked",
    posts: "2,681 posts",
    image: "https://framerusercontent.com/images/BgWdNPKo6h8sRciVOBId71J2Q.png",
  },
];

export const ClientData = () => {
  const { setHeading } = useHeading();
  const [showAll, setShowAll] = useState(false);

  const articlesToShow1 = showAll ? articlesData : articlesData.slice(0, 3);
  const articlesToShow2 = showAll ? articlesData : articlesData.slice(3, 6);

  useEffect(() => {
    setHeading("Data");
  }, [setHeading]);

  return (
    <Layout>
      <Navbar />
      <div className="p-6 h-[90vh] overflow-y-scroll space-y-8 mx-auto">
        {/* Viral Discussions */}
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-3">
            Viral Discussions
          </h2>
          <div className="flex flex-nowrap overflow-x-auto space-x-4 pb-4">
            {viralDiscussions.map((item, i) => (
              <Link
                to={`/client/data/viral-discussions/${item?.title}`}
                key={i}
                className="flex-none w-96 sm:w-[360px] lg:w-[360px] mb-5 rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-28 object-cover"
                />
                <div className="p-3 space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="text-md  font-medium text-gray-800">
                      {item.title}
                    </div>
                    {item.tag && (
                      <span className="text-[10px] bg-green-700 text-green-50 font-medium px-1.5 py-0.5 rounded">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {item.posts}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Exalt Coverage */}

        <EventsList
          heading={"Exalt Coverage"}
          donor={true}
          articlesToShow={articlesToShow1}
        />
        {/* Previously Trending */}
        <EventsList
          heading={"Previously Trending"}
          donor={false}
          articlesToShow={articlesToShow2}
        />
      </div>
    </Layout>
  );
};
