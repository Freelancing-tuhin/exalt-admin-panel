/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import database from "../../../database/articles.json";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Target,
  MessageSquare,
  Twitter,
  FileText,
  Send,
  BookOpen,
  CheckCircle,
  AlertCircle,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { ActionCard } from "./actionCard/ActionCard";

// Dynamic section generator based on article data
const generateSidebarSections = (articleData: any) => {
  if (!articleData) {
    return [];
  }

  const sections = [
    {
      id: "exalt-actions",
      label: "EXALT Actions Menu",
      content: `Strategic actions for "${articleData.title}" - ${articleData.tag} focused outreach.`,
      icon: Target,
      tools: [],
    },
    {
      id: "recommended-messages",
      label: "Recommended Messages",
      content: `Messaging templates for ${articleData.title} - leverage this ${articleData.tag} topic for outreach.`,
      icon: MessageSquare,
      tools: [
        {
          name: "Twitter API",
          icon: Twitter,
          action: "Tweet Template",
          platform: "social",
          endpoint: "https://api.twitter.com/2",
          description: `Share insights about ${articleData.tag} on Twitter`,
        },

        {
          name: "Email Templates",
          icon: FileText,
          action: "Message Draft",
          platform: "templates",
          endpoint: "/api/templates",
          description: `Email templates for ${articleData.tag} outreach`,
        },
        {
          name: "Twilio SMS",
          icon: Send,
          action: "Text Outreach",
          platform: "sms",
          endpoint: "https://api.twilio.com/2010-04-01",
          description: `SMS campaign about ${articleData.tag}`,
        },
      ],
    },
    {
      id: "further-readings",
      label: "Further Readings",
      content: `Related articles and resources about ${articleData.tag} and similar topics.`,
      icon: BookOpen,
      tools: generateRelatedArticles(articleData),
    },
  ];

  // Add community questions section if available

  return sections;
};

// Generate related articles based on tag and context
// Generate related articles based on tag and context
const generateRelatedArticles = (articleData: any) => {
  const baseArticles = [
    {
      name: `Understanding ${articleData.tag} Impact`,
      description: `Deep dive into ${articleData.tag} policies and their community effects.`,
      url: "#",
    },
    {
      name: `${articleData.tag} Outreach Strategies`,
      description: `Effective campaign strategies for ${articleData.tag} related issues.`,
      url: "#",
    },
    {
      name: `Community Response to ${articleData.tag}`,
      description: `How Indian-American communities are responding to ${articleData.tag} developments.`,
      url: "#",
    },
    {
      name: `Policy Analysis: ${articleData.tag}`,
      description: `Detailed policy breakdown and implications for the community.`,
      url: "#",
    },
  ];

  // If further_reading exists, map them to real articles from database
  if (
    Array.isArray(articleData.further_reading) &&
    articleData.further_reading.length > 0
  ) {
    return articleData.further_reading.map((title: string) => {
      const foundArticle = database.find(
        (e: any) => e.title.toLowerCase() === title.toLowerCase()
      );

      return {
        name: title,
        url: foundArticle ? `/articles/${foundArticle._id}` : "#",
      };
    });
  }

  return baseArticles;
};

