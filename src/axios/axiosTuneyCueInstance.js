import axios from "axios";
import { store } from "../reduxStore";
import getTuneyRefreshToken from "../utils/getTuneyRefreshToken";

const tuneyToken =
  localStorage.getItem("tuneyToken") || store.getState()?.auth?.tuneyToken;

const axiosTuneyCueInstance = axios.create({
  baseURL: process.env.REACT_APP_API_TUNEY_API_CUE_BASEURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${tuneyToken}`,
  },
});

axiosTuneyCueInstance.interceptors.request.use(
  (config) => {
    if (!config.headers["Authorization"]) {
      config.headers["Authorization"] = `Bearer ${tuneyToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosTuneyCueInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error?.response?.status === 401) {
      const prevRequest = error?.config;
      let newRefreshToken = await getTuneyRefreshToken();
      prevRequest.headers["Authorization"] = `Bearer ${newRefreshToken}`;
      if (newRefreshToken) {
        return axiosTuneyCueInstance(prevRequest);
      } else {
        return;
      }
    }
    return Promise.reject(error);
  }
);

export default axiosTuneyCueInstance;
