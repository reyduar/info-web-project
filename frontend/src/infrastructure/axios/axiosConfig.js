import axios from "axios";
import { ACCCESS_TOKEN } from "../../config/constants";
import { API_URL } from "../../config/config";

export const axiosInstance = axios.create({
  baseURL: `${API_URL}`,
});

axiosInstance.interceptors.request.use(
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
