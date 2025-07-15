/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

// Define types for your space
type Space = any;

// Define the context type
type BookmarkContextType = {
  bookmarkedIds: string[];
  bookmarkedSpaces: Space[];
  isBookmarked: (id: string) => boolean;
  toggleBookmark: (space: Space) => void;
  addBookmark: (space: Space) => void;
  removeBookmark: (id: string) => void;
};

// Create the context with default values
const BookmarkContext = createContext<BookmarkContextType>({
  bookmarkedIds: [],
  bookmarkedSpaces: [],
  isBookmarked: () => false,
  toggleBookmark: () => {},
  addBookmark: () => {},
  removeBookmark: () => {},
});

// LocalStorage keys
const LOCAL_STORAGE_IDS_KEY = "bookmarkedIds";
const LOCAL_STORAGE_SPACES_KEY = "bookmarkedSpaces";

// Provider component
export const BookmarkProvider = ({ children }: { children: ReactNode }) => {
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [bookmarkedSpaces, setBookmarkedSpaces] = useState<Space[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on initial render
  useEffect(() => {
    try {
      const storedIds = localStorage.getItem(LOCAL_STORAGE_IDS_KEY);
      const storedSpaces = localStorage.getItem(LOCAL_STORAGE_SPACES_KEY);

      if (storedIds) {
        setBookmarkedIds(JSON.parse(storedIds));
      }
      if (storedSpaces) {
        setBookmarkedSpaces(JSON.parse(storedSpaces));
      }
    } catch (error) {
      console.error("Failed to parse bookmarks from localStorage", error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save to localStorage whenever bookmarks change
  useEffect(() => {
    if (!isInitialized) return;

    try {
      localStorage.setItem(
        LOCAL_STORAGE_IDS_KEY,
        JSON.stringify(bookmarkedIds)
      );
      localStorage.setItem(
        LOCAL_STORAGE_SPACES_KEY,
        JSON.stringify(bookmarkedSpaces)
      );
    } catch (error) {
      console.error("Failed to save bookmarks to localStorage", error);
    }
  }, [bookmarkedIds, bookmarkedSpaces, isInitialized]);

  // Check if a space is bookmarked by ID
  const isBookmarked = (id: string) => {
    return bookmarkedIds.includes(id);
  };

  // Add a space to bookmarks
  const addBookmark = (space: Space) => {
    if (!isBookmarked(space._id)) {
      setBookmarkedIds((prev) => [...prev, space._id]);
      setBookmarkedSpaces((prev) => [...prev, space]);
    }
  };

  // Remove a space from bookmarks by ID
  const removeBookmark = (id: string) => {
    setBookmarkedIds((prev) => prev.filter((bookmarkId) => bookmarkId !== id));
    setBookmarkedSpaces((prev) => prev.filter((space) => space._id !== id));
  };

  // Toggle bookmark status
  const toggleBookmark = (space: Space) => {
    if (isBookmarked(space._id)) {
      removeBookmark(space._id);
    } else {
      addBookmark(space);
    }
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarkedIds,
        bookmarkedSpaces,
        isBookmarked,
        toggleBookmark,
        addBookmark,
        removeBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

// Custom hook to use the bookmark context
export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error("useBookmarks must be used within a BookmarkProvider");
  }
  return context;
};
