import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PublicHeader from "../components/PublicHeader.jsx";

export default function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <>
      <PublicHeader active="home" />
      <main className="top-line-page">
        <section className="home-hero">
          <div className="container hero-grid">
            <div className="hero-image">
              <img src="/assets/images/hero-teacher.png" alt="Teacher" />
            </div>
            <div className="hero-content">
              <h1 className="hero-title">{t("home.heroTitle")}</h1>
              <p className="hero-text">{t("home.heroText")}</p>
              <div className="hero-actions">
                <button className="primary-btn" onClick={() => navigate("/register")}>{t("nav.register")}</button>
                <button className="play-link" onClick={() => navigate("/login")}>
                  <span className="play-dot">▶</span> {t("nav.login")}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="features-section">
          <div className="container">
            <h2 className="section-title">{t("home.features")}</h2>
            <div className="features-grid">
              <div className="feature-card"><div className="feature-icon">♙</div><h3>{t("home.f1t")}</h3><p>{t("home.f1b")}</p></div>
              <div className="feature-card"><div className="feature-icon">✓</div><h3>{t("home.f2t")}</h3><p>{t("home.f2b")}</p></div>
              <div className="feature-card"><div className="feature-icon">♧</div><h3>{t("home.f3t")}</h3><p>{t("home.f3b")}</p></div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
