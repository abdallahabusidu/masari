import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PublicHeader from "../components/PublicHeader.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", major: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) return setError("كلمتا المرور غير متطابقتين");
    setLoading(true);
    try {
      await register({ name: form.name, email: form.email, major: form.major, password: form.password });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "تعذر إنشاء الحساب");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PublicHeader />
      <main className="top-line-page">
        <section className="login-page">
          <div className="container login-box register-box">
            <div className="login-side register-side">
              <div>
                <h2>أنشئ حسابك في مساري</h2>
                <div className="big-logo-ring"><img src="/assets/images/logo.svg" alt="Masari Logo" /></div>
                <p className="register-side-text">ابدأ بتنظيم مهامك الأكاديمية ومتابعة مواعيدك بسهولة.</p>
              </div>
            </div>
            <div className="login-form-wrap">
              <h1>تسجيل جديد</h1>
              {error && <div className="alert-error">{error}</div>}
              <form className="login-form register-form" onSubmit={handleSubmit}>
                <label>الاسم الكامل</label>
                <input type="text" required value={form.name} onChange={set("name")} />
                <label>البريد الالكتروني</label>
                <input type="email" required value={form.email} onChange={set("email")} />
                <label>التخصص / القسم</label>
                <input type="text" value={form.major} onChange={set("major")} />
                <label>كلمة المرور</label>
                <input type="password" required minLength={6} value={form.password} onChange={set("password")} />
                <label>تأكيد كلمة المرور</label>
                <input type="password" required value={form.confirm} onChange={set("confirm")} />
                <button className="primary-btn" type="submit" disabled={loading}>{loading ? "..." : "إنشاء الحساب"}</button>
              </form>
              <div className="login-help">
                <p>لديك حساب بالفعل؟ <button className="link-button" onClick={() => navigate("/login")}>تسجيل الدخول</button></p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
