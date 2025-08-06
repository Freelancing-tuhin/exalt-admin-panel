import { useState } from "react";
import type { ReactNode } from "react";
import HeadingContext from "./headingContext";

interface HeadingProviderProps {
  children: ReactNode;
}

export const HeadingProvider = ({ children }: HeadingProviderProps) => {
  const [heading, setHeading] = useState<string>("Dashboard");

  const value = {
    heading,
    setHeading,
  };

  return (
    <HeadingContext.Provider value={value}>{children}</HeadingContext.Provider>
  );
};
