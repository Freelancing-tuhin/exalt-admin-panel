import { Layout } from "../../layout/Layout";
import Navbar from "../../../components/main/navbar/Navbar";

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

const exaltCoverage = [
  {
    title: "Brief Article 1",
    posts: "2,346 posts",
    donors: "12 potential donors",
  },
  {
    title: "Brief Article 2",
    posts: "2,846 posts",
    donors: "15 potential donors",
  },
  {
    title: "Brief Article 3",
    posts: "2,146 posts",
    donors: "27 potential donors",
  },
  {
    title: "Brief Article 4",
    posts: "1,386 posts",
    donors: "5 potential donors",
  },
];

const previouslyTrending = [
  { title: "JD Vance Missile", posts: "4,287 posts" },
  { title: "India Downs Pakistani Plane", posts: "1,649 posts" },
  { title: "Trump Trade Deal", posts: "3,812 posts" },
  { title: "July 23–August 5, 2024", posts: "2,647 posts" },
];

export const AdminFinalBriefs = () => {
  return (
    <Layout>
      <Navbar />
      <div className="p-6 h-[90vh] overflow-y-scroll space-y-8 mx-auto">
        {/* Viral Discussions */}
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-3">
            Viral Discussions
          </h2>
          <div className="flex gap-4 overflow-x-auto">
            {viralDiscussions.map((item, i) => (
              <div
                key={i}
                className="w-56 sm:min-w-[460px] mb-5 rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden"
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
              </div>
            ))}
          </div>
        </div>

        {/* Exalt Coverage */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">
            Exalt Coverage
          </h2>
          {exaltCoverage.map((item, i) => (
            <div
              key={i}
              className="flex justify-between text-sm text-gray-800 py-1"
            >
              <span>{item.title}</span>
              <span className="text-gray-600 text-xs">
                {item.posts} • {item.donors}
              </span>
            </div>
          ))}
          <p className="text-xs text-blue-600 mt-2 cursor-pointer">
            see more...
          </p>
        </div>

        {/* Previously Trending */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">
            Previously Trending
          </h2>
          {previouslyTrending.map((item, i) => (
            <div
              key={i}
              className="flex justify-between text-sm text-gray-800 py-1"
            >
              <span>{item.title}</span>
              <span className="text-gray-600 text-xs">{item.posts}</span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
