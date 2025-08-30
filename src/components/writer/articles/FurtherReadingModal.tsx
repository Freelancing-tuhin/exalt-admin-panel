import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: { title: string; url: string }) => void;
};

const FurtherReadingModal: React.FC<Props> = ({ isOpen, onClose, onAdd }) => {
  const [title, setTitle] = React.useState("");
  const [url, setUrl] = React.useState("");

  React.useEffect(() => {
    if (!isOpen) {
      setTitle("");
      setUrl("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-white rounded-xl p-4 w-full max-w-md">
        <h3 className="font-semibold mb-2">Add Further Reading</h3>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Article title"
          className="w-full p-2.5 border-1 border-gray-200 bg-gray-50 rounded-xl mb-2"
        />
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Article URL"
          className="w-full p-2.5 border-1 border-gray-200 bg-gray-50 rounded-xl mb-4"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => onClose()}
            className="px-3 py-2 border-gray-200 bg-gray-200 rounded-xl"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (!title || !url) return;
              onAdd({ title, url });
            }}
            className="px-5 py-2 border-gray-200 bg-blue-500 rounded-xl text-white"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default FurtherReadingModal;
