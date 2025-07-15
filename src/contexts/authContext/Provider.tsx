/* eslint-disable @typescript-eslint/no-explicit-any */
import actions from "./actions";
import reducer from "./reducer";
import { useCallback, useReducer } from "react";
import AuthContext from "./authContext";
import type { ContextProviderProps } from "../context.types";
import type { Store } from "../../@types/contexts/authContext/store.types";

const getUserFromLocalStorage = (): any | null => {
  try {
    const user = localStorage.getItem("@user");
    if (!user) return null;

    // Handle case where it might be a JWT token
    if (user.startsWith("eyJhbGciOi")) {
      console.warn("Found JWT token in @user storage, expected user object");
      return null;
    }

    return JSON.parse(user);
  } catch (error) {
    console.error("Failed to parse user from localStorage", error);
    localStorage.removeItem("@user"); // Clean up invalid data
    return null;
  }
};

const initialState: Store = {
  isLoggedIn: false,
  user: getUserFromLocalStorage(),
};

// Updated AuthContextProvider.tsx
const AuthContextProvider = ({ children }: ContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setUser = useCallback(
    (user: any | null) => {
      // Create a safe user object without sensitive data
      const safeUser = user
        ? {
            id: user._id,
            email: user.email,
            name: user.full_name,
            age: user.age,
            gender: user.gender,
            address: user.address,
            createdAt: user.createdAt,
            profile_pic: user.profile_pic,
            about: user.description,
          }
        : null;

      dispatch({
        type: actions.SET_USER,
        payload: {
          isLoggedIn: !!user,
          user: safeUser,
        },
      });

      if (user) {
        try {
          localStorage.setItem("@user", JSON.stringify(safeUser));
        } catch (error) {
          console.error("Failed to store user in localStorage", error);
        }
      } else {
        localStorage.removeItem("@user");
      }
    },
    [dispatch] // Changed dependency from state to dispatch
  );

  const value = {
    user: state.user,
    isLoggedIn: state.isLoggedIn,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
