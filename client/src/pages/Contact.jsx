import { useState } from "react";
import PublicHeader from "../components/PublicHeader.jsx";

export default function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PublicHeader active="contact" />
      <main className="top-line-page">
        <section className="contact-page">
          <div className="container">
            <h1 className="contact-title">كيف يمكنك الوصول الينا</h1>
            <div className="contact-grid">
              <div className="contact-illustration">
                <img src="/assets/images/contact-illustration.png" alt="Contact illustration" />
              </div>
              <form className="contact-form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                <div className="form-group"><label>الاسم</label><input type="text" required /></div>
                <div className="form-group"><label>البريد الالكتروني / رقم الهاتف</label><input type="text" required /></div>
                <div className="form-group"><label>عنوان الرسالة</label><input type="text" required /></div>
                <div className="form-group"><label>الرسالة</label><textarea required /></div>
                <button className="primary-btn full" type="submit">إرسال</button>
                {sent && <p className="saved-note" style={{ marginTop: 12 }}>تم إرسال رسالتك ✓</p>}
              </form>
            </div>
          </div>
          <footer className="contact-footer">
            <div className="container footer-inner">
              <div></div>
              <div className="footer-center">
                <h3>زورونا على مواقع التواصل الاجتماعي</h3>
                <div className="socials"><span>f</span><span>◎</span><span>▶</span></div>
                <div className="footer-links">
                  <span>سياسة الخصوصية</span><span>من نحن</span><span>اتصل بنا</span><span>الأسئلة الشائعة</span>
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
