import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminGate from "./AdminGate.jsx";
import AdminShell from "./AdminShell.jsx";
import { contentApi } from "../../lib/content.js";

function Levels() {
  const navigate = useNavigate();
  const [levels, setLevels] = useState([]);
  const [name, setName] = useState("");

  const load = () => contentApi.listLevels().then(setLevels).catch(() => {});
  useEffect(() => { load(); }, []);

  const add = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    await contentApi.createLevel({ name });
    setName("");
    load();
  };
  const edit = async (lvl) => {
    const v = prompt("اسم المستوى", lvl.name);
    if (v && v !== lvl.name) { await contentApi.updateLevel(lvl.id, { name: v }); load(); }
  };
  const del = async (lvl) => {
    if (!confirm(`حذف "${lvl.name}" وكل المواد والمصادر بداخله؟`)) return;
    await contentApi.deleteLevel(lvl.id);
    load();
  };

  return (
    <AdminShell>
      <div className="admin-head">
        <h2>المستويات الدراسية</h2>
      </div>

      <form className="admin-inline-form" onSubmit={add}>
        <input className="grow" placeholder="اسم مستوى جديد" value={name} onChange={(e) => setName(e.target.value)} />
        <button className="primary-btn" type="submit">+ إضافة مستوى</button>
      </form>

      <div className="admin-grid">
        {levels.map((lvl) => (
          <div className="admin-item" key={lvl.id}>
            <span className="ai-title" onClick={() => navigate(`/admin/levels/${lvl.id}`)}>📚 {lvl.name}</span>
            <div className="ai-actions">
              <button className="ai-edit" onClick={() => navigate(`/admin/levels/${lvl.id}`)}>المواد</button>
              <button className="ai-edit" onClick={() => edit(lvl)}>تعديل</button>
              <button className="ai-del" onClick={() => del(lvl)}>حذف</button>
            </div>
          </div>
        ))}
        {levels.length === 0 && <p className="panel-loading">لا توجد مستويات بعد</p>}
      </div>
    </AdminShell>
  );
}

export default function AdminLevels() {
  return <AdminGate><Levels /></AdminGate>;
}
