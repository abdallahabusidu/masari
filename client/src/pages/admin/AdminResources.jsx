import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminGate from "./AdminGate.jsx";
import AdminShell from "./AdminShell.jsx";
import { contentApi, RESOURCE_CATEGORIES, categoryLabel } from "../../lib/content.js";

const emptyForm = { category: "lectures", title: "", url: "", description: "" };

function Resources() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const [resources, setResources] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const load = () => contentApi.listResources(subjectId).then(setResources).catch(() => {});
  useEffect(() => { load(); }, [subjectId]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const add = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.title.trim()) return;
    try {
      await contentApi.createResource({ subject: subjectId, ...form });
      setForm(emptyForm);
      load();
    } catch (err) {
      setError(err.response?.data?.message || "تعذّر إضافة المصدر");
    }
  };
  const edit = async (r) => {
    const v = prompt("عنوان المصدر", r.title);
    if (v && v !== r.title) { await contentApi.updateResource(r.id, { title: v }); load(); }
  };
  const editUrl = async (r) => {
    const v = prompt("الرابط (URL)", r.url || "");
    if (v !== null) { await contentApi.updateResource(r.id, { url: v }); load(); }
  };
  const del = async (r) => {
    if (!confirm(`حذف "${r.title}"؟`)) return;
    await contentApi.deleteResource(r.id);
    load();
  };

  return (
    <AdminShell>
      <div className="admin-crumbs">
        <a onClick={() => navigate("/admin")}>المستويات</a> / <a onClick={() => navigate(-1)}>المواد</a> / المصادر
      </div>
      <div className="admin-head"><h2>مصادر المادة</h2></div>

      {error && <div className="alert-error">{error}</div>}
      <form className="admin-inline-form" onSubmit={add}>
        <select value={form.category} onChange={set("category")}>
          {RESOURCE_CATEGORIES.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
        </select>
        <input className="grow" placeholder="عنوان المصدر" value={form.title} onChange={set("title")} />
        <input className="grow" placeholder="الرابط (اختياري)" value={form.url} onChange={set("url")} />
        <button className="primary-btn" type="submit">+ إضافة مصدر</button>
      </form>

      {RESOURCE_CATEGORIES.map((cat) => {
        const items = resources.filter((r) => r.category === cat.key);
        return (
          <div className="admin-cat-block" key={cat.key}>
            <h3>{cat.label} <span style={{ color: "var(--muted)", fontSize: 13 }}>({items.length})</span></h3>
            {items.length === 0 ? (
              <p className="muted-note">لا توجد عناصر</p>
            ) : (
              items.map((r) => (
                <div className="res-row" key={r.id}>
                  <div>
                    <strong>{r.title}</strong>{" "}
                    {r.url && <a href={r.url} target="_blank" rel="noreferrer">↗ فتح</a>}
                  </div>
                  <div className="ai-actions">
                    <button className="ai-edit" onClick={() => edit(r)}>عنوان</button>
                    <button className="ai-edit" onClick={() => editUrl(r)}>رابط</button>
                    <button className="ai-del" onClick={() => del(r)}>حذف</button>
                  </div>
                </div>
              ))
            )}
          </div>
        );
      })}
    </AdminShell>
  );
}

export default function AdminResources() {
  return <AdminGate><Resources /></AdminGate>;
}
