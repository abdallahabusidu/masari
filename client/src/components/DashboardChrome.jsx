import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PublicHeader from "./PublicHeader.jsx";
import NotificationBell from "./NotificationBell.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { applyLanguage } from "../lib/i18n.js";
import { getTheme, toggleTheme } from "../lib/theme.js";

export default function DashboardChrome({ activeTab, children }) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState(getTheme());
  const [lang, setLang] = useState(i18n.language);

  const tabs = [
    { id: "dashboard", label: t("tabs.level"), path: "/dashboard" },
    { id: "timeline", label: t("tabs.timeline"), path: "/timeline" },
    { id: "resources", label: t("tabs.resources"), path: "/resources" },
    { id: "tasks", label: t("tabs.tasks"), path: "/tasks" },
  ];

  const today = () => {
    try {
      return new Intl.DateTimeFormat(lang === "ar" ? "ar-EG" : "en-GB", {
        weekday: "long", year: "numeric", month: "long", day: "numeric",
      }).format(new Date());
    } catch {
      return "";
    }
  };

  const runSearch = (e) => {
    e.preventDefault();
    const q = search.trim();
    navigate(q ? `/tasks?search=${encodeURIComponent(q)}` : "/tasks");
  };
  const switchLang = () => { const n = lang === "ar" ? "en" : "ar"; applyLanguage(n); setLang(n); };
  const switchTheme = () => setTheme(toggleTheme());

  return (
    <div className="services-fixed-navbar-page">
      <PublicHeader active="dashboard" />
      <div className="dashboard-shell">
        <div className="dashboard-container">
          <div className="dash-top">
            <div className="dash-icons">
              <button className="round-icon" title={t("common.back")} onClick={() => navigate(-1)}>↩</button>
              <button className="round-icon" title={t("nav.home")} onClick={() => navigate("/")}>⌂</button>
              <button className="round-icon" title={t("tabs.timeline")} onClick={() => navigate("/calendar")}>🗓</button>
              <button className="round-icon" title={t("analytics.title")} onClick={() => navigate("/analytics")}>📊</button>
              <button className="round-icon theme" title={t("profile.theme")} onClick={switchTheme}>{theme === "dark" ? "☀️" : "🌙"}</button>
              <button className="round-icon" title={t("profile.language")} onClick={switchLang}>{lang === "ar" ? "EN" : "ع"}</button>
              <NotificationBell />
              <button className="round-icon logout" title={t("common.logout")} onClick={() => { logout(); navigate("/login"); }}>⎋</button>
              <span className="profile-chip" onClick={() => navigate("/profile")}>
                <span>{t("dash.welcomeName")} {user?.name?.split(" ")[0] || ""}</span>
                <img src="/assets/images/hero-teacher.png" alt="profile" />
              </span>
            </div>

            <form className="dash-search" onSubmit={runSearch}>
              <input placeholder={t("dash.searchTasks")} value={search} onChange={(e) => setSearch(e.target.value)} />
              <button type="submit">⌕</button>
            </form>

            <div className="dash-brand">
              <span>{t("brand.title")}<br /><small>{t("brand.sub")}</small></span>
              <img src="/assets/images/logo.svg" alt="logo" />
            </div>
          </div>

          <div className="dash-menu-pill">
            <button onClick={() => navigate("/resources")}>☰</button>
            <strong>{t("dash.materials")}</strong>
            <button onClick={() => navigate("/")}>⌂</button>
          </div>

          <div className="dash-welcome">
            <h1>{t("dash.welcomeTitle")}</h1>
            <p>{today()}</p>
          </div>

          <button className="course-btn" onClick={() => navigate("/profile")}>{t("dash.editView")}</button>

          <div className="dash-tabs">
            {tabs.map((tab) => (
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
