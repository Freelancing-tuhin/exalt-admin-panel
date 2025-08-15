import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Ensure this path is correct for your project
import data from '../../../database/articles.json'; 

// Define types for articles for better type safety and clarity
interface ArticleData {
  id: number;
  context: string;
  exalt_take: string;
  // This allows for two structures: an array of strings OR an array of objects
  questions_from_community?: Array<{ question: string; answer: string } | string>;
  // Add other fields from articles.json if they are used dynamically
}

export const Article = ({ id }: { id: number }) => {
  // Use type assertion for the data structure
  const article: ArticleData | undefined = (data as ArticleData[])?.[id];
  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0); // Kept for potential future use or if animations rely on it

  // Function to toggle accordion open/close
  const toggleQuestion = (index: number) => {
    setOpenQuestionIndex(openQuestionIndex === index ? null : index);
  };

  // Effect to track scroll position (if needed for animations or dynamic elements)
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Display a fallback message if the article data is not found
  if (!article) {
    return (
      <div className="flex items-center justify-center min-h-screen p-8 font-sans">
        <p className="text-xl text-gray-700 font-semibold bg-white p-6 rounded-lg shadow-md">
          Article with ID "{id}" not found.
        </p>
      </div>
    );
  }

  return (
    // Main container with radial gradient background from the latest design
    // Changed padding from responsive px-6 md:px-12 lg:px-24 py-12 to uniform p-8
    <div
      className="min-h-screen p-8 font-sans relative overflow-x-hidden"
    >
      {/* 
        Removed Floating Navigation Dots as requested.
        The previous code block for navigation dots was here:
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 space-y-3 hidden lg:block">
          ... (dots mapping) ...
        </div> 
      */}

      {/* Main content area */}
      {/* Changed space-y-16 to space-y-8 to lessen negative space between sections */}
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Context Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }} // Trigger when 40% of the section is visible
          className="group relative bg-gradient-to-br from-white  to-amber-100 p-8 rounded-3xl"
        >
          {/* Side gradient indicator for hover */}
          <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-500 to-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-serif font-bold text-gray-900 border-b-4 border-red-500 inline-block pb-2">
              Context
            </h2>
          </div>
          <p className="text-lg leading-relaxed tracking-wide text-gray-800 font-semibold">
            {article.context}
          </p>
        </motion.section>

        {/* Quote Section */}
        <motion.section
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
          className="relative frosted-glass p-8 rounded-3xl border-l-8 border-red-400 shadow-inner"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
            </div>
            <div className="flex-1">
              <blockquote className="text-xl italic font-serif leading-relaxed text-gray-800 mb-3">
                “My mother was very proud of her Indian heritage and taught us, me
                and my sister Maya, to share in the pride about our culture. India
                is the largest democracy in the world; so that is part of my
                background.”
              </blockquote>
              <cite className="text-base text-violet-700 font-medium not-italic block text-right">
                — Kamala Harris in a 2009 Interview
              </cite>
            </div>
          </div>
        </motion.section>

        {/* Exalt’s Take Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true, amount: 0.4 }}
          className="group relative bg-gradient-to-br from-white to-indigo-100 p-8 rounded-3xl"
        >
          {/* Side gradient indicator for hover */}
          <div className="absolute -right-4 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-0 border-b-4 border-indigo-500 inline-block pb-2">
              Exalt’s Take
            </h2>
          </div>
          <p className="text-lg leading-relaxed tracking-wide text-gray-800   font-semibold">
            {article.exalt_take}
          </p>
        </motion.section>

        {/* Table Section */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
          className=" p-8 rounded-3xl bg-gradient-to-br from-white to-gray-50"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-serif font-bold text-gray-900 border-b-4 border-green-500 inline-block pb-2">
              Reach Table
            </h2>
          </div>
          
          <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm border-collapse text-gray-800">
              <thead>
                <tr className="bg-gradient-to-r from-gray-900 to-gray-800">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider">Reach 1</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider">Reach 2</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider">Reach 3</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition-colors duration-150 group">
                  <td className="px-6 py-4 text-gray-700 font-medium group-hover:text-violet-600">Pos: 8 of 11</td>
                  <td className="px-6 py-4 text-gray-700 font-medium group-hover:text-cyan-600">Pos: 7 of 12</td>
                  <td className="px-6 py-4 text-gray-700 font-medium group-hover:text-emerald-600">Pos: 7 of 9</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors duration-150 group">
                  <td className="px-6 py-4 text-gray-700 font-medium group-hover:text-violet-600">Pos: 8 of 11</td>
                  <td className="px-6 py-4 text-gray-700 font-medium group-hover:text-cyan-600">Pos: 7 of 12</td>
                  <td className="px-6 py-4 text-gray-700 font-medium group-hover:text-emerald-600">Pos: 7 of 9</td>
                </tr>
                {/* Dynamically add rows here if your article.json has table data */}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* Suggestions Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
          className=" p-8 rounded-3xl bg-gradient-to-br from-amber-50 to-red-100"
        >
          <div className="flex items-center gap-4 mb-8 ">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h2 className="text-3xl font-serif font-bold text-gray-900 border-b-4 border-orange-500 inline-block pb-2">
              Suggestions {/* Changed border-yellow-500 to border-orange-500 to match icon gradient */}
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-gray-800 font-semibold ">
            Use Kamala Harris's speech, particularly targeted towards female
            Indian-American donors. As the diaspora becomes more politically
            active every year, it's important to connect emotionally with
            stories like these. Consider including this speech link in
            follow-up messages. Also, referencing past Indian-American
            political wins could be a good motivator for further engagement
            and support.
          </p>
        </motion.section>

        {/* Chart Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
          className="bg-gradient-to-br from-white to-gray-100 p-8 rounded-3xl"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 border-b-4 border-purple-500 inline-block pb-2">
                Global Remittance Data
              </h2>
              <p className="text-gray-600 text-lg mt-2">Highest Remittance Inflow in the World (2008–2023)</p>
            </div>
          </div>
          
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <img
              src="https://pub.mdpi-res.com/socsci/socsci-13-00239/article_deploy/html/images/socsci-13-00239-g001.png?1714126803"
              alt="Remittance Chart"
              className="w-full"
            />
          </div>
          <p className="text-sm text-gray-500 mt-4 text-center bg-gray-50 px-4 py-2 rounded-lg">
            Source: World Bank KNOMAD, remittance inflows (current US$)
          </p>
        </motion.section>

        {/* Questions from the Community Section (Accordion) */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
          className=" p-8 rounded-3xl bg-gradient-to-br from-white to-gray-50"
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 border-b-4 border-red-600 inline-block pb-2">
                Questions from the Community
              </h2>
              <p className="text-gray-600 text-lg mt-2">Expert answers to your questions</p>
            </div>
          </div>
          
          <div className="space-y-6">
            {article.questions_from_community?.length ? (
              article.questions_from_community.map((q, index) => {
                // Determine if 'q' is a string or an object with question/answer properties
                const isQuestionObject = typeof q === 'object' && q !== null && 'question' in q;
                const questionText = isQuestionObject ? (q as { question: string }).question : (q as string);
                const answerText = isQuestionObject ? (q as { answer: string }).answer : "No answer provided for this question yet.";

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
                      className="w-full text-left p-6 sm:p-8 bg-gradient-to-r from-gray-50 to-transparent hover:from-violet-50 hover:to-cyan-50 rounded-2xl border bg-white hover:border-violet-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-semibold text-gray-900 group-hover:text-violet-900 transition-colors pr-6">
                          {questionText}
                        </span>
                        <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-white shadow-md border-2 border-gray-200 flex items-center justify-center transition-all duration-300 ${
                          openQuestionIndex === index 
                            ? 'border-violet-500 bg-violet-50 rotate-45 scale-110' 
                            : 'group-hover:border-violet-300 group-hover:bg-violet-50'
                        }`}>
                          <svg 
                            className={`w-6 h-6 transition-all duration-300 ${
                              openQuestionIndex === index ? 'text-violet-600' : 'text-gray-400 group-hover:text-violet-500'
                            }`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
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
                          transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                          className="overflow-hidden"
                        >
                          <div className="mt-6 p-6 sm:p-8 bg-gradient-to-br from-violet-50 via-purple-50 to-cyan-50 rounded-2xl border border-violet-200 shadow-inner">
                            <div className="flex items-start gap-6">
                              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-4">
                                  <h3 className="text-2xl font-bold text-violet-900">
                                    Expert Analysis
                                  </h3>
                                  <div className="px-3 py-1 bg-violet-200 text-violet-800 text-sm font-medium rounded-full">
                                    Verified
                                  </div>
                                </div>
                                <p className="text-lg leading-relaxed text-violet-800 font-light">
                                  {answerText} {/* This now uses the actual answer from your JSON data */}
                                </p>
                                <div className="mt-6 flex items-center gap-4 text-sm text-violet-600">
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                                    <span>Updated 2 hours ago</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
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
              // Display if no questions are available
              <div className="bg-white rounded-lg p-5 border border-gray-100 shadow-sm text-center">
                <p className="text-lg text-gray-600 py-4">
                  No questions from the community available for this article.
                </p>
              </div>
            )}
          </div>
        </motion.section>

      </div>

      {/* Floating Action Button (Scroll to Top) */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        className="fixed bottom-8 right-8 z-40"
      >
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-violet-300"
          aria-label="Scroll to top"
        >
          <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </motion.div>

      {/* Custom CSS for Frosted Glass Effect */}
      <style jsx>{`
        .frosted-glass {
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(8px);
          border-radius: 1rem; /* Tailwind's rounded-3xl is 1.5rem, adjusting here */
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
};