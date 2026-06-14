import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminGate from "./AdminGate.jsx";
import AdminShell from "./AdminShell.jsx";
import { contentApi } from "../../lib/content.js";

function Subjects() {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [name, setName] = useState("");

  const load = () => contentApi.listSubjects(levelId).then(setSubjects).catch(() => {});
  useEffect(() => { load(); }, [levelId]);

  const add = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    await contentApi.createSubject({ level: levelId, name });
    setName("");
    load();
  };
  const edit = async (s) => {
    const v = prompt("اسم المادة", s.name);
    if (v && v !== s.name) { await contentApi.updateSubject(s.id, { name: v }); load(); }
  };
  const del = async (s) => {
    if (!confirm(`حذف مادة "${s.name}" وكل مصادرها؟`)) return;
    await contentApi.deleteSubject(s.id);
    load();
  };

  return (
    <AdminShell>
      <div className="admin-crumbs">
        <a onClick={() => navigate("/admin")}>المستويات</a> / المواد
      </div>
      <div className="admin-head"><h2>مواد المستوى</h2></div>

      <form className="admin-inline-form" onSubmit={add}>
        <input className="grow" placeholder="اسم مادة جديدة" value={name} onChange={(e) => setName(e.target.value)} />
        <button className="primary-btn" type="submit">+ إضافة مادة</button>
      </form>

      <div className="admin-grid">
        {subjects.map((s) => (
          <div className="admin-item" key={s.id}>
            <span className="ai-title" onClick={() => navigate(`/admin/subjects/${s.id}`)}>📖 {s.name}</span>
            <div className="ai-actions">
              <button className="ai-edit" onClick={() => navigate(`/admin/subjects/${s.id}`)}>المصادر</button>
              <button className="ai-edit" onClick={() => edit(s)}>تعديل</button>
              <button className="ai-del" onClick={() => del(s)}>حذف</button>
            </div>
          </div>
        ))}
        {subjects.length === 0 && <p className="panel-loading">لا توجد مواد بعد</p>}
      </div>
    </AdminShell>
  );
}

export default function AdminSubjects() {
  return <AdminGate><Subjects /></AdminGate>;
}
