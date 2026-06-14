import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PublicHeader from "../components/PublicHeader.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const { t } = useTranslation();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", major: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) return setError(t("auth.mismatch"));
    setLoading(true);
    try {
      await register({ name: form.name, email: form.email, major: form.major, password: form.password });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || t("auth.registerFail"));
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
                <h2>{t("auth.createIn")}</h2>
                <div className="big-logo-ring"><img src="/assets/images/logo.svg" alt="Masari Logo" /></div>
                <p className="register-side-text">{t("auth.sideText")}</p>
              </div>
            </div>
            <div className="login-form-wrap">
              <h1>{t("auth.registerTitle")}</h1>
              {error && <div className="alert-error">{error}</div>}
              <form className="login-form register-form" onSubmit={handleSubmit}>
                <label>{t("auth.fullName")}</label>
                <input type="text" required value={form.name} onChange={set("name")} />
                <label>{t("auth.email")}</label>
                <input type="email" required value={form.email} onChange={set("email")} />
                <label>{t("auth.major")}</label>
                <input type="text" value={form.major} onChange={set("major")} />
                <label>{t("auth.password")}</label>
                <input type="password" required minLength={6} value={form.password} onChange={set("password")} />
                <label>{t("auth.confirm")}</label>
                <input type="password" required value={form.confirm} onChange={set("confirm")} />
                <button className="primary-btn" type="submit" disabled={loading}>{loading ? "..." : t("auth.create")}</button>
              </form>
              <div className="login-help">
                <p>{t("auth.haveAccount")} <button className="link-button" onClick={() => navigate("/login")}>{t("auth.loginTitle")}</button></p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
