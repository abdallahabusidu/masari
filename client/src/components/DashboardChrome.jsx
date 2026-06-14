import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PublicHeader from "./PublicHeader.jsx";
import NotificationBell from "./NotificationBell.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const TABS = [
  { id: "dashboard", label: "مستواك الخاص", path: "/dashboard" },
  { id: "timeline", label: "مخططي الزمني", path: "/timeline" },
  { id: "resources", label: "مصادر تعليمية", path: "/resources" },
  { id: "tasks", label: "إدارة المهام", path: "/tasks" },
];

function todayArabic() {
  try {
    return new Intl.DateTimeFormat("ar-EG", { weekday: "long", year: "numeric", month: "long", day: "numeric" }).format(new Date());
  } catch {
    return "";
  }
}

// Mirrors MasariComponents.dashboardHeader + dashboardFooter from the native project.
export default function DashboardChrome({ activeTab, children }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [search, setSearch] = useState("");

  const runSearch = (e) => {
    e.preventDefault();
    const q = search.trim();
    navigate(q ? `/tasks?search=${encodeURIComponent(q)}` : "/tasks");
  };

  return (
    <div className="services-fixed-navbar-page">
      <PublicHeader active="dashboard" />
      <div className="dashboard-shell">
        <div className="dashboard-container">
          <div className="dash-top">
            <div className="dash-icons">
              <button className="round-icon" title="رجوع" onClick={() => navigate(-1)}>↩</button>
              <button className="round-icon" title="الرئيسية" onClick={() => navigate("/")}>⌂</button>
              <button className="round-icon" title="التقويم" onClick={() => navigate("/calendar")}>🗓</button>
              <button className="round-icon" title="الإحصائيات" onClick={() => navigate("/analytics")}>📊</button>
              <NotificationBell />
              <button className="round-icon logout" title="تسجيل الخروج" onClick={() => { logout(); navigate("/login"); }}>⎋</button>
              <span className="profile-chip" onClick={() => navigate("/profile")}>
                <span>مرحباً {user?.name?.split(" ")[0] || "الطالب"}</span>
                <img src="/assets/images/hero-teacher.png" alt="profile" />
              </span>
            </div>

            <form className="dash-search" onSubmit={runSearch}>
              <input placeholder="ابحث في المهام..." value={search} onChange={(e) => setSearch(e.target.value)} />
              <button type="submit">⌕</button>
            </form>

            <div className="dash-brand">
              <span>مساري - إدارة مهام الطلبة<br /><small>طريقك للوصول إلى أعلى تحصيل</small></span>
              <img src="/assets/images/logo.svg" alt="logo" />
            </div>
          </div>

          <div className="dash-menu-pill">
            <button onClick={() => navigate("/resources")}>☰</button>
            <strong>المواد<br />التعليمية</strong>
            <button onClick={() => navigate("/")}>⌂</button>
          </div>

          <div className="dash-welcome">
            <h1>أهلاً بك في مساري - لإدارة مهام الطلبة</h1>
            <p>{todayArabic()}</p>
          </div>

          <button className="course-btn" onClick={() => navigate("/profile")}>تعديل طريقة العرض</button>

          <div className="dash-tabs">
            {TABS.map((tab) => (
              <button key={tab.id} className={activeTab === tab.id ? "active" : ""} onClick={() => navigate(tab.path)}>
                {tab.label}
              </button>
            ))}
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
