import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { apiGet, apiPost, apiPatch, apiDelete } from "../lib/api.js";
import DashboardChrome from "../components/DashboardChrome.jsx";
import TaskCard from "../components/TaskCard.jsx";

const emptyForm = { title: "", course: "", deadline: "", priority: "medium", description: "" };
const PRIORITY_RANK = { high: 0, medium: 1, low: 2 };

export default function Tasks() {
  const { t } = useTranslation();
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
    apiGet("/tasks", { params }).then((d) => { setTasks(d.tasks); setSelected([]); });
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
      setError(err.response?.data?.message || t("tasks.addFail"));
    }
  };

  const toggle = async (task) => {
    await apiPatch(`/tasks/${task.id}/status`, { status: task.status === "completed" ? "pending" : "completed" });
    load();
  };
  const remove = async (task) => {
    if (!confirm(`${t("common.delete")} "${task.title}"؟`)) return;
    await apiDelete(`/tasks/${task.id}`);
    load();
  };

  const toggleSelect = (id) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const allSelected = sorted.length > 0 && selected.length === sorted.length;
  const toggleSelectAll = () => setSelected(allSelected ? [] : sorted.map((t2) => t2.id));
  const bulkComplete = async () => {
    await Promise.all(selected.map((id) => {
      const tk = tasks.find((x) => x.id === id);
      return tk && tk.status !== "completed" ? apiPatch(`/tasks/${id}/status`, { status: "completed" }) : null;
    }));
    load();
  };
  const bulkDelete = async () => {
    if (!confirm(`${t("common.delete")} ${selected.length}؟`)) return;
    await Promise.all(selected.map((id) => apiDelete(`/tasks/${id}`)));
    load();
  };

  return (
    <DashboardChrome activeTab="tasks">
      <section className="tasks-panel">
        <h2>{t("tasks.title")}</h2>
        {error && <div className="alert-error">{error}</div>}

        <form className="task-form" onSubmit={addTask}>
          <input placeholder={t("tasks.taskTitle")} required value={form.title} onChange={set("title")} />
          <input placeholder={t("tasks.course")} value={form.course} onChange={set("course")} />
          <input type="date" required value={form.deadline} onChange={set("deadline")} />
          <select value={form.priority} onChange={set("priority")}>
            <option value="high">{t("tasks.pHigh")}</option>
            <option value="medium">{t("tasks.pMedium")}</option>
            <option value="low">{t("tasks.pLow")}</option>
          </select>
          <textarea placeholder={t("tasks.desc")} value={form.description} onChange={set("description")} />
          <button className="primary-btn" type="submit">{t("tasks.addNew")}</button>
        </form>

        <div className="filter-bar">
          <input placeholder={t("tasks.fSearch")} value={filters.search} onChange={setFilter("search")} />
          <input placeholder={t("tasks.fCourse")} value={filters.course} onChange={setFilter("course")} />
          <select value={filters.priority} onChange={setFilter("priority")}>
            <option value="">{t("tasks.allPriorities")}</option>
            <option value="high">{t("priority.high")}</option>
            <option value="medium">{t("priority.medium")}</option>
            <option value="low">{t("priority.low")}</option>
          </select>
          <select value={filters.status} onChange={setFilter("status")}>
            <option value="">{t("tasks.allStatuses")}</option>
            <option value="pending">{t("status.pending")}</option>
            <option value="in_progress">{t("status.in_progress")}</option>
            <option value="completed">{t("status.completed")}</option>
          </select>
        </div>

        <div className="tasks-toolbar">
          <label className="select-all">
            <input type="checkbox" checked={allSelected} onChange={toggleSelectAll} /> {t("tasks.selectAll")}
          </label>
          <div className="sort-wrap">
            <span>{t("tasks.sortBy")}</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="deadline">{t("tasks.sDeadline")}</option>
              <option value="priority">{t("tasks.sPriority")}</option>
              <option value="created">{t("tasks.sNewest")}</option>
            </select>
          </div>
          {selected.length > 0 && (
            <div className="bulk-actions">
              <span>{selected.length} {t("tasks.selected")}</span>
              <button className="done-btn" onClick={bulkComplete}>{t("tasks.done")}</button>
              <button className="delete-btn" onClick={bulkDelete}>{t("common.delete")}</button>
            </div>
          )}
        </div>

        <div className="task-list">
          {sorted.length === 0 ? (
            <p className="panel-loading">{t("tasks.noMatch")}</p>
          ) : (
            sorted.map((tk) => (
              <div className="task-row" key={tk.id}>
                <input type="checkbox" className="task-select" checked={selected.includes(tk.id)} onChange={() => toggleSelect(tk.id)} />
                <div className="task-row-card"><TaskCard task={tk} onToggle={toggle} onDelete={remove} /></div>
              </div>
            ))
          )}
        </div>
      </section>
    </DashboardChrome>
  );
}
