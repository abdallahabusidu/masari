import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PublicHeader from "../components/PublicHeader.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "تعذر تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PublicHeader />
      <main className="top-line-page">
        <section className="login-page">
          <div className="container login-box">
            <div className="login-side">
              <div>
                <h2>مرحبا بك في</h2>
                <div className="big-logo-ring"><img src="/assets/images/logo.svg" alt="Masari Logo" /></div>
              </div>
            </div>
            <div className="login-form-wrap">
              <h1>تسجيل الدخول</h1>
              {error && <div className="alert-error">{error}</div>}
              <form className="login-form" onSubmit={handleSubmit}>
                <label>البريد الالكتروني</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                <label>كلمة المرور</label>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                <p className="small-link" style={{ marginTop: 14 }}>هل نسيت كلمة المرور؟</p>
                <button className="primary-btn" type="submit" disabled={loading}>{loading ? "..." : "تسجيل الدخول"}</button>
              </form>
              <div className="login-help">
                <p>ليس لديك حساب؟ <button className="link-button" onClick={() => navigate("/register")}>إنشاء حساب طالب جديد</button></p>
                <p className="muted-note">تجربة: student@masari.edu / masari123</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
