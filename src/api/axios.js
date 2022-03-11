import axios from "axios";
import Cookies from "js-cookie";
import { API_URL } from "../config";

const BASE_URL = `${API_URL}/api`;

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
