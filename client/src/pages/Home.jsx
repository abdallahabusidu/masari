import { useNavigate } from "react-router-dom";
import PublicHeader from "../components/PublicHeader.jsx";

export default function Home() {
  const navigate = useNavigate();
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
              <h1 className="hero-title">أكاديمية مساري التعليمية</h1>
              <p className="hero-text">
                نظام مساري الأكاديمي يوفر لك بيئة سهلة لإدارة المهام الدراسية ومتابعة المشاريع
                الجماعية ومواعيد التسليم بطريقة منظمة تساعدك على تحسين إنجازك الأكاديمي.
              </p>
              <div className="hero-actions">
                <button className="primary-btn" onClick={() => navigate("/register")}>تسجيل جديد</button>
                <button className="play-link" onClick={() => navigate("/login")}>
                  <span className="play-dot">▶</span> تسجيل الدخول
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="features-section">
          <div className="container">
            <h2 className="section-title">ما يميزنا</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">♙</div>
                <h3>تجربة تعليمية فريدة</h3>
                <p>تصميم خاص بالطلبة لتنظيم المهام والمواعيد وإدارة المواد الدراسية بشكل واضح وسهل الاستخدام.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">✓</div>
                <h3>سهولة الاستخدام</h3>
                <p>واجهات بسيطة تساعد الطالب على إضافة المهمة ومتابعة تقدمها والوصول إلى معلوماته بسرعة.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">♧</div>
                <h3>الدعم المستمر</h3>
                <p>يوفر مساري طريقة منظمة لمتابعة المشاريع الجماعية والتواصل حول المهام المهمة طوال الفصل.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
