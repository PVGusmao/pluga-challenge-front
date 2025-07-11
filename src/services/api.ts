import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PLUGA_API_URL,
});

export default api;
