import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AdminGate from "./AdminGate.jsx";
import AdminShell from "./AdminShell.jsx";
import { contentApi } from "../../lib/content.js";

function Levels() {
  const navigate = useNavigate();
  const { t } = useTranslation();
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
    const v = prompt(t("admin.titleBtn"), lvl.name);
    if (v && v !== lvl.name) { await contentApi.updateLevel(lvl.id, { name: v }); load(); }
  };
  const del = async (lvl) => {
    if (!confirm(`${t("common.delete")} "${lvl.name}"؟`)) return;
    await contentApi.deleteLevel(lvl.id);
    load();
  };

  return (
    <AdminShell>
      <div className="admin-head"><h2>{t("admin.levels")}</h2></div>
      <form className="admin-inline-form" onSubmit={add}>
        <input className="grow" placeholder={t("admin.newLevel")} value={name} onChange={(e) => setName(e.target.value)} />
        <button className="primary-btn" type="submit">{t("admin.addLevel")}</button>
      </form>
      <div className="admin-grid">
        {levels.map((lvl) => (
          <div className="admin-item" key={lvl.id}>
            <span className="ai-title" onClick={() => navigate(`/admin/levels/${lvl.id}`)}>📚 {lvl.name}</span>
            <div className="ai-actions">
              <button className="ai-edit" onClick={() => navigate(`/admin/levels/${lvl.id}`)}>{t("admin.subjects")}</button>
              <button className="ai-edit" onClick={() => edit(lvl)}>{t("common.edit")}</button>
              <button className="ai-del" onClick={() => del(lvl)}>{t("common.delete")}</button>
            </div>
          </div>
        ))}
        {levels.length === 0 && <p className="panel-loading">{t("admin.noLevels")}</p>}
      </div>
    </AdminShell>
  );
}

export default function AdminLevels() {
  return <AdminGate><Levels /></AdminGate>;
}
