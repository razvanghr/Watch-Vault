import axios from "axios";

const AuthToken = localStorage.getItem("JWTtoken");

const axiosInstance = axios.create({
  baseURL: "https://watchvaultapi.netlify.app/.netlify/functions/api",
  headers: {
    Authorization: `Bearer ${AuthToken}`,
  },
});

axiosInstance.interceptors.request.use((config) => {
  if (AuthToken) {
    config.headers.Authorization = `Bearer ${AuthToken}`;
  }
  return config;
});

export default axiosInstance;
