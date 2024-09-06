import axios from "axios";
import { ACCCESS_TOKEN } from "./constants";

const api = axios.create({
  baseURL: import.meta.env.API_BASE_URL,
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
