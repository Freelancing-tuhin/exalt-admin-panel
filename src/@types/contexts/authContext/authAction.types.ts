import type { Store } from "./store.types";

export type AuthAction = {
  type: string;
  payload: Store;
};
