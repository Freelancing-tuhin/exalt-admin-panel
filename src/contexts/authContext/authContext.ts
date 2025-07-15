import { createContext } from "react";
import type { AuthContextProps } from "../../@types/contexts/authContext/authContextProps.types";

const AuthContext = createContext({} as AuthContextProps);

export default AuthContext;
