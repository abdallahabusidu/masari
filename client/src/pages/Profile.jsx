import { useState } from "react";
import { apiPatch, apiPost } from "../lib/api.js";
import DashboardChrome from "../components/DashboardChrome.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [major, setMajor] = useState(user?.major || "");
  const [prefs, setPrefs] = useState({
    theme: user?.preferences?.theme || "light",
    language: user?.preferences?.language || "ar",
    emailReminders: user?.preferences?.emailReminders ?? true,
  });
  const [pw, setPw] = useState({ currentPassword: "", newPassword: "" });
  const [saved, setSaved] = useState("");

  const saveProfile = async (e) => {
    e.preventDefault();
    const { user: updated } = await apiPatch("/auth/me", { name, major, preferences: prefs });
    updateUser(updated);
    setSaved("تم حفظ التغييرات ✓");
    setTimeout(() => setSaved(""), 2000);
  };

  const changePassword = async () => {
    try {
      await apiPost("/auth/change-password", pw);
      setPw({ currentPassword: "", newPassword: "" });
      setSaved("تم تغيير كلمة المرور ✓");
      setTimeout(() => setSaved(""), 2000);
    } catch (err) {
      alert(err.response?.data?.message || "فشل تغيير كلمة المرور");
    }
  };

  return (
    <DashboardChrome activeTab="dashboard">
      <form className="profile-panel" onSubmit={saveProfile}>
        <h2 className="panel-title">الملف الشخصي والإعدادات</h2>

        <div className="profile-id">
          <div className="profile-avatar">{name?.[0] || "م"}</div>
          <div>
            <strong style={{ fontSize: 18 }}>{name}</strong>
            <div className="u-meta">{user?.email}</div>
          </div>
        </div>

        <div className="field"><label>الاسم</label><input value={name} onChange={(e) => setName(e.target.value)} /></div>
        <div className="field"><label>التخصص</label><input value={major} onChange={(e) => setMajor(e.target.value)} /></div>

        <div className="field-row">
          <div className="field"><label>المظهر</label>
            <select value={prefs.theme} onChange={(e) => setPrefs({ ...prefs, theme: e.target.value })}>
              <option value="light">فاتح</option><option value="dark">داكن</option>
            </select>
          </div>
          <div className="field"><label>اللغة</label>
            <select value={prefs.language} onChange={(e) => setPrefs({ ...prefs, language: e.target.value })}>
              <option value="ar">العربية</option><option value="en">English</option>
            </select>
          </div>
        </div>

        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
          <input type="checkbox" checked={prefs.emailReminders} onChange={(e) => setPrefs({ ...prefs, emailReminders: e.target.checked })} />
          تذكيرات البريد الإلكتروني للمواعيد
        </label>

        <div className="save-row">
          <button className="primary-btn" type="submit">حفظ التغييرات</button>
          {saved && <span className="saved-note">{saved}</span>}
        </div>
      </form>

      <form className="profile-panel" style={{ marginTop: 22 }} onSubmit={(e) => { e.preventDefault(); changePassword(); }}>
        <h2 className="panel-title">تغيير كلمة المرور</h2>
        <div className="field"><label>كلمة المرور الحالية</label>
          <input type="password" value={pw.currentPassword} onChange={(e) => setPw({ ...pw, currentPassword: e.target.value })} /></div>
        <div className="field"><label>كلمة المرور الجديدة</label>
          <input type="password" value={pw.newPassword} onChange={(e) => setPw({ ...pw, newPassword: e.target.value })} /></div>
        <div className="save-row"><button className="btn-edit" type="submit">تغيير كلمة المرور</button></div>
      </form>
    </DashboardChrome>
  );
}
