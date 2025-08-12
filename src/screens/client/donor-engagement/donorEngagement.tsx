import React from "react";
import { Layout } from "../../layout/Layout";

interface Article {
  id: number;
  title: string;
  date: string;
  donorCount: number;
}

const articles: Article[] = [
  { id: 1, title: "Education Funding Drive", date: "Aug 12, 2025", donorCount: 120 },
  { id: 2, title: "Medical Support Campaign", date: "Aug 10, 2025", donorCount: 95 },
  { id: 3, title: "Environmental Awareness Project", date: "Aug 8, 2025", donorCount: 75 },
];

export const DonorByArticle: React.FC = () => {
  const handleDonorsClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    console.log(`Donors for article ${id}`);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-10">
        <h1 className="text-xl font-bold mb-4">Donor By Article</h1>

        <div className="space-y-3">
          {articles.map((article) => (
            <div
              key={article.id}
              className="grid grid-cols-[2fr_1fr_auto] items-center bg-white rounded-lg p-4 shadow-sm border border-gray-200"
            >
              {/* Title & Date */}
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span>{article.title}</span>
                <span className="text-gray-500">•</span>
                <span>{article.date}</span>
              </div>

              {/* Donor Count */}
              <div className="text-sm text-gray-700">
                <span
                  className="donor-count-trigger font-medium text-blue-600 cursor-pointer hover:underline"
                  onClick={(e) => handleDonorsClick(e, article.id)}
                >
                  {article.donorCount} donors
                </span>
              </div>

              {/* Action */}
              <div className="flex justify-end">
                <button className="flex items-center gap-1 px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors shadow-sm">
                  Send Outreach
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
