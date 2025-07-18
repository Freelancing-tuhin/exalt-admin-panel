import type { Payload } from "../../@types/api/api.types";
import { headers } from "../../config/config";
import { MESSAGE } from "../../constants/api/message";
import { request } from "../api";

const { post } = request;

const initialRoute = "/auth";

export const getPasscode = async (payload: Payload) => {
  try {
    const endpoint = `${initialRoute}/get-pass-code`;
    const response = await post(endpoint, payload, {
      ...headers,
    });
    if (response) {
      const {
        data: { message },
      } = response;
      if (message === MESSAGE.post.succ) {
        const {
          data: { result },
        } = response;
        return result;
      }
    }
    throw new Error();
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
};
export const userLogin = async (payload: Payload) => {
  try {
    const endpoint = `${initialRoute}/login`;
    const response = await post(endpoint, payload, {
      ...headers,
    });
    if (response) {
      const {
        data: { message },
      } = response;
      if (message === MESSAGE.post.succ) {
        const {
          data: { result },
        } = response;
        return result;
      }
    }
    throw new Error();
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
};
