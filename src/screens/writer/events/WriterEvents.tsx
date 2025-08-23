import { useState, useRef, useEffect } from 'react';
import { Layout } from '../../layout/Layout';
import Navbar from '../../../components/main/navbar/Navbar';
import StructuredInput from '../../../components/shared/structureInput/StructureInput'; // Ensure the path is correct

export default function WriterEvents() {
  const [eventName, setEventName] = useState(''); // State for Event Name
  const [selectedDiasporaTags, setSelectedDiasporaTags] = useState([]);
  const [selectedImportanceTags, setSelectedImportanceTags] = useState([]);
  const [selectedCategoryTags, setSelectedCategoryTags] = useState({}); // For nested tags
  const [eventDate, setEventDate] = useState('');
  const [journalistResponder, setJournalistResponder] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [viralPostsLink, setViralPostsLink] = useState('');
  const [mediaCaption, setMediaCaption] = useState(''); // State for media caption in sidebar

  // State for media handling in the sidebar
  const [sidebarMediaUrl, setSidebarMediaUrl] = useState(''); // For external URLs or URLs from backend
  const [sidebarUploadedFile, setSidebarUploadedFile] = useState<File | null>(null); // For the actual file object
  const [sidebarLocalPreviewUrl, setSidebarLocalPreviewUrl] = useState<string | null>(null); // For temporary client-side preview
  const sidebarFileInputRef = useRef<HTMLInputElement>(null); // Ref for the media file input in sidebar

  // Effect to clean up the object URL when the component unmounts or the local preview changes
  useEffect(() => {
    return () => {
      if (sidebarLocalPreviewUrl) {
        URL.revokeObjectURL(sidebarLocalPreviewUrl);
      }
    };
  }, [sidebarLocalPreviewUrl]);

  const toggleTag = (setter, state, tag) => {
    setter(
      state.includes(tag) ? state.filter((t) => t !== tag) : [...state, tag]
    );
  };

  const toggleCategoryTag = (categoryTitle, tag) => {
    setSelectedCategoryTags((prev) => {
      const currentCategoryTags = prev[categoryTitle] || [];
      const updatedCategoryTags = currentCategoryTags.includes(tag)
        ? currentCategoryTags.filter((t) => t !== tag)
        : [...currentCategoryTags, tag];

      return {
        ...prev,
        [categoryTitle]: updatedCategoryTags,
      };
    });
  };

  // Handler for file upload in the Media/Graphics section (sidebar)
  const handleSidebarMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    // Clean up previous local preview if exists
    if (sidebarLocalPreviewUrl) {
      URL.revokeObjectURL(sidebarLocalPreviewUrl);
      setSidebarLocalPreviewUrl(null);
    }
    // Clear external URL if a new file is being uploaded
    setSidebarMediaUrl('');

    if (file) {
      setSidebarUploadedFile(file);
      setSidebarLocalPreviewUrl(URL.createObjectURL(file));
    } else {
      setSidebarUploadedFile(null);
    }
  };

  // Handle direct URL input for media in the sidebar
  const handleSidebarMediaUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Clear any uploaded file and its local preview if a URL is entered
    if (sidebarUploadedFile) {
      setSidebarUploadedFile(null);
    }
    if (sidebarLocalPreviewUrl) {
      URL.revokeObjectURL(sidebarLocalPreviewUrl);
      setSidebarLocalPreviewUrl(null);
    }
    setSidebarMediaUrl(e.target.value);
  };

  const currentSidebarPreviewSource = sidebarLocalPreviewUrl || sidebarMediaUrl;

  return (
    <Layout>
      <Navbar heading_input="Event Editor" />

      {/* Applied font-sans to the main content div for a professional system font stack */}
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 font-sans"> 
        <div className="w-full mx-auto"> 
      

          {/* Event Core Details */}
          <section className="bg-white p-8 rounded-2xl shadow-lg mb-8 border border-gray-100 relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-200 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Event Core Details
            </h2>
            <div className="mb-6">
              <label
                htmlFor="event-name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Event Name:
              </label>
              <input
                type="text"
                id="event-name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="Enter event name, e.g., 'Diwali Cultural Fest 2025'"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-150 ease-in-out text-lg"
              />
            </div>

            {/* Diaspora Tags */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Diaspora Group Tag:
              </label>
              <div className="flex flex-wrap gap-3">
                {['Hindu', 'Muslim', 'Christian', 'Telugu', 'Gujarati', 'Bengali', 'General'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() =>
                      toggleTag(setSelectedDiasporaTags, selectedDiasporaTags, tag)
                    }
                    className={`px-5 py-2 rounded-full text-base font-medium transition duration-200 ease-in-out shadow-sm
                      ${
                        selectedDiasporaTags.includes(tag)
                          ? 'bg-indigo-600 text-white hover:bg-indigo-700' // Active state
                          : 'bg-gray-200 text-gray-800 border border-gray-300 hover:bg-gray-300' // Inactive state using gray-200
                      }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Importance Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Importance / Priority:
              </label>
              <div className="flex flex-wrap gap-3">
                {['Low', 'Medium', 'High'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() =>
                      toggleTag(
                        setSelectedImportanceTags,
                        selectedImportanceTags,
                        tag
                      )
                    }
                    className={`px-5 py-2 rounded-full text-base font-medium transition duration-200 ease-in-out shadow-sm
                      ${
                        selectedImportanceTags.includes(tag)
                          ? 'bg-purple-600 text-white hover:bg-purple-700' // Active state
                          : 'bg-gray-200 text-gray-800 border border-gray-300 hover:bg-gray-300' // Inactive state using gray-200
                      }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <span className="absolute top-4 right-4 text-xs italic text-indigo-500 bg-indigo-50 px-2 py-1 rounded-md inline-block shadow-sm">
              Researcher
            </span>
          </section>

          {/* Event Categories */}
          <section className="bg-white p-8 rounded-2xl shadow-lg mb-8 border border-gray-100 relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-200 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v2a2 2 0 01-2 2h-5a2 2 0 01-2-2v-2a2 2 0 012-2h5zM7 3H5a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2zM7 13H5a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2z" />
              </svg>
              Event Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: 'Cultural', tags: ['Art', 'Dance', 'Theatre', 'Music'] },
                { title: 'Political', tags: ['Dinner', 'Charity Event', 'Rally', 'Summit'] },
                { title: 'Religious', tags: ['Service', 'Performance', 'Festival', 'Procession'] },
                { title: 'Other', tags: ['Grand Opening', 'Wedding', 'Community Fair', 'Workshop'] },
              ].map((category) => (
                <div key={category.title} className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-semibold text-indigo-700 mb-4 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-indigo-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleCategoryTag(category.title, tag)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition duration-200 ease-in-out shadow-sm
                          ${
                            (selectedCategoryTags[category.title] || []).includes(tag)
                              ? 'bg-blue-600 text-white hover:bg-blue-700' // Active state
                              : 'bg-gray-200 text-gray-700 border border-gray-300 hover:bg-gray-300' // Inactive state using gray-200
                          }`}
                      >
                        {tag}
                      </button>
                    ))}
                    <button className="px-4 py-2 rounded-full text-sm border border-dashed border-gray-400 text-gray-600 hover:bg-gray-100 transition duration-200 flex items-center gap-1 shadow-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Create New
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <span className="absolute top-4 right-4 text-xs italic text-indigo-500 bg-indigo-50 px-2 py-1 rounded-md inline-block shadow-sm">
              Researcher
            </span>
          </section>

          {/* Event Logistics */}
          <section className="bg-white p-8 rounded-2xl shadow-lg mb-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-200 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M17 16l-4 4-4-4" />
              </svg>
              Event Logistics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label
                  htmlFor="event-date"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Date:
                </label>
                <input
                  type="date"
                  id="event-date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-150 ease-in-out"
                />
              </div>
              <div>
                <label
                  htmlFor="journalist-responder"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Journalist + Responder:
                </label>
                <input
                  type="text"
                  id="journalist-responder"
                  value={journalistResponder}
                  onChange={(e) => setJournalistResponder(e.target.value)}
                  placeholder="Assign journalist"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-150 ease-in-out"
                />
              </div>
              <div>
                <label
                  htmlFor="event-location"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Location:
                </label>
                <input
                  type="text"
                  id="event-location"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  placeholder="e.g., San Jose, CA"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-150 ease-in-out"
                />
              </div>
            </div>
          </section>

          {/* Content & Media Section - Retaining original two-column layout */}
          <section className="flex flex-col lg:flex-row gap-8">
            {/* Content Structure Box - Left Column */}
            <div className=" lg:w-2/3 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-200 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M17 16l-4 4-4-4" />
                </svg>
                Event Content Structure
              </h2>

              <StructuredInput />
              <p className="text-xs text-emerald-600 italic mt-3 px-2 py-1 bg-emerald-50 rounded-md inline-block shadow-sm">
                Journalists
              </p>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <label
                  htmlFor="viral-posts-link"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Link to Viral Posts / Social Media:
                </label>
                <input
                  type="url"
                  id="viral-posts-link"
                  value={viralPostsLink}
                  onChange={(e) => setViralPostsLink(e.target.value)}
                  placeholder="https://example.com/viral-post-or-collection"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-150 ease-in-out"
                />
              </div>
            </div>

            {/* Media & Talking Points Section - Right Column Sidebar */}
            <div className="lg:w-1/3 flex flex-col space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-200 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Media & Talking Points
                </h2>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Media / Graphics:
                </label>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-gray-50 hover:bg-gray-100 transition duration-200 cursor-pointer shadow-sm"
                  onClick={() => sidebarFileInputRef.current?.click()}
                >
                  <svg
                    className="w-12 h-12 text-gray-400 mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="text-base text-gray-600 font-medium mb-1">
                    Click to <span className="text-indigo-600 hover:underline">Browse</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    JPG, PNG, GIF, MP4 up to 10MB
                  </p>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    ref={sidebarFileInputRef}
                    onChange={handleSidebarMediaUpload}
                  />
                </div>

                <div className="mt-4 space-y-2">
                  <label htmlFor="sidebar-media-url" className="block text-sm font-medium text-gray-700">
                    Or paste media URL:
                  </label>
                  <input
                    type="url"
                    id="sidebar-media-url"
                    value={sidebarMediaUrl}
                    onChange={handleSidebarMediaUrlChange}
                    placeholder="https://example.com/media.jpg"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 text-gray-800 text-sm focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-150 ease-in-out"
                  />

                  {currentSidebarPreviewSource && (
                    <div className="mt-2 p-3 border border-gray-200 rounded-md overflow-hidden bg-white text-center shadow-sm">
                      {currentSidebarPreviewSource.match(/\.(jpeg|jpg|gif|png|webp)$/i) ? (
                        <img src={currentSidebarPreviewSource} alt={mediaCaption || "Media preview"} className="max-w-full h-auto mx-auto object-contain max-h-60 rounded-md" />
                      ) : currentSidebarPreviewSource.match(/\.(mp4|webm|ogg)$/i) ? (
                        <video controls src={currentSidebarPreviewSource} className="max-w-full h-auto mx-auto max-h-60 rounded-md">
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <p className="text-sm text-gray-500">Cannot preview this media type directly. URL: {currentSidebarPreviewSource}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-3 font-medium">Media Preview</p>
                    </div>
                  )}

                  <label htmlFor="media-caption" className="block text-sm font-medium text-gray-700 mt-4">
                    Caption:
                  </label>
                  <input
                    type="text"
                    id="media-caption"
                    value={mediaCaption}
                    onChange={(e) => setMediaCaption(e.target.value)}
                    placeholder="Add a caption for the media..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 text-gray-800 text-sm focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-150 ease-in-out"
                  />
                </div>
                <p className="text-xs text-indigo-600 italic mt-3 px-2 py-1 bg-indigo-50 rounded-md inline-block shadow-sm">
                  UI/UX Design Graphics
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-200 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  Talking Points
                </h2>
                <label className="block text-sm font-medium text-gray-700 mb-2 sr-only"> {/* SR-only for accessibility */}
                  Talking Points Summary:
                </label>
                <textarea
                  rows="7"
                  placeholder="Summarize key messages, important details, or discussion points for the event. What should stand out?"
                  className="w-full border border-gray-300 rounded-lg p-4 bg-gray-50 text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm resize-y text-base"
                ></textarea>
                <p className="text-xs text-indigo-600 italic mt-3 px-2 py-1 bg-indigo-50 rounded-md inline-block shadow-sm">
                  Account Manager + Researchers
                </p>
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="mt-10 flex justify-end gap-4">
            <button className="px-8 py-3 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-100 transition duration-200 shadow-md border border-gray-300">
              Cancel
            </button>
            <button className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200 shadow-lg flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Save Event
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}