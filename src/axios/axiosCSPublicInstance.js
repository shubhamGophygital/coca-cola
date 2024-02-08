import axios from "axios";

let axiosCSPublicInstance = axios.create({
  baseURL: process.env.REACT_APP_CS_BASE_URL_BACKEND,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosCSPublicInstance;
