import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { apiGet, apiPost, apiPatch, apiDelete } from "../lib/api.js";
import DashboardChrome from "../components/DashboardChrome.jsx";
import TaskCard from "../components/TaskCard.jsx";

const emptyForm = { title: "", course: "", deadline: "", priority: "medium", description: "" };
const PRIORITY_RANK = { high: 0, medium: 1, low: 2 };

export default function Tasks() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [filters, setFilters] = useState({ priority: "", course: "", status: "", search: searchParams.get("search") || "" });
  const [sort, setSort] = useState("deadline");
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const q = searchParams.get("search") || "";
    setFilters((f) => (f.search === q ? f : { ...f, search: q }));
  }, [searchParams]);

  const load = useCallback(() => {
    const params = {};
    if (filters.priority) params.priority = filters.priority;
    if (filters.status) params.status = filters.status;
    if (filters.course) params.course = filters.course;
    if (filters.search) params.search = filters.search;
    apiGet("/tasks", { params }).then((d) => {
      setTasks(d.tasks);
      setSelected([]);
    });
  }, [filters]);

  useEffect(() => { load(); }, [load]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const setFilter = (k) => (e) => {
    const value = e.target.value;
    setFilters((f) => ({ ...f, [k]: value }));
    if (k === "search") {
      const next = new URLSearchParams(searchParams);
      value ? next.set("search", value) : next.delete("search");
      setSearchParams(next, { replace: true });
    }
  };

  const sorted = [...tasks].sort((a, b) => {
    if (sort === "priority") return PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];
    if (sort === "created") return new Date(b.createdAt) - new Date(a.createdAt);
    return new Date(a.deadline) - new Date(b.deadline);
  });

  const addTask = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await apiPost("/tasks", form);
      setForm(emptyForm);
      load();
    } catch (err) {
      setError(err.response?.data?.message || "تعذر إضافة المهمة");
    }
  };

  const toggle = async (task) => {
    await apiPatch(`/tasks/${task.id}/status`, { status: task.status === "completed" ? "pending" : "completed" });
    load();
  };
  const remove = async (task) => {
    if (!confirm(`حذف المهمة "${task.title}"؟`)) return;
    await apiDelete(`/tasks/${task.id}`);
    load();
  };

  const toggleSelect = (id) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const allSelected = sorted.length > 0 && selected.length === sorted.length;
  const toggleSelectAll = () => setSelected(allSelected ? [] : sorted.map((t) => t.id));
  const bulkComplete = async () => {
    await Promise.all(selected.map((id) => {
      const t = tasks.find((x) => x.id === id);
      return t && t.status !== "completed" ? apiPatch(`/tasks/${id}/status`, { status: "completed" }) : null;
    }));
    load();
  };
  const bulkDelete = async () => {
    if (!confirm(`حذف ${selected.length} مهمة؟`)) return;
    await Promise.all(selected.map((id) => apiDelete(`/tasks/${id}`)));
    load();
  };

  return (
    <DashboardChrome activeTab="tasks">
      <section className="tasks-panel">
        <h2>إدارة المهام الأكاديمية</h2>
        {error && <div className="alert-error">{error}</div>}

        <form className="task-form" onSubmit={addTask}>
          <input placeholder="عنوان المهمة" required value={form.title} onChange={set("title")} />
          <input placeholder="اسم المادة" value={form.course} onChange={set("course")} />
          <input type="date" required value={form.deadline} onChange={set("deadline")} />
          <select value={form.priority} onChange={set("priority")}>
            <option value="high">أولوية عالية</option>
            <option value="medium">أولوية متوسطة</option>
            <option value="low">أولوية منخفضة</option>
          </select>
          <textarea placeholder="وصف المهمة" value={form.description} onChange={set("description")} />
          <button className="primary-btn" type="submit">إضافة مهمة جديدة</button>
        </form>

        <div className="filter-bar">
          <input placeholder="بحث..." value={filters.search} onChange={setFilter("search")} />
          <input placeholder="المادة" value={filters.course} onChange={setFilter("course")} />
          <select value={filters.priority} onChange={setFilter("priority")}>
            <option value="">كل الأولويات</option>
            <option value="high">عالية</option>
            <option value="medium">متوسطة</option>
            <option value="low">منخفضة</option>
          </select>
          <select value={filters.status} onChange={setFilter("status")}>
            <option value="">كل الحالات</option>
            <option value="pending">قيد المتابعة</option>
            <option value="in_progress">قيد التنفيذ</option>
            <option value="completed">مكتملة</option>
          </select>
        </div>

        <div className="tasks-toolbar">
          <label className="select-all">
            <input type="checkbox" checked={allSelected} onChange={toggleSelectAll} /> تحديد الكل
          </label>
          <div className="sort-wrap">
            <span>ترتيب حسب:</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="deadline">الموعد النهائي</option>
              <option value="priority">الأولوية</option>
              <option value="created">الأحدث</option>
            </select>
          </div>
          {selected.length > 0 && (
            <div className="bulk-actions">
              <span>{selected.length} محددة</span>
              <button className="done-btn" onClick={bulkComplete}>إنجاز</button>
              <button className="delete-btn" onClick={bulkDelete}>حذف</button>
            </div>
          )}
        </div>

        <div className="task-list">
          {sorted.length === 0 ? (
            <p className="panel-loading">لا توجد مهام مطابقة</p>
          ) : (
            sorted.map((t) => (
              <div className="task-row" key={t.id}>
                <input type="checkbox" className="task-select" checked={selected.includes(t.id)} onChange={() => toggleSelect(t.id)} />
                <div className="task-row-card"><TaskCard task={t} onToggle={toggle} onDelete={remove} /></div>
              </div>
            ))
          )}
        </div>
      </section>
    </DashboardChrome>
  );
}
