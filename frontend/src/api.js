import axios from "axios";
import { ACCCESS_TOKEN } from "./constants";
import { API_URL } from "./config";

const api = axios.create({
  baseURL: `${API_URL}/api/`,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(ACCCESS_TOKEN);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default api;
