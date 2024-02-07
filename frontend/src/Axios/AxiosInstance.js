import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "";
console.log(BASE_URL, "urlurl")

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export default axiosInstance;