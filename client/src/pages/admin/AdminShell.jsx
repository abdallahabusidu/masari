import { useNavigate } from "react-router-dom";
import { contentApi } from "../../lib/content.js";

// Admin top bar + page container.
export default function AdminShell({ children }) {
  const navigate = useNavigate();
  return (
    <div className="admin-shell">
      <div className="admin-bar">
        <img src="/assets/images/logo.svg" alt="Masari" />
        <h1>لوحة تحكم المسؤول</h1>
        <span className="spacer" />
        <button onClick={() => navigate("/dashboard")}>عرض الطالب</button>
        <button onClick={() => { contentApi.adminLogout(); navigate("/"); }}>خروج المسؤول</button>
      </div>
      <div className="admin-wrap">{children}</div>
    </div>
  );
}
