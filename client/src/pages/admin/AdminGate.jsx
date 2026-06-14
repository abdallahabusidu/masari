import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { contentApi } from "../../lib/content.js";

// Password gate for the admin panel. Renders children once unlocked.
export default function AdminGate({ children }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [unlocked, setUnlocked] = useState(contentApi.isAdmin());
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (unlocked) return children;

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await contentApi.adminLogin(password);
      setUnlocked(true);
    } catch (err) {
      setError(err.response?.data?.message || t("admin.wrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-gate">
      <form className="admin-gate-box" onSubmit={submit}>
        <img src="/assets/images/logo.svg" alt="Masari" />
        <h1>{t("admin.title")}</h1>
        {error && <div className="alert-error">{error}</div>}
        <input
          type="password"
          placeholder={t("admin.password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
        />
        <button className="primary-btn full" type="submit" disabled={loading}>
          {loading ? "..." : t("admin.enter")}
        </button>
        <p className="muted-note" style={{ cursor: "pointer" }} onClick={() => navigate("/dashboard")}>
          {t("common.back")}
        </p>
      </form>
    </div>
  );
}
