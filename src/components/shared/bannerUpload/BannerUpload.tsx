import { useState } from "react";
import { Upload, FileImage, Link } from "lucide-react";

export default function BannerUploadPage() {
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const [urlInput, setUrlInput] = useState<string>("");

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setUploading(true);
      setProgress(0);

      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Fake progress bar simulation
      let percent = 0;
      const interval = setInterval(() => {
        percent += 5;
        if (percent >= 100) {
          percent = 100;
          clearInterval(interval);
          setUploading(false);
        }
        setProgress(percent);
      }, 200);
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      setBannerPreview(urlInput.trim());
      setFileName("Image from URL");
      setUploading(false);
      setProgress(100);
    }
  };

  return (
    <div className="min-h-screen flex w-96 items-start justify-center">
      <div className="w-full max-w-lg border border-gray-300 rounded-2xl p-6 bg-white shadow-sm">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Import Banner
        </h2>

        {/* Upload Box */}
        <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-blue-400 rounded-xl cursor-pointer bg-blue-50 hover:bg-blue-100 transition">
          <Upload className="w-8 h-8 text-blue-500 mb-2" />
          <span className="text-sm text-blue-600 font-medium">
            Drag & drop or click to upload
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleBannerChange}
            className="hidden"
          />
        </label>

        {/* OR Input from URL */}
        <div className="flex items-center gap-2 mt-4">
          <div className="flex items-center gap-2 flex-1 border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
            <Link className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Paste image URL..."
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="flex-1 text-sm outline-none bg-transparent"
            />
          </div>
          <button
            onClick={handleUrlSubmit}
            className="px-3 py-2 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            Load
          </button>
        </div>

        {/* File name and progress */}
        {fileName && (
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <FileImage className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">
                {fileName}
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-gray-500 mt-1 block">
              {uploading ? `Uploading... ${progress}%` : "Ready"}
            </span>
          </div>
        )}

        {/* Preview */}
        {bannerPreview && !uploading && (
          <div className="w-full mt-4">
            <img
              src={bannerPreview}
              alt="Banner Preview"
              className="w-full max-h-60 object-cover rounded-xl border border-blue-300 shadow"
            />
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition">
            Save as Draft
          </button>
          <button className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition">
            Import Banner
          </button>
        </div>
      </div>
    </div>
  );
}
