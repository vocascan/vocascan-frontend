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

// Auth
export const login = (data) => api.post("/user/login", data);
export const register = (data) => api.post("/user/register", data);

// User
export const getProfile = () => api.get("/user");
export const deleteUser = (userId) => api.delete(`/user/${userId}`);

// Language package
export const createPackage = (data) => api.post("/languagePackage", data);
export const getPackages = (data) => api.get("/languagePackage", data);
export const modifyPackage = (languagePackageId, data) =>
  api.put(`/languagePackage/${languagePackageId}`, data);
export const deletePackage = (languagePackageId) =>
  api.delete(`/languagePackage/${languagePackageId}`);

// Language package group
export const createGroup = (languagePackageId, data) =>
  api.post(`/languagePackage/${languagePackageId}/group`, data);
export const getGroups = (languagePackageId) =>
  api.get(`/languagePackage/${languagePackageId}/group`);
export const modifyGroup = (groupId, data) =>
  api.put(`/group/${groupId}`, data);
export const deleteGroup = (groupId) => api.delete(`/group/${groupId}`);

// Vocabulary
export const createVocabulary = (
  languagePackageId,
  groupId,
  data,
  activate = false
) =>
  api.post(
    `/languagePackage/${languagePackageId}/group/${groupId}/vocabulary?activate=${activate}`,
    data
  );
export const getGroupVocabulary = (groupId) =>
  api.get(`/group/${groupId}/vocabulary`);
export const modifyVocabulary = (vocabularyId, data) =>
  api.put(`/vocabulary/${vocabularyId}`, data);
export const deleteVocabulary = (vocabularyId) =>
  api.delete(`/vocabulary/${vocabularyId}`);

// Query Vocabulary
export const getQueryVocabulary = (languagePackageId, staged = true) =>
  api.get(`/languagePackage/${languagePackageId}/query?staged=${staged}`);
export const checkQuery = (vocabularyId, answer = false) =>
  api.patch(`/vocabulary/${vocabularyId}?answer=${answer}`);
