import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext.jsx";
import { applyLanguage } from "../lib/i18n.js";
import { getTheme, toggleTheme } from "../lib/theme.js";

export default function PublicHeader({ active = "" }) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState(getTheme());
  const cls = (id) => (active === id ? "active" : "");
  const go = (path) => {
    document.body.classList.remove("mobile-open");
    navigate(path);
  };
  const switchLang = () => applyLanguage(i18n.language === "ar" ? "en" : "ar");
  const switchTheme = () => setTheme(toggleTheme());

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="logo-wrap">
          <div className="logo-circle">
            <img src="/assets/images/logo.svg" alt="Masari Logo" />
          </div>
        </div>

        <button className="mobile-menu" aria-label="menu" onClick={() => document.body.classList.toggle("mobile-open")}>
          ☰
        </button>

        <nav className="main-nav">
          <button className={cls("home")} onClick={() => go("/")}>{t("nav.home")}</button>
          <button className={cls("dashboard")} onClick={() => go(user ? "/dashboard" : "/login")}>{t("nav.services")}</button>
          <button className={cls("about")} onClick={() => go("/about")}>{t("nav.about")}</button>
          <button className={cls("contact")} onClick={() => go("/contact")}>{t("nav.contact")}</button>
        </nav>

        <div className="header-actions">
          <button className="back-btn" onClick={() => navigate(-1)}>{t("common.back")}</button>
          <button className="search-btn" onClick={switchTheme} title={t("profile.theme")}>{theme === "dark" ? "☀" : "☾"}</button>
          <button className="back-btn" onClick={switchLang}>{i18n.language === "ar" ? "EN" : "ع"}</button>
          {user ? (
            <>
              <button className="small-btn" onClick={() => go("/admin")}>{t("nav.control")}</button>
              <button className="small-btn" onClick={() => { document.body.classList.remove("mobile-open"); logout(); navigate("/login"); }}>{t("nav.exit")}</button>
            </>
          ) : (
            <>
              <button className="small-btn" onClick={() => go("/register")}>{t("nav.register")}</button>
              <button className="small-btn" onClick={() => go("/login")}>{t("nav.login")}</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
