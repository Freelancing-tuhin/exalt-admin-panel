import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronDown,
  Target,
  Users,
  Mail,
  Database,
  BarChart3,
  MessageSquare,
  Twitter,
  Linkedin,
  FileText,
  Send,
  BookOpen,
  Search,
  Download,
  Bookmark,
  Share2,
  CheckCircle,
  AlertCircle,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { ActionCard } from "./actionCard/ActionCard";

const sidebarSections = [
  {
    id: "exalt-actions",
    label: "EXALT Actions Menu",
    content: "Here are some donor targeting strategies and messaging examples.",
    icon: Target,
    tools: [
      {
        name: "Gmail API",
        icon: Mail,
        action: "Send Donor Outreach",
        platform: "email",
        endpoint: "https://gmail.googleapis.com/gmail/v1",
        description: "Automated donor email campaigns",
      },
    ],
  },
  {
    id: "recommended-messages",
    label: "Recommended Messages",
    content: "Use Kamala Harris's speech as an anchor for outreach messaging.",
    icon: MessageSquare,
    tools: [
      {
        name: "Twitter API",
        icon: Twitter,
        action: "Tweet Template",
        platform: "social",
        endpoint: "https://api.twitter.com/2",
        description: "Automated social media posting",
      },
      {
        name: "LinkedIn API",
        icon: Linkedin,
        action: "Professional Post",
        platform: "social",
        endpoint: "https://api.linkedin.com/v2",
        description: "Professional network outreach",
      },
      {
        name: "Email Templates",
        icon: FileText,
        action: "Message Draft",
        platform: "templates",
        endpoint: "/api/templates",
        description: "Pre-built message templates",
      },
      {
        name: "Twilio SMS",
        icon: Send,
        action: "Text Outreach",
        platform: "sms",
        endpoint: "https://api.twilio.com/2010-04-01",
        description: "Bulk SMS campaigns",
      },
    ],
  },
  {
    id: "further-readings",
    label: "Further Readings",
    content: "See articles related to Indian-American political engagement.",
    icon: BookOpen,
    tools: [
      {
        name: "Research Hub",
        icon: Search,
        action: "Access Articles",
        platform: "research",
        endpoint: "/api/research",
        description: "Curated political research",
      },
      {
        name: "PDF Generator",
        icon: Download,
        action: "Download Resources",
        platform: "documents",
        endpoint: "/api/documents/generate",
        description: "Generate campaign materials",
      },
      {
        name: "Bookmark Manager",
        icon: Bookmark,
        action: "Save for Later",
        platform: "storage",
        endpoint: "/api/bookmarks",
        description: "Save important resources",
      },
      {
        name: "Team Collaboration",
        icon: Share2,
        action: "Send to Team",
        platform: "collaboration",
        endpoint: "/api/collaboration/share",
        description: "Share with team members",
      },
    ],
  },
];

export const ArticleActionsPanel = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [executingTool, setExecutingTool] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<
    Record<string, string>
  >({});
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    // Simulate API connection checks
    const checkConnections = async () => {
      const statuses = {};
      for (const section of sidebarSections) {
        for (const tool of section.tools) {
          // Simulate connection check
          statuses[tool.name] =
            Math.random() > 0.3 ? "connected" : "disconnected";
        }
      }
      setConnectionStatus(statuses);
    };

    checkConnections();
  }, []);

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
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const contentVariants = {
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

  const handleSectionToggle = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  const handleToolAction = async (tool) => {
    setExecutingTool(tool.name);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate different responses based on tool
      const responses = {
        "Gmail API": {
          success: true,
          message: "5 donor emails queued for sending",
        },
        Mailchimp: {
          success: true,
          message: "Campaign created: 'Q4 Fundraising Drive'",
        },
        "NationBuilder CRM": {
          success: true,
          message: "2,847 donor records exported",
        },
        "Twitter API": {
          success: true,
          message: "Tweet scheduled for optimal engagement",
        },
        "LinkedIn API": {
          success: true,
          message: "Post shared to professional network",
        },
        "Twilio SMS": {
          success: true,
          message: "SMS campaign sent to 1,245 supporters",
        },
        "Research Hub": {
          success: true,
          message: "15 new articles found on Indian-American engagement",
        },
        "PDF Generator": {
          success: true,
          message: "Campaign brief generated and ready for download",
        },
      };

      const response = responses[tool.name] || {
        success: true,
        message: `${tool.action} completed successfully`,
      };

      setNotifications((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: response.success ? "success" : "error",
          message: response.message,
          tool: tool.name,
        },
      ]);

      // Remove notification after 5 seconds
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== Date.now()));
      }, 5000);
    } catch (error) {
      setNotifications((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: "error",
          message: `Failed to execute ${tool.action}`,
          tool: tool.name,
        },
      ]);
    } finally {
      setExecutingTool(null);
    }
  };

  const getStatusIcon = (toolName) => {
    const status = connectionStatus[toolName];
    if (status === "connected") {
      return <CheckCircle className="w-3 h-3 text-green-500" />;
    } else if (status === "disconnected") {
      return <AlertCircle className="w-3 h-3 text-red-500" />;
    }
    return <Loader2 className="w-3 h-3 text-gray-400 animate-spin" />;
  };

  return (
    <div className="flex w-2/7 h-[92vh]">
      <motion.div
        className=" w-full bg-white border-l border-gray-200 shadow-lg flex flex-col relative"
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
                Campaign management tools
              </p>
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
          {sidebarSections.map((section, index) => {
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
                    animate={{ rotate: activeSection === section.id ? 90 : 0 }}
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

                      {/* Tools Grid */}
                      <div className="px-4 py-4 space-y-2">
                        {section.tools.map((tool, toolIndex) => {
                          // Conditional rendering for EXALT Actions Menu as grid
                          if (section.id === "exalt-actions") {
                            return (
                              <>
                                <ActionCard />
                              </>
                            );
                          }
                          // Default rendering for other sections
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
                                            : section.id === "further-readings"
                                            ? "text-green-600"
                                            : "text-blue-600"
                                        }`}
                                      />
                                    ) : (
                                      <ToolIcon
                                        className={`w-5 h-5 text-gray-600 transition-colors ${
                                          section.id === "exalt-actions"
                                            ? "group-hover:text-red-600"
                                            : section.id === "further-readings"
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
                                            : section.id === "further-readings"
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

                              {/* Platform indicator */}
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
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
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
                <span className="text-green-600">
                  {
                    Object.values(connectionStatus).filter(
                      (s) => s === "connected"
                    ).length
                  }{" "}
                  Connected
                </span>
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
