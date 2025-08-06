import { createContext } from "react";
import type { HeadingContextProps } from "../../@types/contexts/headingContext/headingContext.types";

const HeadingContext = createContext({} as HeadingContextProps);

export default HeadingContext;
