import axios from "axios";
import { store } from "../reduxStore";

const { tuneyToken } = store.getState()?.auth;

let axiosTuneyUserInstance = axios.create({
  baseURL: process.env.REACT_APP_API_TUNEY_API_USER_BASEURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${tuneyToken}`,
  },
});

export default axiosTuneyUserInstance;
