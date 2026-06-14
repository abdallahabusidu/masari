import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Mirrors MasariComponents.publicHeader from the native project.
export default function PublicHeader({ active = "" }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const cls = (id) => (active === id ? "active" : "");
  const go = (path) => {
    document.body.classList.remove("mobile-open");
    navigate(path);
  };

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
          <button className={cls("home")} onClick={() => go("/")}>الرئيسية</button>
          <button className={cls("dashboard")} onClick={() => go(user ? "/dashboard" : "/login")}>الخدمات</button>
          <button className={cls("about")} onClick={() => go("/about")}>حول</button>
          <button className={cls("contact")} onClick={() => go("/contact")}>اتصل بنا</button>
        </nav>

        <div className="header-actions">
          <button className="back-btn" onClick={() => navigate(-1)}>رجوع</button>
          <button className="search-btn" onClick={() => go(user ? "/tasks" : "/login")}>⌕</button>
          {user ? (
            <>
              <button className="small-btn" onClick={() => go("/admin")}>لوحة التحكم</button>
              <button className="small-btn" onClick={() => { document.body.classList.remove("mobile-open"); logout(); navigate("/login"); }}>خروج</button>
            </>
          ) : (
            <>
              <button className="small-btn" onClick={() => go("/register")}>تسجيل جديد</button>
              <button className="small-btn" onClick={() => go("/login")}>تسجيل الدخول</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
