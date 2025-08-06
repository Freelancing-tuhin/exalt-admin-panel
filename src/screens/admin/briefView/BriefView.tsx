import { Layout } from "../../layout/Layout";
import Navbar from "../../../components/main/navbar/Navbar";

// Mock data for articles
const articles = [
  {
    id: 1,
    title:
      "Vice President Kamala Harris Illuminates Her Indian Ties at the Democratic National Convention",
    date: "July 26, 2025",
    donors: "12 Likely Interested Donors",
  },
  {
    id: 2,
    title:
      "Vice President Kamala Harris Illuminates Her Indian Ties at the Democratic National Convention",
    date: "July 26, 2025",
    donors: "12 Likely Interested Donors",
  },
  {
    id: 3,
    title:
      "Vice President Kamala Harris Illuminates Her Indian Ties at the Democratic National Convention",
    date: "July 26, 2025",
    donors: "12 Likely Interested Donors",
  },
  {
    id: 4,
    title:
      "Vice President Kamala Harris Illuminates Her Indian Ties at the Democratic National Convention",
    date: "July 26, 2025",
    donors: "12 Likely Interested Donors",
  },
  {
    id: 5,
    title:
      "Vice President Kamala Harris Illuminates Her Indian Ties at the Democratic National Convention",
    date: "July 26, 2025",
    donors: "12 Likely Interested Donors",
  },
  {
    id: 6,
    title:
      "Vice President Kamala Harris Illuminates Her Indian Ties at the Democratic National Convention",
    date: "July 26, 2025",
    donors: "12 Likely Interested Donors",
  },
  {
    id: 7,
    title:
      "Vice President Kamala Harris Illuminates Her Indian Ties at the Democratic National Convention",
    date: "July 26, 2025",
    donors: "12 Likely Interested Donors",
  },
  {
    id: 8,
    title:
      "Vice President Kamala Harris Illuminates Her Indian Ties at the Democratic National Convention",
    date: "July 26, 2025",
    donors: "12 Likely Interested Donors",
  },
  {
    id: 9,
    title:
      "Vice President Kamala Harris Illuminates Her Indian Ties at the Democratic National Convention",
    date: "July 26, 2025",
    donors: "12 Likely Interested Donors",
  },
];

// Mock data for discussions
const discussions = [
  {
    id: 1,
    description:
      "Vice President Kamala Harris Illuminates Her Indian Ties at the Democratic National Convention. This article goes on for multiple lines",
    link: "July 25 - July 28, 2025",
    copyLink: "12 Likely Interested Donors",
  },
  {
    id: 2,
    description:
      "Vice President Kamala Harris Illuminates Her Indian Ties at the Democratic National Convention",
    link: "July 25 - July 28, 2025",
    copyLink: "12 Likely Interested Donors",
  },
  {
    id: 3,
    description:
      "Vice President Kamala Harris Illuminates Her Indian Ties at the Democratic National Convention",
    link: "July 25 - July 28, 2025",
    copyLink: "12 Likely Interested Donors",
  },
  {
    id: 4,
    description:
      "Vice President Kamala Harris Illuminates Her Indian Ties at the Democratic National Convention",
    link: "July 25 - July 28, 2025",
    copyLink: "12 Likely Interested Donors",
  },
  {
    id: 5,
    description:
      "Vice President Kamala Harris Illuminates Her Indian Ties at the Democratic National Convention",
    link: "July 25 - July 28, 2025",
    copyLink: "12 Likely Interested Donors",
  },
  {
    id: 6,
    description:
      "Vice President Kamala Harris Illuminates Her Indian Ties at the Democratic National Convention",
    link: "July 25 - July 28, 2025",
    copyLink: "12 Likely Interested Donors",
  },
  {
    id: 7,
    description:
      "Vice President Kamala Harris Illuminates Her Indian Ties at the Democratic National Convention",
    link: "July 25 - July 28, 2025",
    copyLink: "12 Likely Interested Donors",
  },
  {
    id: 8,
    description:
      "Vice President Kamala Harris Illuminates Her Indian Ties at the Democratic National Convention",
    link: "July 25 - July 28, 2025",
    copyLink: "12 Likely Interested Donors",
  },
];

export const BriefView = () => {
  return (
    <Layout>
      <Navbar back={true} />
      <div className="body h-[90vh] overflow-y-scroll">
        <div className="max-w-6xl mx-auto p-2">
          {/* Header */}
          <div className="flex justify-between items-center mb-8 bg-white p-4 ">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Coverage July 1 - July 14
              </h1>
              <p className="text-sm text-gray-600">
                New Jersey Congressional District 1
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-semibold text-gray-800">
                  9 Articles, 12 Notable Discussions
                </p>
              </div>
            </div>
          </div>

          {/* Articles Section */}
          <div className="bg-white rounded-lg shadow-sm mb-8">
            <div className="bg-gray-100 px-6 py-3 rounded-t-lg">
              <h2 className="font-semibold text-gray-800">Articles</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Index
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Donors
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {articles.map((article) => (
                    <tr key={article.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {article.id}.
                      </td>
                      <td className="px-6 py-4 text-sm text-blue-600 hover:text-blue-800">
                        <a href="#" className="hover:underline">
                          {article.title}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {article.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {article.donors}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Discussions Section */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="bg-gray-100 px-6 py-3 rounded-t-lg">
              <h2 className="font-semibold text-gray-800">Discussions</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Index
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Link
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Copy Link
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {discussions.map((discussion) => (
                    <tr key={discussion.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {discussion.id}.
                      </td>
                      <td className="px-6 py-4 text-sm text-blue-600 hover:text-blue-800">
                        <a href="#" className="hover:underline">
                          {discussion.description}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {discussion.link}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {discussion.copyLink}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
