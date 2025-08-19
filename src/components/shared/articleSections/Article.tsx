/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import data from "../../../database/articles.json";

interface ArticleData {
  _id: string;
  context: string;
  exalt_take: string;
  questions_from_community?: Array<
    { question: string; answer: string } | string
  >;
  tag?: string;
  posts?: string;
  section?: string;
  graph_img_links?: string[];
}

export const Article = ({ id }: { id: number }) => {
  const article: ArticleData | undefined = (data as ArticleData[])?.[id - 1];
  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(
    null
  );
  const [, setScrollY] = useState(0);

  const heading_gradient: string = "bg-gradient-to-br bg-blue-300 to-red-300";
  const icons:boolean=false

  const toggleQuestion = (index: number) => {
    setOpenQuestionIndex(openQuestionIndex === index ? null : index);
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!article) {
    return (
      <div className="flex items-center justify-center   font-sans ">
        <p className="text-xl text-gray-700 font-semibold bg-white p-6 rounded-lg shadow-md">
          Article with ID "{id}" not found.
        </p>
      </div>
    );
  }

  return (
    <div className="p-2 rounded-xl font-sans relative bg-gray-100">
      <div className="max-w-5xl mx-auto space-y-4">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
          className="group relative bg-white p-8 rounded-xl shadow-sm border border-gray-100"
        >

          <div className="flex items-center gap-3 mb-6">
            {icons && <div
              className={`w-10 h-10 rounded-xl ${heading_gradient} flex items-center justify-center shadow-lg`}
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>}
            <h2 className="text-xl font-heading font-semibold text-gray-900 border-b-4 border-blue-800 inline-block pb-2">
              Context
            </h2>
          </div>
          <p className="text-lg leading-relaxed tracking-wide text-gray-800 font-normal">
            {" "}
            {article.context}
          </p>
        </motion.section>

        {/* <motion.section
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
          className="relative bg-white p-8 rounded-xl border-l-8 border-[#212122]/70 shadow-sm"
        >
          <div className="flex items-start gap-4">
            {icons && <div
              className={`w-12 h-12 rounded-xl  flex items-center justify-center flex-shrink-0 `}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="[#212122]"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>}
            <div className="flex-1">
              <blockquote className="text-xl font-normal leading-relaxed text-gray-800 mb-3">
                {" "}
                “My mother was very proud of her Indian heritage and taught us,
                me and my sister Maya, to share in the pride about our culture.
                India is the largest democracy in the world; so that is part of
                my background.”
              </blockquote>
            </div>
          </div>
        </motion.section> */}
        {article.graph_img_links && article.graph_img_links.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.4 }}
            className="p-8 rounded-3xl bg-white shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-4 mb-8">
              {icons && (
                <div
                  className={`w-12 h-12 rounded-2xl ${heading_gradient} flex items-center justify-center shadow-lg`}
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 12l3-3 3 3 4-4M18 10H6" // Example icon for charts/graphs
                    />
                  </svg>
                </div>
              )}
              <div>
                <h2 className="text-xl font-heading font-semibold text-gray-900 border-b-4 border-blue-800 inline-block pb-2">
                  Reference images
                </h2>
                <p className="text-gray-600 text-lg mt-2 font-medium">
                  Visual data and insights related to the article.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {article.graph_img_links.map((imgSrc, idx) => (
                <div
                  key={idx}
                  className="flex justify-center items-center w-full rounded-2xl overflow-hidden border border-gray-200 shadow-md"
                >
                  <img
                    src={imgSrc}
                    alt={`Graphical representation ${idx + 1}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          </motion.section>
        )}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true, amount: 0.4 }}
          className="group relative bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
        >
          <div className="absolute -right-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="flex items-center gap-3 mb-6">
            {icons && <div
              className={`w-10 h-10 rounded-xl ${heading_gradient} flex items-center justify-center shadow-lg`}
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>}
            <h2 className="text-xl font-heading font-semibold text-gray-900 mb-0 border-b-4 border-blue-800 inline-block pb-2">
              Exalt’s Take
            </h2>
          </div>
          <p className="text-lg leading-relaxed tracking-wide text-gray-800 font-normal">
            {" "}
            {article.exalt_take}
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
          className="p-8 rounded-3xl bg-white shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-4 mb-8 ">
            {icons &&<div
              className={`w-12 h-12 rounded-2xl ${heading_gradient} flex items-center justify-center shadow-lg`}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>}
            <h2 className="text-xl font-heading font-semibold text-gray-900 border-b-4 border-blue-800 inline-block pb-2">
              Suggestions
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-gray-800 font-normal">
            {" "}
            Use Kamala Harris's speech, particularly targeted towards female
            Indian-American donors. As the diaspora becomes more politically
            active every year, it's important to connect emotionally with
            stories like these. Consider including this speech link in follow-up
            messages. Also, referencing past Indian-American political wins
            could be a good motivator for further engagement and support.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
          className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-4 mb-8">
            {icons &&<div
              className={`w-12 h-12 rounded-2xl ${heading_gradient} flex items-center justify-center shadow-lg`}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>}
            <div>
              <h2 className="text-xl font-heading font-semibold text-gray-900 border-b-4 border-blue-800 inline-block pb-2">
                Global Remittance Data
              </h2>
              <p className="text-gray-600 text-lg mt-2 font-medium">
                Highest Remittance Inflow in the World (2008–2023)
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            {" "}
            <div className="w-full max-w-xl rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              {" "}
              <img
                src="https://pub.mdpi-res.com/socsci/socsci-13-00239/article_deploy/html/images/socsci-13-00239-g001.png?1714126803"
                alt="Remittance Chart"
                className="w-full h-auto" 
              />
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-4 text-center bg-gray-50 px-4 py-2 rounded-lg font-normal">
            {" "}
            Source: World Bank KNOMAD, remittance inflows (current US$)
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
          className="p-8 rounded-3xl bg-white shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-4 mb-10">
           {icons && <div
              className={`w-12 h-12 rounded-2xl ${heading_gradient} flex items-center justify-center shadow-lg`}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>}
            <div>
              <h2 className="text-xl font-heading font-semibold text-gray-900 border-b-4 border-blue-800 inline-block pb-2">
                Questions from the Community
              </h2>
              <p className="text-gray-600 text-lg mt-2 font-medium">
                Expert answers to your questions
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {article.questions_from_community?.length ? (
              article.questions_from_community.map((q, index) => {
                const isQuestionObject =
                  typeof q === "object" && q !== null && "question" in q;
                const questionText = isQuestionObject
                  ? (q as { question: string }).question
                  : (q as string);
                const answerText = isQuestionObject
                  ? (q as { answer: string }).answer
                  : "'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,";

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    className="group bg-white"
                  >
                    <button
                      onClick={() => toggleQuestion(index)}
                      className="w-full text-left p-3 sm:p-8 bg-gray-50 hover:bg-gray-100 rounded-2xl border border-gray-200 hover:border-blue-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-medium text-gray-900 group-hover:text-blue-800 transition-colors pr-6">
                          {questionText}
                        </span>
                        <div
                          className={`flex-shrink-0 w-10 h-10 rounded-xl bg-white shadow-md border-2 border-gray-200 flex items-center justify-center transition-all duration-300 ${
                            openQuestionIndex === index
                              ? "border-blue-800 bg-blue-100 rotate-45 scale-110"
                              : "group-hover:border-blue-300 group-hover:bg-gray-50"
                          }`}
                        >
                          <svg
                            className={`w-6 h-6 transition-all duration-300 ${
                              openQuestionIndex === index
                                ? "text-blue-800"
                                : "text-gray-400 group-hover:text-blue-700"
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                        </div>
                      </div>
                    </button>

                    <AnimatePresence>
                      {openQuestionIndex === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, scale: 0.95 }}
                          animate={{ opacity: 1, height: "auto", scale: 1 }}
                          exit={{ opacity: 0, height: 0, scale: 0.95 }}
                          transition={{
                            duration: 0.4,
                            ease: [0.04, 0.62, 0.23, 0.98],
                          }}
                          className="overflow-hidden"
                        >
                          <div className="mt-6 p-6 sm:p-8 bg-gray-50 rounded-2xl border border-gray-200 shadow-inner">
                            <div className="flex items-start gap-6">
                              <div
                                className={`w-16 h-16 rounded-2xl ${heading_gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}
                              >
                                <svg
                                  className="w-8 h-8 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-4">
                                  <h3 className="text-xl font-bold text-gray-900">
                                    Expert Analysis
                                  </h3>
                                  <div className="px-3 py-1 bg-gray-200 text-gray-800 text-sm font-medium rounded-full">
                                    Verified
                                  </div>
                                </div>
                                <p className="text-lg leading-relaxed text-gray-800 font-normal">
                                  {answerText}
                                </p>
                                <div className="mt-6 flex items-center gap-4 text-sm text-gray-600 font-normal">
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                    <span>Updated 2 hours ago</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <svg
                                      className="w-4 h-4"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </svg>
                                    <span>47 helpful votes</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <div className="bg-white rounded-lg p-5 border border-gray-100 shadow-sm text-center">
                <p className="text-lg text-gray-600 py-4 font-normal">
                  No questions from the community available for this article.
                </p>
              </div>
            )}
          </div>
        </motion.section>
      </div>
    </div>
  );
};
