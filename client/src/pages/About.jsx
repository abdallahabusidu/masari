import { useNavigate } from "react-router-dom";
import PublicHeader from "../components/PublicHeader.jsx";

export default function About() {
  const navigate = useNavigate();
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
              <h2>من نحن</h2>
              <p>
                نسعى في مساري إلى تمكين طلاب الجامعات عبر توفير بيئة رقمية متكاملة لتنظيم العمل
                التعليمي بأسلوب حديث وفعال. توفر المنصة أدوات ذكية لإدارة المهام وجدولة الموارد
                التعليمية ومتابعة السنوات الدراسية، مما يضمن تجربة تعلم مخصصة وشاملة تهدف إلى تحقيق
                أفضل درجات الإنجاز والتميز.
              </p>
              <div className="dashed-action">
                <button className="primary-btn" onClick={() => navigate("/login")}>سجل الآن</button>
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
