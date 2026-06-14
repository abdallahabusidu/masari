import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PublicHeader from "../components/PublicHeader.jsx";

export default function About() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <>
      <PublicHeader active="about" />
      <main className="top-line-page">
        <section className="about-page">
          <div className="container about-grid">
            <div className="about-photo">
              <img src="/assets/images/about-laptop.png" alt="Student using laptop" />
            </div>
            <div className="about-text">
              <h2>{t("about.title")}</h2>
              <p>{t("about.body")}</p>
              <div className="dashed-action">
                <button className="primary-btn" onClick={() => navigate("/login")}>{t("about.registerNow")}</button>
              </div>
            </div>
          </div>
          <div className="about-person">
            <img src="/assets/images/about-person.png" alt="Student" />
          </div>
        </section>
      </main>
    </>
  );
}
