import api from "./api";

// [FIXED]: Auto-inject auth token via interceptor instead of repeating in every call
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ========== AUTH ==========

export const adminLogin = (data) => {
  return api.post("/auth/login", data);
};

// ========== INTERNSHIPS ==========

export const getInternships = () => {
  return api.get("/internships");
};

export const deleteInternship = (id) => {
  return api.delete(`/internships/${id}`);
};

export const approveInternship = (id) => {
  return api.patch(`/internships/${id}/approve`);
};

export const rejectInternship = (id) => {
  return api.patch(`/internships/${id}/reject`);
};

// ========== PROJECTS ==========

export const getProjects = () => {
  return api.get("/projects");
};

export const deleteProject = (id) => {
  return api.delete(`/projects/${id}`);
};

export const approveProject = (id) => {
  return api.patch(`/projects/${id}/approve`);
};

export const rejectProject = (id) => {
  return api.patch(`/projects/${id}/reject`);
};

// ========== REPORTS ==========

export const getReports = () => {
  return api.get("/reports");
};

export const getReportsByType = (type) => {
  return api.get(`/reports/type/${type}`);
};

export const getReportsByAction = (action) => {
  return api.get(`/reports/action/${action}`);
};

export const deleteReport = (id) => {
  return api.delete(`/reports/${id}`);
};

// ========== MESSAGES ==========

export const getMessages = () => {
  return api.get("/messages");
};

export const deleteMessage = (id) => {
  return api.delete(`/messages/${id}`);
};

// ========== SHOWCASE PROJECTS ==========

export const getShowcaseProjects = () => {
  return api.get("/projects/showcase");
};

export const getShowcaseProject = (id) => {
  return api.get(`/projects/showcase/${id}`);
};

export const createShowcaseProject = (data) => {
  return api.post("/projects/showcase", data);
};

export const updateShowcaseProject = (id, data) => {
  return api.put(`/projects/showcase/${id}`, data);
};

export const deleteShowcaseProject = (id) => {
  return api.delete(`/projects/showcase/${id}`);
};

export const changeShowcaseProjectStatus = (id, status) => {
  return api.patch(`/projects/showcase/${id}/status`, { status });
};

// ========== WORKSHOPS ==========

export const getWorkshops = (status = null, category = null) => {
  let url = "/workshops?";
  if (status) url += `status=${status}&`;
  if (category && category !== 'All') url += `category=${category}`;
  return api.get(url);
};

export const getWorkshop = (id) => {
  return api.get(`/workshops/${id}`);
};

export const createWorkshop = (data) => {
  return api.post("/workshops", data);
};

export const updateWorkshop = (id, data) => {
  return api.put(`/workshops/${id}`, data);
};

export const deleteWorkshop = (id) => {
  return api.delete(`/workshops/${id}`);
};