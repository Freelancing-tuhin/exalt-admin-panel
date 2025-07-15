/* eslint-disable @typescript-eslint/no-explicit-any */
import type { User } from "../../user.types";

export type Store = {
  user: User | any | null;
  isLoggedIn: boolean;
};
