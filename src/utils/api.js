import axios from "axios";

import { vocascanServer } from "./constants.js";

const api = axios.create({
  baseURL: vocascanServer,
});

export function setBaseUrl(url) {
  api.defaults.baseURL = `${url}/api`;
}

export function setTokenHeader(token) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export const login = (data) => api.post("/user/login", data);
export const register = (data) => api.post("/user/register", data);
export const getProfile = () => api.get("/user");
