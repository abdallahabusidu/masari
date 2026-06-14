import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { apiGet, apiPost, tokens } from "../lib/api.js";
import { applyLanguage } from "../lib/i18n.js";
import { applyTheme } from "../lib/theme.js";

const AuthContext = createContext(null);

// Apply a user's saved language/theme preferences to the UI.
function applyPrefs(user) {
  if (user?.preferences?.language) applyLanguage(user.preferences.language);
  if (user?.preferences?.theme) applyTheme(user.preferences.theme);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tokens.getAccess()) {
      setLoading(false);
      return;
    }
    apiGet("/auth/me")
      .then(({ user }) => { setUser(user); applyPrefs(user); })
      .catch(() => tokens.clear())
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const onLogout = () => setUser(null);
    window.addEventListener("masari:logout", onLogout);
    return () => window.removeEventListener("masari:logout", onLogout);
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await apiPost("/auth/login", { email, password });
    tokens.set(data);
    setUser(data.user);
    applyPrefs(data.user);
    return data.user;
  }, []);

  const register = useCallback(async (payload) => {
    const data = await apiPost("/auth/register", payload);
    tokens.set(data);
    setUser(data.user);
    applyPrefs(data.user);
    return data.user;
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiPost("/auth/logout");
    } catch {
      /* ignore */
    }
    tokens.clear();
    setUser(null);
  }, []);

  const updateUser = useCallback((u) => setUser(u), []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
