import { useContext } from "react";
import HeadingContext from "./headingContext";

export const useHeading = () => {
  const context = useContext(HeadingContext);

  if (!context) {
    throw new Error("useHeading must be used within a HeadingProvider");
  }

  return context;
};
