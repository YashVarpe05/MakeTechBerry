import api from "./api";

export const adminRegister = (data) => {
  return api.post("/auth/register", data);
};

export const adminLogin = (data) => {
  return api.post("/auth/login", data);
};

export const getInternships = (token) => {
  return api.get("/internships", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const getProjects = (token) => {
  return api.get("/projects", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const deleteInternship = (id, token) => {
  return api.delete(`/internships/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const deleteProject = (id, token) => {
  return api.delete(`/projects/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const approveInternship = (id, token) => {
  return api.patch(`/internships/${id}/approve`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const rejectInternship = (id, token) => {
  return api.patch(`/internships/${id}/reject`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const approveProject = (id, token) => {
  return api.patch(`/projects/${id}/approve`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const rejectProject = (id, token) => {
  return api.patch(`/projects/${id}/reject`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const getReports = (token) => {
  return api.get("/reports", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const getReportsByType = (type, token) => {
  return api.get(`/reports/type/${type}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const getReportsByAction = (action, token) => {
  return api.get(`/reports/action/${action}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const deleteReport = (id, token) => {
  return api.delete(`/reports/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const getMessages = (token) => {
  return api.get("/messages", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const deleteMessage = (id, token) => {
  return api.delete(`/messages/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};