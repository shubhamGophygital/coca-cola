import axios from "axios";
import { store } from "../reduxStore";
import { getCookie } from "../utils/cookie";

const authToken = getCookie("token");
// store.getState()?.auth?.authToken || localStorage.getItem("token");

let axiosCSPrivateInstance = axios.create({
  baseURL: process.env.REACT_APP_CS_BASE_URL_BACKEND,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
    Accept: "application/json, text/plain,",
  },
});

axiosCSPrivateInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // window.location.href = document.location.origin + "/login";
    // return Promise.reject(error);
  }
);

export default axiosCSPrivateInstance;