export const ArticleActionsPanel = ({ data }: any) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [executingTool, setExecutingTool] = useState<string | null>(null);
  const [connectionStatus] = useState<Record<string, string>>({});
  const [notifications, setNotifications] = useState<any[]>([]);

  // console.log("======>page data", data);

  // Generate dynamic sections based on article data
  const sidebarSections = generateSidebarSections(data);

  useEffect(() => {
    // const checkConnections = async () => {
    //   const statuses: any = {};
    //   for (const section of sidebarSections) {
    //     for (const tool of section.tools) {
    //       statuses[tool.name] =
    //         Math.random() > 0.3 ? "connected" : "disconnected";
    //     }
    //   }
    //   setConnectionStatus(statuses);
    // };
    // if (sidebarSections.length > 0) {
    //   checkConnections();
    // }
    console.log("=====>", data);
  }, [sidebarSections]);

  const sidebarVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const contentVariants: any = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const handleSectionToggle = (sectionId: any) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  const handleToolAction = async (tool: any) => {
    setExecutingTool(tool.name);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Dynamic responses based on article data and tool type
      const generateResponse = (toolName: string) => {
        const articleTitle = data?.title || "article";
        const articleTag = data?.tag || "topic";

        const responses: any = {
          "Gmail API": {
            success: true,
            message: `Email campaign about "${articleTitle}" queued for ${Math.floor(
              Math.random() * 500 + 100
            )} recipients`,
          },
          "Twitter API": {
            success: true,
            message: `Tweet about ${articleTag} scheduled for optimal engagement`,
          },

          "Email Templates": {
            success: true,
            message: `${articleTag} email template generated successfully`,
          },
          "Twilio SMS": {
            success: true,
            message: `SMS campaign about ${articleTag} sent to ${Math.floor(
              Math.random() * 1000 + 500
            )} supporters`,
          },
        };

        return (
          responses[toolName] || {
            success: true,
            message: `${tool.action} completed successfully for ${articleTag}`,
          }
        );
      };

      const response: any = generateResponse(tool.name);

      setNotifications((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: response.success ? "success" : "error",
          message: response.message,
          tool: tool.name,
        },
      ]);

      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== Date.now()));
      }, 5000);
    } finally {
      setExecutingTool(null);
    }
  };

  const getStatusIcon = (toolName: any) => {
    const status = connectionStatus[toolName];
    if (status === "connected")
      return <CheckCircle className="w-3 h-3 text-green-500" />;
    if (status === "disconnected")
      return <AlertCircle className="w-3 h-3 text-red-500" />;
    return <Loader2 className="w-3 h-3 text-gray-400 animate-spin" />;
  };

  return (
    <div className="flex w-2/7 h-[92vh]">
      <motion.div
        className="w-full bg-white border-l border-gray-200 shadow-lg flex flex-col relative"
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                EXALT Command Center
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {data
                  ? `Campaign tools for: ${data.tag}`
                  : "Campaign management tools"}
              </p>
              {data && (
                <p className="text-xs text-gray-400 mt-1 truncate max-w-xs">
                  {data.title}
                </p>
              )}
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-600 font-medium">Live</span>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <AnimatePresence>
          {notifications.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-20 left-4 right-4 z-50"
            >
              {notifications.slice(-1).map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg shadow-lg border ${
                    notification.type === "success"
                      ? "bg-green-50 border-green-200 text-green-800"
                      : "bg-red-50 border-red-200 text-red-800"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {notification.type === "success" ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <AlertCircle className="w-4 h-4" />
                    )}
                    <span className="text-sm font-medium">
                      {notification.message}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sections */}
        <div className="flex-1 overflow-y-auto hidescroll">
          {sidebarSections.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <p className="text-sm">No article data available.</p>
              <p className="text-xs mt-1">
                Please select an article to view campaign options.
              </p>
            </div>
          ) : (
            sidebarSections.map((section: any) => {
              const IconComponent = section.icon;

              return (
                <motion.div
                  key={section.id}
                  variants={sectionVariants}
                  className="border-b border-gray-100 last:border-b-0"
                >
                  {/* Section Header */}
                  <motion.button
                    onClick={() => handleSectionToggle(section.id)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                    whileHover={{ backgroundColor: "rgba(249, 250, 251, 1)" }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex items-center space-x-3">
                      <IconComponent className="w-5 h-5 text-blue-600" />
                      <div className="text-left">
                        <h3 className="font-medium text-gray-800 text-sm">
                          {section.label}
                        </h3>
                      </div>
                    </div>
                    <motion.div
                      animate={{
                        rotate: activeSection === section.id ? 90 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </motion.div>
                  </motion.button>

                  {/* Section Content */}
                  <AnimatePresence>
                    {activeSection === section.id && (
                      <motion.div
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="overflow-hidden"
                      >
                        {/* Description */}
                        <div
                          className={`px-6 py-3 ${
                            section.id === "exalt-actions"
                              ? "bg-gradient-to-r from-red-50 to-orange-50"
                              : section.id === "further-readings"
                              ? "bg-gradient-to-r from-green-50 to-emerald-50"
                              : "bg-gray-50"
                          }`}
                        >
                          <p className="text-xs text-gray-600 leading-relaxed">
                            {section.content}
                          </p>
                        </div>

                        {/* Tools / Articles */}
                        <div className="px-4 py-4 space-y-2">
                          {section.id === "exalt-actions" ? (
                            <ActionCard data={data} />
                          ) : section.id === "further-readings" ? (
                            <div className="space-y-2">
                              {section.tools.map((article: any) => (
                                <a
                                  href={article.url}
                                  key={article.name}
                                  // initial={{ opacity: 0, x: -10 }}
                                  // animate={{ opacity: 1, x: 0 }}
                                  className="p-3 rounded-lg border border-gray-200 hover:border-green-300 bg-green-50 transition-all flex justify-between items-center"
                                >
                                  <div className="flex-1">
                                    <h4 className="font-medium text-sm text-gray-800">
                                      {article.name}
                                      {article.url}
                                    </h4>
                                    <p className="text-xs text-gray-600 mt-1">
                                      {article.description}
                                    </p>
                                  </div>
                                  {/* <ExternalLink className="w-4 h-4 text-gray-400 hover:text-green-600" /> */}
                                </a>
                              ))}
                            </div>
                          ) : (
                            section.tools.map((tool: any, toolIndex: any) => {
                              const ToolIcon = tool.icon;
                              const isExecuting = executingTool === tool.name;
                              return (
                                <motion.button
                                  key={tool.name}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: toolIndex * 0.05 }}
                                  whileHover={{
                                    scale: 1.02,
                                    backgroundColor: "rgba(59, 130, 246, 0.05)",
                                  }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => handleToolAction(tool)}
                                  onMouseEnter={() => setHoveredTool(tool.name)}
                                  onMouseLeave={() => setHoveredTool(null)}
                                  disabled={isExecuting}
                                  className="w-full p-3 rounded-lg border border-gray-200 hover:border-blue-200 transition-all duration-200 text-left group disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <div className="flex items-start justify-between">
                                    <div className="flex items-start space-x-3">
                                      <div className="relative">
                                        {isExecuting ? (
                                          <Loader2
                                            className={`w-5 h-5 animate-spin ${
                                              section.id === "exalt-actions"
                                                ? "text-red-600"
                                                : section.id ===
                                                  "further-readings"
                                                ? "text-green-600"
                                                : "text-blue-600"
                                            }`}
                                          />
                                        ) : (
                                          <ToolIcon
                                            className={`w-5 h-5 text-gray-600 transition-colors ${
                                              section.id === "exalt-actions"
                                                ? "group-hover:text-red-600"
                                                : section.id ===
                                                  "further-readings"
                                                ? "group-hover:text-green-600"
                                                : "group-hover:text-blue-600"
                                            }`}
                                          />
                                        )}
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex items-center space-x-2">
                                          <h4
                                            className={`font-medium text-gray-800 text-sm transition-colors ${
                                              section.id === "exalt-actions"
                                                ? "group-hover:text-red-600"
                                                : section.id ===
                                                  "further-readings"
                                                ? "group-hover:text-green-600"
                                                : "group-hover:text-blue-600"
                                            }`}
                                          >
                                            {tool.name}
                                          </h4>
                                          {getStatusIcon(tool.name)}
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">
                                          {tool.description}
                                        </p>
                                        <p className="text-xs text-blue-600 mt-1 group-hover:text-blue-700">
                                          {isExecuting
                                            ? "Executing..."
                                            : tool.action}
                                        </p>
                                      </div>
                                    </div>
                                    <motion.div
                                      animate={{
                                        x: hoveredTool === tool.name ? 2 : 0,
                                        opacity:
                                          hoveredTool === tool.name ? 1 : 0.5,
                                      }}
                                      transition={{ duration: 0.2 }}
                                    >
                                      <ExternalLink
                                        className={`w-4 h-4 text-gray-400 transition-colors ${
                                          section.id === "exalt-actions"
                                            ? "group-hover:text-red-500"
                                            : section.id === "further-readings"
                                            ? "group-hover:text-green-500"
                                            : "group-hover:text-blue-500"
                                        }`}
                                      />
                                    </motion.div>
                                  </div>

                                  <div className="mt-3 flex items-center justify-between">
                                    <span
                                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium transition-colors ${
                                        section.id === "exalt-actions"
                                          ? "bg-red-100 text-red-600 group-hover:bg-red-200 group-hover:text-red-700"
                                          : section.id === "further-readings"
                                          ? "bg-green-100 text-green-600 group-hover:bg-green-200 group-hover:text-green-700"
                                          : "bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-700"
                                      }`}
                                    >
                                      {tool.platform}
                                    </span>
                                    <span className="text-xs text-gray-400 font-mono">
                                      {
                                        tool.endpoint
                                          .replace("https://", "")
                                          .split("/")[0]
                                      }
                                    </span>
                                  </div>
                                </motion.button>
                              );
                            })
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <motion.div
          className="px-6 py-4 border-t border-gray-100 bg-gray-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-2">
              <span>API Status:</span>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span className="text-green-600">Connected</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Real-time</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
