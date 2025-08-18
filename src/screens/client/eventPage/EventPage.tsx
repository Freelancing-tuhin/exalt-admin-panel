import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../../../components/main/navbar/Navbar";
import { ArticleActionsPanel } from "../../../components/shared/acordition/ArticleActionsPanel";
import { Header } from "../../../components/shared/header/Header";
import { Layout } from "../../layout/Layout";
import { FiCalendar, FiCopy, FiMapPin, FiTag } from "react-icons/fi";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import eventData from "../../../database/event.json";

interface Location {
  venue: string;
  address?: string;
  city: string;
  state: string;
  zip?: string;
}

interface TargetedMessaging {
  instagram_facebook: string;
  twitter_x: string;
}

interface EventData {
  id: string;
  title: string;
  date: string;
  time: string;
  location: Location;
  description: string;
  image: string;
  tags: string[];
  cultural_sensitivities: string[];
  action_items: string[];
  targeted_messaging: TargetedMessaging;
  further_reading: string[];
}

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    alert("Link copied to clipboard!");
  } catch (err) {
    console.error(err);
    alert("Failed to copy link.");
  }
};

// Smart image mapping function
const getEventImage = (event: EventData): string => {
  if (event.image) return event.image;

  const title = event.title.toLowerCase();

  if (title.includes("janmashtami") || title.includes("krishna")) {
    return "https://www.iskconbangalore.org/wp-content/uploads/2025/05/janmashtami-thu.jpg";
  }
  if (title.includes("diwali")) {
    return "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  }
  if (
    title.includes("garba") ||
    title.includes("dandiya") ||
    title.includes("navratri")
  ) {
    return "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  }
  if (title.includes("independence") || title.includes("republic")) {
    return "https://images.unsplash.com/photo-1597149915990-4845dc23ed4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  }
  if (
    title.includes("badshah") ||
    title.includes("concert") ||
    title.includes("music")
  ) {
    return "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  }
  if (title.includes("fair") || title.includes("mela")) {
    return "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  }

  // Default fallback
  return "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
};

export default function EventPage() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEventData = () => {
      try {
        const foundEvent = eventData.find((e) => e.id === id);
        setEvent(foundEvent || null);
        setLoading(false);
      } catch (error) {
        console.error("Error loading event data:", error);
        setLoading(false);
      }
    };

    loadEventData();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <Navbar back={true} />
        <div className="flex items-center justify-center h-[92vh]">
          <div className="text-lg text-gray-600">Loading event...</div>
        </div>
      </Layout>
    );
  }

  if (!event) {
    return (
      <Layout>
        <Navbar back={true} />
        <div className="flex items-center justify-center h-[92vh]">
          <div className="text-lg text-gray-600">Event not found</div>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <Navbar back={true} />
      <div className="flex flex-col md:flex-row h-[92vh]">
        {/* Left: Full-height Image */}

        {/* Right: Scrollable Content */}
        <div className="md:w-5/7  overflow-y-scroll  px-6 flex flex-col space-y-6 hidescroll">
          <Header
            title={event.title}
            author="Exalt Data"
            date={event.date}
            readTime="5 min"
            category={event.tags.join(", ")}
          />
          <div className="h-96  relative flex-shrink-0">
            <img
              src={getEventImage(event)}
              alt="Event Graphic"
              className="w-full h-full object-cover object-center rounded-3xl shadow-lg"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-r-3xl"
              aria-hidden="true"
            />
          </div>
          {/* Event Description */}
          <div className="bg-gray-100 p-4 rounded-2xl space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Event Description
            </h2>
            <p className="bg-white  p-4 rounded-lg text-gray-700 font-medium text-sm md:text-base">
              {event.description}
            </p>
          </div>

          {/* Event Details */}
          <div className="bg-gray-100 p-4 rounded-2xl space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Event Details
            </h2>

            <div className="bg-white p-4 rounded-lg space-y-4">
              {/* Date & Time */}
              <div className="flex items-start space-x-3">
                <FiCalendar className="text-gray-600 mt-1" size={18} />
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-medium text-gray-500">
                    Date & Time
                  </span>
                  <span className="text-gray-700">{event.date}</span>
                  <span className="text-gray-700">{event.time}</span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start space-x-3">
                <FiMapPin className="text-gray-600 mt-1" size={18} />
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-medium text-gray-500">
                    Location
                  </span>
                  <span className="text-gray-700 font-medium">
                    {event.location.venue}
                  </span>
                  {event.location.address && (
                    <span className="text-gray-600">
                      {event.location.address}
                    </span>
                  )}
                  <span className="text-gray-600">
                    {event.location.city}, {event.location.state}{" "}
                    {event.location.zip}
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex items-start space-x-3">
                <FiTag className="text-gray-600 mt-1" size={18} />
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-medium text-gray-500">
                    Tags
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cultural Sensitivities */}
          <div className="bg-gray-100 p-4 rounded-2xl space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Cultural Sensitivities
            </h2>
            <ul className="bg-white  p-4 rounded-lg list-disc list-inside text-gray-700 text-sm md:text-base space-y-1">
              {event.cultural_sensitivities.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Social Media Content */}
          {event.targeted_messaging && (
            <div className="bg-gray-100 p-4 rounded-2xl space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Social Media Content
              </h2>
              <div className="space-y-4">
                {/* Instagram/Facebook Card */}
                {event.targeted_messaging.instagram_facebook && (
                  <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-purple-300 transition-all duration-200">
                    <div className="flex items-start space-x-3">
                      <div className="flex space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <FaInstagram className="w-5 h-5 text-white" />
                        </div>
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                          <FaFacebook className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-gray-800">
                            Instagram / Facebook
                          </h3>
                          <button
                            onClick={() =>
                              copyToClipboard(
                                event.targeted_messaging.instagram_facebook
                              )
                            }
                            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all"
                            title="Copy content"
                          >
                            <FiCopy size={16} />
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {event.targeted_messaging.instagram_facebook}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Twitter/X Card */}
                {event.targeted_messaging.twitter_x && (
                  <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-200">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                        <FaXTwitter className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-gray-800">
                            X (Twitter)
                          </h3>
                          <button
                            onClick={() =>
                              copyToClipboard(
                                event.targeted_messaging.twitter_x
                              )
                            }
                            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all"
                            title="Copy content"
                          >
                            <FiCopy size={16} />
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {event.targeted_messaging.twitter_x}
                        </p>
                        <div className="mt-2 text-xs text-gray-500">
                          {event.targeted_messaging.twitter_x.length} characters
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* External Resources */}
          {event.further_reading.length > 0 && (
            <div className="bg-gray-100 rounded-2xl p-4 space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">
                External Resources
              </h2>
              <div className="overflow-x-auto bg-white rounded-xl">
                <table className="min-w-full table-auto border-separate border-spacing-y-2">
                  <thead>
                    <tr className="text-xs text-gray-500 uppercase font-semibold border-b border-gray-200">
                      <th className="p-3">Copy</th>
                      <th className="p-3">#</th>
                      <th className="p-3 text-left">Description</th>
                      <th className="p-3 text-left">Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {event.further_reading.map((resource, idx) => (
                      <tr
                        key={idx}
                        className="bg-gray-50 hover:bg-gray-100 transition-all"
                      >
                        <td className="p-3 text-center">
                          <button
                            onClick={() => copyToClipboard(`${resource}`)}
                            className="p-2 rounded-lg text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-all"
                          >
                            <FiCopy size={18} />
                          </button>
                        </td>
                        <td className="p-3 text-center font-medium">
                          {idx + 1}
                        </td>
                        <td className="p-3 text-gray-700">{resource}</td>
                        <td className="p-3 text-blue-600 hover:underline">
                          <a
                            href={`#`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Learn More
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Actions Panel */}
        <ArticleActionsPanel data={event} />
      </div>
    </Layout>
  );
}
