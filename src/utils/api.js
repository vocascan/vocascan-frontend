import axios from "axios";

import { defaultLimit, vocascanServer } from "./constants.js";

const { BASE_URL: baseURL } = window.VOCASCAN_CONFIG;

const api = axios.create({
  baseURL: `${baseURL || vocascanServer}/api`,
});

export function setBaseUrl(url) {
  if (!baseURL) {
    api.defaults.baseURL = `${url}/api`;
  }
}

export function setTokenHeader(token) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

// Auth
export const login = (data) => api.post("/user/login", data);
export const register = (data, code = null) =>
  api.post(`/user/register${code ? `?inviteCode=${code}` : ""}`, data);
export const changePassword = (data) => api.patch("/user/reset-password", data);
export const requestEmailVerification = (data, config) =>
  api.patch("/user/request-email-verification", data, config);

// Legal
export const checkUrlAvailable = (url, cancelToken) => {
  const checkApi = axios.create();

  return checkApi.get(url, { cancelToken });
};

// User
export const getProfile = (config) => api.get("/user", config);
export const deleteUser = () => api.delete("/user");

// Language package
export const createPackage = (data) => api.post("/languagePackage", data);
export const getPackages = (groups = false, stats = false) =>
  api.get(`/languagePackage?groups=${groups}&stats=${stats}`);
export const modifyPackage = (data) =>
  api.put(`/languagePackage/${data.id}`, data);
export const deletePackage = (languagePackageId) =>
  api.delete(`/languagePackage/${languagePackageId}`);

// Language package group
export const createGroup = (languagePackageId, data) =>
  api.post(`/languagePackage/${languagePackageId}/group`, data);
export const getGroups = (languagePackageId, staged) =>
  api.get(`/languagePackage/${languagePackageId}/group?staged=${staged}`);
export const modifyGroup = (data) => api.put(`/group/${data.id}`, data);
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
export const getGroupVocabulary = (groupId, staged, search) =>
  api.get(`/group/${groupId}/vocabulary?staged=${staged}&search=${search}`);
export const modifyVocabulary = (data) =>
  api.put(`/vocabulary/${data.id}`, data);
export const deleteVocabulary = (vocabularyId) =>
  api.delete(`/vocabulary/${vocabularyId}`);

// Query Vocabulary
export const getQueryVocabulary = (
  languagePackageId,
  staged = false,
  limit = defaultLimit,
  groupIds = null
) =>
  api.get(
    `/languagePackage/${languagePackageId}/query?staged=${staged}&limit=${limit}${
      groupIds ? groupIds.map((groupId) => `&groupId=${groupId}`).join("") : ""
    }`
  );
export const checkQuery = (vocabularyId, answer = false, progress = false) =>
  api.patch(
    `/vocabulary/${vocabularyId}?answer=${answer}&progress=${progress}`
  );

// Stats
export const getStats = () => api.get("/user/stats");

// Export
export const exportGroup = (groupId) => api.get(`/group/${groupId}/export`);
export const exportPackage = (languagePackageId, queryStatus) =>
  api.get(
    `/languagePackage/${languagePackageId}/export/?queryStatus=${queryStatus}`
  );

// Import
export const importVocabs = ({
  data,
  active,
  activate,
  queryStatus = null,
  languagePackageId = null,
}) =>
  api.post(
    `/import?${
      languagePackageId ? `languagePackageId=${languagePackageId}` : ""
    }&${
      queryStatus ? `queryStatus=${queryStatus}` : ""
    }&active=${active}&activate=${activate}`,
    data
  );

// Languages
export const getLanguages = ({
  code = true,
  name = true,
  nativeNames = false,
  rtl = false,
}) =>
  api.get(
    `/language?code=${code}&name=${name}&nativeNames=${nativeNames}&rtl=${rtl}`
  );

// Info
export const getInfo = (cancelToken) => api.get("/info", { cancelToken });

// inviteCode
export const checkInviteCode = (inviteCode, cancelToken) =>
  api.get(`/inviteCode/${inviteCode}`, { cancelToken });

// Admin
export const getInviteCodes = () => api.get(`/inviteCode`);
export const createInviteCode = (data) => api.post(`/inviteCode`, data);
export const deleteInviteCode = (inviteCode) =>
  api.delete(`/inviteCode/${inviteCode}`);
