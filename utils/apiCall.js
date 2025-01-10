import axios from "axios";

export const apiCall = async (method, url, payload = {}) => {
  try {
    const response = await axios[method](url, payload);
    return response.data;
  } catch (error) {
    console.error(`API ${method.toUpperCase()} error:`, error);
    throw error;
  }
};
