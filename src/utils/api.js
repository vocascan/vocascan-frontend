import axios from "axios";

import { vocascanServer } from "./constants";

const api = axios.create({
  baseURL: vocascanServer,
});

export function setBaseUrl(url) {
  api.defaults.baseURL = `${url}/api`;
}

export function setTokenHeader(token) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export const login = (data) => api.post("/auth/login", data);
export const register = (data) => api.post("/auth/register", data);
export const getProfile = () => api.get("/auth");
