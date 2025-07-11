import axios from "axios";

//url api
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PLUGA_API_URL,
});

export default api;
