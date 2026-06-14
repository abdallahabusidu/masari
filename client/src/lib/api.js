import axios from "axios";

const ACCESS = "masari_access";
const REFRESH = "masari_refresh";
const ADMIN = "masari_admin";

export const tokens = {
  getAccess: () => localStorage.getItem(ACCESS),
  getRefresh: () => localStorage.getItem(REFRESH),
  set: ({ accessToken, refreshToken }) => {
    if (accessToken) localStorage.setItem(ACCESS, accessToken);
    if (refreshToken) localStorage.setItem(REFRESH, refreshToken);
  },
  clear: () => {
    localStorage.removeItem(ACCESS);
    localStorage.removeItem(REFRESH);
  },
};

// Admin-panel token (kept in sessionStorage so it clears when the tab closes).
export const adminToken = {
  get: () => sessionStorage.getItem(ADMIN),
  set: (t) => sessionStorage.setItem(ADMIN, t),
  clear: () => sessionStorage.removeItem(ADMIN),
};

const baseURL = "/api";
const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const t = tokens.getAccess();
  if (t) config.headers.Authorization = `Bearer ${t}`;
  const at = adminToken.get();
  if (at) config.headers["x-admin-token"] = at; // used by admin-only routes
  return config;
});

// Refresh access token once on 401, then retry.
let refreshing = null;
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    const isAuthCall = original?.url?.includes("/auth/");
    if (error.response?.status === 401 && !original._retry && !isAuthCall) {
      original._retry = true;
      try {
        if (!refreshing) {
          const rt = tokens.getRefresh();
          if (!rt) throw new Error("no refresh");
          refreshing = axios
            .post(`${baseURL}/auth/refresh`, { refreshToken: rt })
            .then((r) => {
              tokens.set(r.data.data);
              return r.data.data.accessToken;
            })
            .finally(() => (refreshing = null));
        }
        const newAccess = await refreshing;
        original.headers.Authorization = `Bearer ${newAccess}`;
        return api(original);
      } catch {
        tokens.clear();
        window.dispatchEvent(new Event("masari:logout"));
      }
    }
    return Promise.reject(error);
  }
);

// Unwrap the { success, data, message } envelope.
export const apiGet = (url, config) => api.get(url, config).then((r) => r.data.data);
export const apiPost = (url, body, config) => api.post(url, body, config).then((r) => r.data.data);
export const apiPatch = (url, body, config) => api.patch(url, body, config).then((r) => r.data.data);
export const apiDelete = (url, config) => api.delete(url, config).then((r) => r.data.data);

export default api;
