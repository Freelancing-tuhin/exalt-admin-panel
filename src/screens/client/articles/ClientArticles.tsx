import { Layout } from "../../layout/Layout";
import Navbar from "../../../components/main/navbar/Navbar";
import { ArticleActionsPanel } from "../../../components/shared/acordition/ArticleActionsPanel";
import { useHeading } from "../../../contexts/headingContext";
import { useEffect } from "react";

export const ClientArticles = () => {
  const { setHeading } = useHeading();

  useEffect(() => {
    setHeading("News");
  }, [setHeading]);

  return (
    <Layout>
      <Navbar back={true} />
      <div className="flex flex-col md:flex-row">
        <div className="px-6 md:w-5/7 h-[90vh] overflow-y-auto py-4  text-sm text-gray-800 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl mt-5 font-bold">
              Vice President Kamala Harris Illuminates her Indian Ties at the
              Democratic National Convention
            </h1>
            <div className="flex justify-between items-center mt-6">
              <p className="text-sm  text-gray-500 font-semibold">
                October 20, 2023 · Category: Issue
              </p>
              <p className="text-lg text-gray-600 font-semibold">
                21 Likely Interested Donors
              </p>
            </div>
          </div>

          {/* Dropdowns */}
          <div className="flex flex-wrap justify-start gap-2">
            {[
              "EXALT Actions Menu",
              "Recommended Messages",
              "Further Readings",
            ].map((label, i) => (
              <button
                key={i}
                className=" px-3 py-1 flex items-center text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-full hover:bg-gray-200"
              >
                {label}
              </button>
            ))}
          </div>

          {/* Article Context */}
          <div className="prose prose-sm max-w-none">
            <h2 className="font-semibold text-lg mb-4">Context</h2>
            <p>
              The Democratic National Convention (DNC), held in Chicago, was a
              significant event for the Indian-American community. Vice
              President Kamala Harris took the opportunity to acknowledge her
              Indian heritage, making headlines and sparking conversations
              around the influence of Indian Americans, especially women, in
              American politics and civic engagement.
            </p>
            <p>
              Indian American officials who were also seen at the DNC included
              Congresspersons Ro Khanna and Ami Bera, as well as Illinois State
              Representative Theresa Mah. Their presence highlights the growing
              representation of Indian Americans in government and the
              importance of events like these in shaping the national narrative.
            </p>
          </div>

          {/* Quote */}
          <blockquote className="border-l-4 border-red-400  item-center py-6 bg-gray-100 pl-4 italic  text-gray-700">
            “My mother was very proud of her Indian heritage and taught us, me
            and my sister Maya, to share in the pride about our culture. India
            is the largest democracy in the world; so that is part of my
            background.” — Kamala Harris in a 2009 Interview
          </blockquote>

          {/* Analyst Take */}
          <div>
            <h2 className="font-semibold text-lg mb-4">Exalt’s Take</h2>
            <p>
              The most crucial step to take, in order to mobilize a greater
              number of Indian American Voters, is to exhibit familiarity with
              the issues they bring up as considerations when it comes to
              voting. Indian Americans’ voting choices are deeply affected by
              their perceived vulnerability as a group to hostile or inefficient
              immigration policies, hate crimes and racial discrimination, a
              rising cost of living, as well as access to healthcare.Outreach
              efforts directed at the Indian community with these considerations
              can project you as someone with their finger on the pulse of the
              diaspora’s interests.
            </p>
            <p className="mt-4">
              It is important to leverage their historic association with the
              Democratic Party to assert that it has always sought to consider
              and further their interests—and that this election is no
              exception. By bringing up policy developments in areas relevant to
              the diaspora, proposing your policies as viable alternatives to
              those offered by the Republican party, and most importantly,
              acting as an addressee of the community’s concerns, you can ensure
              that ties with members of the Indian diaspora are preserved.
            </p>
          </div>

          {/* Table */}
          <div className="overflow-auto rounded-lg border border-gray-300">
            <table className="table-auto w-full text-xs border-collapse">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="px-3 py-2 text-left">Reach 1</th>
                  <th className="px-3 py-2 text-left">Reach 2</th>
                  <th className="px-3 py-2 text-left">Reach 3</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="border-t border-gray-300">
                  <td className="px-3 py-2">Pos: 8 of 11</td>
                  <td className="px-3 py-2">Pos: 7 of 12</td>
                  <td className="px-3 py-2">Pos: 7 of 9</td>
                </tr>
                <tr className="border-t border-gray-300">
                  <td className="px-3 py-2">Pos: 8 of 11</td>
                  <td className="px-3 py-2">Pos: 7 of 12</td>
                  <td className="px-3 py-2">Pos: 7 of 9</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Suggestions */}
          <div>
            <h2 className="font-semibold text-lg mb-4">Suggestions</h2>
            <p>
              Use Kamala Harris's speech, particularly targeted towards female
              Indian-American donors. As the diaspora becomes more politically
              active every year, it's important to connect emotionally with
              stories like these. Consider including this speech link in
              follow-up messages. Also, referencing past Indian-American
              political wins could be a good motivator for further engagement
              and support.
            </p>
          </div>

          {/* Graph */}
          <div>
            <h2 className="font-semibold text-xl text-black  mb-6 ">
              Highest remittance inflow in the world, by country (2008–2023)
            </h2>
            <img
              src="https://pub.mdpi-res.com/socsci/socsci-13-00239/article_deploy/html/images/socsci-13-00239-g001.png?1714126803"
              alt="Remittance Chart"
              className="w-full max-w-2xl mx-auto"
            />
            <p className="text-xs text-gray-500 mt-1 text-center">
              Source: World Bank KNOMAD, remittance inflows (current US$)
            </p>
          </div>

          {/* Questions */}
          <div>
            <h2 className="font-semibold text-lg mb-4">
              Questions from the community
            </h2>
            <ul className="list-disc list-inside text-md">
              <li>
                How is identity politics affecting outreach to Indian American
                voters, especially within the female American diaspora?
              </li>
              <li>
                Can stories like this provide more open opportunities,
                especially for Indian American candidates?
              </li>
            </ul>
          </div>
        </div>
        <ArticleActionsPanel />
      </div>
    </Layout>
  );
};
