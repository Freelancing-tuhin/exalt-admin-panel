import type { Payload, Params } from "../../@types/api/api.types";
import { headers } from "../../config/config";
import { MESSAGE } from "../../constants/api/message"; 
import { request } from "../api";

const { get, post, patch, del } = request;

const initialRoute = "/article";

export const createArticle = async (payload: Payload) => {
  try {
    const endpoint = `${initialRoute}/`;
    const response = await post(endpoint, payload, {
      ...headers,
    });
    if (response) {
      const {
        data: { message, result },
      } = response;
      if (message === MESSAGE.post.succ) {
        return result;
      }
    }
    throw new Error("Failed to create event.");
  } catch (error: unknown) {
    console.error("Error creating event:", error);
    throw error;
  }
};

export const getAllArticles = async (params: Params = {}) => {
  try {
    const endpoint = `${initialRoute}/`;
    const response = await get(endpoint, { ...headers }, params);
    if (response) {
      const {
        data: { message, result },
      } = response;
      if (message === MESSAGE.get.succ || result) {
        return result;
      }
    }
    throw new Error("Failed to fetch all events.");
  } catch (error: unknown) {
    console.error("Error fetching all events:", error);
    throw error;
  }
};

export const getArticleById = async (id: string) => {
  try {
    const endpoint = `${initialRoute}/${id}`;
    const response = await get(endpoint, { ...headers });
    if (response) {
      const {
        data: { message, result },
      } = response;
      if (message === MESSAGE.get.succ || result) {
        return result;
      }
    }
    throw new Error(`Failed to fetch event with ID: ${id}.`);
  } catch (error: unknown) {
    console.error(`Error fetching event by ID ${id}:`, error);
    throw error;
  }
};

export const updateArticle = async (id: string, payload: Payload) => {
  try {
    const endpoint = `${initialRoute}/${id}`;
    const response = await patch(endpoint, payload, {
      ...headers,
    });
    if (response) {
      const {
        data: { message, result },
      } = response;
      if (message === MESSAGE.patch.succ || message === MESSAGE.post.succ) { 
        return result;
      }
    }
    throw new Error(`Failed to update event with ID: ${id}.`);
  } catch (error: unknown) {
    console.error(`Error updating event by ID ${id}:`, error);
    throw error;
  }
};

export const deleteArticle = async (id: string) => {
  try {
    const endpoint = `${initialRoute}/${id}`;
    const response = await del(endpoint, { ...headers });
    if (response) {
      const {
        data: { message, result },
      } = response;
      if (message === MESSAGE.delete.succ) {
        return result;
      }
    }
    throw new Error(`Failed to delete event with ID: ${id}.`);
  } catch (error: unknown) {
    console.error(`Error deleting event by ID ${id}:`, error);
    throw error;
  }
};