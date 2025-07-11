import axios from "axios";

//url api
const api = axios.create({
  baseURL: "https://pluga.co/ferramentas_search.json",
});

export default api;
