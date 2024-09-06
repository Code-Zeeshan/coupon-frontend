import axios from "axios";

// Production URL...
// const baseURL = "https://gutscheinekonig.de/api";

// Development URL...
const baseURL = "http://localhost:3000/api";

export const get = async (url, params, config = {}) => {
  try {
    return await axios.get(`${baseURL}/${url}`, { ...config, params });
  } catch (error) {
    throw error;
  }
};

export const post = async (url, data, config = {}) => {
  try {
    return await axios.post(`${baseURL}/${url}`, data, config);
  } catch (error) {
    throw error;
  }
};

export const patch = async (url, data, config = {}) => {
  try {
    return await axios.patch(`${baseURL}/${url}`, data, config);
  } catch (error) {
    throw error;
  }
};

export const put = async (url, data, config = {}) => {
  try {
    return await axios.put(`${baseURL}/${url}`, data, config);
  } catch (error) {
    throw error;
  }
};

export const del = async (url, config = {}) => {
  try {
    return await axios.delete(`${baseURL}/${url}`, config);
  } catch (error) {
    throw error;
  }
};

export default {
  get,
  del,
  put,
  post,
  patch,
};
