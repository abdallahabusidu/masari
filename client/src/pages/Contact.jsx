import { useState } from "react";
import { useTranslation } from "react-i18next";
import PublicHeader from "../components/PublicHeader.jsx";

export default function Contact() {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);
  return (
    <>
      <PublicHeader active="contact" />
      <main className="top-line-page">
        <section className="contact-page">
          <div className="container">
            <h1 className="contact-title">{t("contact.title")}</h1>
            <div className="contact-grid">
              <div className="contact-illustration">
                <img src="/assets/images/contact-illustration.png" alt="Contact illustration" />
              </div>
              <form className="contact-form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                <div className="form-group"><label>{t("contact.name")}</label><input type="text" required /></div>
                <div className="form-group"><label>{t("contact.emailPhone")}</label><input type="text" required /></div>
                <div className="form-group"><label>{t("contact.subject")}</label><input type="text" required /></div>
                <div className="form-group"><label>{t("contact.message")}</label><textarea required /></div>
                <button className="primary-btn full" type="submit">{t("contact.send")}</button>
                {sent && <p className="saved-note" style={{ marginTop: 12 }}>{t("contact.sent")}</p>}
              </form>
            </div>
          </div>
          <footer className="contact-footer">
            <div className="container footer-inner">
              <div></div>
              <div className="footer-center">
                <h3>{t("contact.socials")}</h3>
                <div className="socials"><span>f</span><span>◎</span><span>▶</span></div>
                <div className="footer-links">
                  <span>{t("contact.privacy")}</span><span>{t("contact.aboutUs")}</span><span>{t("nav.contact")}</span><span>{t("contact.faq")}</span>
                </div>
              </div>
              <div className="footer-logo"><img src="/assets/images/logo.svg" alt="Masari Logo" /></div>
            </div>
          </footer>
        </section>
      </main>
    </>
  );
}
