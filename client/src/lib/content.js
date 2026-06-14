import { apiGet, apiPost, apiPatch, apiDelete, adminToken } from "./api.js";

export const RESOURCE_CATEGORIES = [
  { key: "lectures", label: "المحاضرات التعليمية" },
  { key: "recorded", label: "الدروس المصورة" },
  { key: "materials", label: "المواد التعليمية" },
  { key: "books", label: "الكتب الدراسية" },
];

export const categoryLabel = (key) =>
  RESOURCE_CATEGORIES.find((c) => c.key === key)?.label || key;

export const contentApi = {
  // admin gate
  adminLogin: async (password) => {
    const data = await apiPost("/content/admin/login", { password });
    adminToken.set(data.adminToken);
    return data;
  },
  isAdmin: () => !!adminToken.get(),
  adminLogout: () => adminToken.clear(),

  // levels
  listLevels: () => apiGet("/content/levels").then((d) => d.levels),
  createLevel: (body) => apiPost("/content/levels", body),
  updateLevel: (id, body) => apiPatch(`/content/levels/${id}`, body),
  deleteLevel: (id) => apiDelete(`/content/levels/${id}`),

  // subjects
  listSubjects: (levelId) => apiGet(`/content/levels/${levelId}/subjects`).then((d) => d.subjects),
  createSubject: (body) => apiPost("/content/subjects", body),
  updateSubject: (id, body) => apiPatch(`/content/subjects/${id}`, body),
  deleteSubject: (id) => apiDelete(`/content/subjects/${id}`),

  // resources
  listResources: (subjectId) => apiGet(`/content/subjects/${subjectId}/resources`).then((d) => d.resources),
  createResource: (body) => apiPost("/content/resources", body),
  updateResource: (id, body) => apiPatch(`/content/resources/${id}`, body),
  deleteResource: (id) => apiDelete(`/content/resources/${id}`),
};
