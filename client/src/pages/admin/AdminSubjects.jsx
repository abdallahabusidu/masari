import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AdminGate from "./AdminGate.jsx";
import AdminShell from "./AdminShell.jsx";
import { contentApi } from "../../lib/content.js";

function Subjects() {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
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
    const v = prompt(t("admin.titleBtn"), s.name);
    if (v && v !== s.name) { await contentApi.updateSubject(s.id, { name: v }); load(); }
  };
  const del = async (s) => {
    if (!confirm(`${t("common.delete")} "${s.name}"؟`)) return;
    await contentApi.deleteSubject(s.id);
    load();
  };

  return (
    <AdminShell>
      <div className="admin-crumbs">
        <a onClick={() => navigate("/admin")}>{t("admin.bcLevels")}</a> / {t("admin.subjects")}
      </div>
      <div className="admin-head"><h2>{t("admin.levelSubjects")}</h2></div>
      <form className="admin-inline-form" onSubmit={add}>
        <input className="grow" placeholder={t("admin.newSubject")} value={name} onChange={(e) => setName(e.target.value)} />
        <button className="primary-btn" type="submit">{t("admin.addSubject")}</button>
      </form>
      <div className="admin-grid">
        {subjects.map((s) => (
          <div className="admin-item" key={s.id}>
            <span className="ai-title" onClick={() => navigate(`/admin/subjects/${s.id}`)}>📖 {s.name}</span>
            <div className="ai-actions">
              <button className="ai-edit" onClick={() => navigate(`/admin/subjects/${s.id}`)}>{t("admin.resources")}</button>
              <button className="ai-edit" onClick={() => edit(s)}>{t("common.edit")}</button>
              <button className="ai-del" onClick={() => del(s)}>{t("common.delete")}</button>
            </div>
          </div>
        ))}
        {subjects.length === 0 && <p className="panel-loading">{t("admin.noSubjects")}</p>}
      </div>
    </AdminShell>
  );
}

export default function AdminSubjects() {
  return <AdminGate><Subjects /></AdminGate>;
}
