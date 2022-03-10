import axios from "axios";
import Cookies from "js-cookie";
// import history from "./history";

const BASE_URL = "http://localhost:8000/api";

axios.defaults.baseURL = BASE_URL;

const instance = axios.create({
  baseURL: BASE_URL
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${Cookies.get("token")}`;
  return config;
});

instance.defaults.headers.post["Accept"] = "application/json";

export default instance;
