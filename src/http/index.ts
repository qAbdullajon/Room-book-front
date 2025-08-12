import axios from "axios";

const API_URL = import.meta.env.VITE_DATABASE_URL;
axios.defaults.withCredentials = true;

const $axios = axios.create({
  withCredentials: true,
  baseURL: `${API_URL}/api`,
});

export { $axios, API_URL };
