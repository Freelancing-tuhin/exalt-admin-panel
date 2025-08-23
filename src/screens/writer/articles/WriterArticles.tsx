import { useState, useRef, useEffect } from 'react';
import { Layout } from '../../layout/Layout'; // Assuming relative path
import Navbar from '../../../components/main/navbar/Navbar'; // Assuming relative path
import StructuredInput from '../../../components/shared/structureInput/StructureInput'; // Ensure the path is correct

export default function WriterArticles() {
  const [selectedDiasporaTags, setSelectedDiasporaTags] = useState(['Diaspora']);
  const [selectedCountryTags, setSelectedCountryTags] = useState(['India']);
  const [articleMainTitle, setArticleMainTitle] = useState('');
  const [articleDate, setArticleDate] = useState('');
  const [relevantTweetIds, setRelevantTweetIds] = useState('');
  const [articleTags, setArticleTags] = useState<string[]>([]); // New state for custom tags
  const [currentTagInput, setCurrentTagInput] = useState(''); // State for the tag input field

  // State for the main image handling
  const [mainImageUrl, setMainImageUrl] = useState('');
  const [mainImageCaption, setMainImageCaption] = useState('');
  const [mainUploadedFile, setMainUploadedFile] = useState<File | null>(null);
  const [mainLocalPreviewUrl, setMainLocalPreviewUrl] = useState<string | null>(null);
  const mainFileInputRef = useRef<HTMLInputElement>(null); // Ref for the main image file input

  // Effect to clean up the object URL for the main image
  useEffect(() => {
    return () => {
      if (mainLocalPreviewUrl) {
        URL.revokeObjectURL(mainLocalPreviewUrl);
      }
    };
  }, [mainLocalPreviewUrl]);

  const toggleTag = (setter, state, tag) => {
    setter(
      state.includes(tag) ? state.filter((t) => t !== tag) : [...state, tag]
    );
  };

  // Handler for file upload for the main image
  const handleMainImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (mainLocalPreviewUrl) {
      URL.revokeObjectURL(mainLocalPreviewUrl);
      setMainLocalPreviewUrl(null);
    }
    setMainImageUrl(''); // Clear external URL if a new file is being uploaded

    if (file) {
      setMainUploadedFile(file);
      setMainLocalPreviewUrl(URL.createObjectURL(file));
    } else {
      setMainUploadedFile(null);
    }
  };

  // Handle direct URL input for the main image
  const handleMainImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (mainUploadedFile) {
      setMainUploadedFile(null);
    }
    if (mainLocalPreviewUrl) {
      URL.revokeObjectURL(mainLocalPreviewUrl);
      setMainLocalPreviewUrl(null);
    }
    setMainImageUrl(e.target.value);
  };

  const currentMainImagePreviewSource = mainLocalPreviewUrl || mainImageUrl;

  // Handlers for custom article tags
  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentTagInput.trim() !== '') {
      e.preventDefault();
      const newTag = currentTagInput.trim();
      if (!articleTags.includes(newTag)) {
        setArticleTags([...articleTags, newTag]);
      }
      setCurrentTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setArticleTags(articleTags.filter((tag) => tag !== tagToRemove));
  };


  return (
    <Layout>
      <Navbar heading_input="Articles Editor"/>

      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 font-sans"> 
        <div className="w-full mx-auto"> 


          <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg mb-8 border border-gray-200"> 

            <div className="mb-8 pb-6 border-b border-gray-200"> 
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Article Headline
              </h2>
              <label htmlFor="article-main-title" className="block text-sm font-medium text-gray-700 sr-only"> {/* SR-only for better accessibility */}
                Main Title:
              </label>
              <input
                type="text"
                id="article-main-title"
                value={articleMainTitle}
                onChange={(e) => setArticleMainTitle(e.target.value)}
                placeholder="Enter the main title of the article here..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-150 ease-in-out text-xl font-semibold"
              />
            </div>

            <div className="mb-8 pb-8 border-b border-gray-200"> 
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Main Article Image
              </h2>
              <div
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-gray-50 hover:bg-gray-100 transition duration-200 cursor-pointer shadow-sm"
                onClick={() => mainFileInputRef.current?.click()}
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
                  Click to <span className="text-indigo-600 hover:underline">Browse</span> for Main Image
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 5MB recommended
                </p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={mainFileInputRef}
                  onChange={handleMainImageUpload}
                />
              </div>

              <div className="mt-6 space-y-3"> 
                <label htmlFor="main-image-url" className="block text-sm font-medium text-gray-700">
                  Or paste Main Image URL:
                </label>
                <input
                  type="url"
                  id="main-image-url"
                  value={mainImageUrl}
                  onChange={handleMainImageUrlChange}
                  placeholder="https://example.com/main-image.jpg"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 text-gray-800 text-sm focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-150 ease-in-out"
                />

                {currentMainImagePreviewSource && (
                  <div className="mt-4 p-3 border border-gray-200 rounded-md overflow-hidden bg-white text-center shadow-sm">
                    <img src={currentMainImagePreviewSource} alt={mainImageCaption || "Main Image Preview"} className="max-w-full h-auto mx-auto object-contain max-h-60 rounded-md" />
                    <p className="text-xs text-gray-500 mt-3 font-medium">Image Preview</p>
                  </div>
                )}

                <label htmlFor="main-image-caption" className="block text-sm font-medium text-gray-700 mt-4">
                  Caption for Main Image:
                </label>
                <input
                  type="text"
                  id="main-image-caption"
                  value={mainImageCaption}
                  onChange={(e) => setMainImageCaption(e.target.value)}
                  placeholder="A descriptive caption for the main image..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 text-gray-800 text-sm focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-150 ease-in-out"
                />
              </div>
            </div>

            <div className="mb-8 pb-8 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Categorization & Tags
              </h2>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Diaspora Group Tag:
                </label>
                <div className="flex flex-wrap gap-3">
                  {['Hindu', 'Muslim', 'Christian', 'Telugu', 'Gujarati', 'Bengali', 'General'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(setSelectedDiasporaTags, selectedDiasporaTags, tag)}
                      className={`px-5 py-2 rounded-full text-base font-medium transition duration-200 ease-in-out shadow-sm
                      ${
                        selectedDiasporaTags.includes(tag)
                          ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                          : 'bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100' 
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Country Tags:
                </label>
                <div className="flex flex-wrap gap-3">
                  {['India','US'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(setSelectedCountryTags, selectedCountryTags, tag)}
                      className={`px-5 py-2 rounded-full text-base font-medium transition duration-200 ease-in-out shadow-sm
                      ${
                        selectedCountryTags.includes(tag)
                          ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                          : 'bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100' 
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="article-custom-tags" className="block text-sm font-medium text-gray-700 mb-3">
                  Custom Article Tags:
                </label>
                <input
                  type="text"
                  id="article-custom-tags"
                  value={currentTagInput}
                  onChange={(e) => setCurrentTagInput(e.target.value)}
                  onKeyDown={handleTagInputKeyDown}
                  placeholder="Type a tag and press Enter (e.g., technology, culture)"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 text-gray-800 focus:ring-sky-500 focus:border-sky-500 shadow-sm transition duration-150 ease-in-out"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  {articleTags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-sky-100 text-sky-800 shadow-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 -mr-1 h-4 w-4 rounded-full flex items-center justify-center text-sky-600 hover:bg-sky-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                      >
                        <span className="sr-only">Remove tag {tag}</span>
                        <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-8 pb-8 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Publication Date
              </h2>
              <label htmlFor="article-date" className="block text-sm font-medium text-gray-700 mb-2">
                Date :
              </label>
              <input
                type="date"
                id="article-date"
                value={articleDate}
                onChange={(e) => setArticleDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-150 ease-in-out"
              />
            </div>

            <div className="relative mb-8 pb-8 border-b border-gray-200">
              <h2 className="font-semibold text-xl text-gray-800 mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M17 16l-4 4-4-4" />
                </svg>
                Article Content Structure
              </h2>
              <StructuredInput />
              <p className="absolute -bottom-2 right-0 text-xs text-emerald-600 italic px-2 py-1 bg-emerald-50 rounded-md inline-block shadow-sm">
                Journalist
              </p>
            </div>

            <div className="relative mb-6">
              <h2 className="font-semibold text-xl text-gray-800 mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                Relevant Tweets
              </h2>
              <textarea
                rows="4"
                value={relevantTweetIds}
                onChange={(e) => setRelevantTweetIds(e.target.value)}
                placeholder="Enter tweet IDs, separated by commas (e.g., 123456789, 987654321). These will be embedded."
                className="w-full border border-gray-300 rounded-lg p-4 bg-gray-50 text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm resize-y text-base"
              ></textarea>
              <p className="absolute -bottom-2 right-0 text-xs text-indigo-600 italic px-2 py-1 bg-indigo-50 rounded-md inline-block shadow-sm">
                Researcher
              </p>
            </div>

          <div className="mt-10 flex justify-end gap-4">
            <button className="px-8 py-3 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-50 transition duration-200 shadow-md border border-gray-300">
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
              Save Article
            </button>
          </div>
        </div>
      </div>
      </div>

    </Layout>
  );
}
