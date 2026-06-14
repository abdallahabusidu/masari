import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { contentApi } from "../../lib/content.js";

// Admin top bar + page container.
export default function AdminShell({ children }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="admin-shell">
      <div className="admin-bar">
        <img src="/assets/images/logo.svg" alt="Masari" />
        <h1>{t("admin.title")}</h1>
        <span className="spacer" />
        <button onClick={() => navigate("/dashboard")}>{t("admin.studentView")}</button>
        <button onClick={() => { contentApi.adminLogout(); navigate("/"); }}>{t("admin.logout")}</button>
      </div>
      <div className="admin-wrap">{children}</div>
    </div>
  );
}
