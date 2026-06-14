import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { apiGet, apiPatch, apiPost, apiDelete } from "../lib/api.js";
import DashboardChrome from "../components/DashboardChrome.jsx";
import PriorityBadge from "../components/PriorityBadge.jsx";
import { formatDate, daysUntil, isOverdue } from "../lib/ui.js";

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [task, setTask] = useState(null);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(null);
  const [newSub, setNewSub] = useState("");

  const load = () => apiGet(`/tasks/${id}`).then((d) => setTask(d.task));
  useEffect(() => { load(); }, [id]);

  const body = (content) => <DashboardChrome activeTab="tasks">{content}</DashboardChrome>;
  if (!task) return body(<p className="panel-loading">{t("common.loading")}</p>);

  const subs = task.subTasks || [];
  const doneCount = subs.filter((s) => s.done).length;
  const progress = subs.length ? Math.round((doneCount / subs.length) * 100) : task.status === "completed" ? 100 : 0;
  const days = daysUntil(task.deadline);
  const overdue = isOverdue(task);

  const save = async () => {
    await apiPatch(`/tasks/${id}`, { title: draft.title, course: draft.course, description: draft.description, priority: draft.priority, deadline: draft.deadline });
    setEditing(false);
    load();
  };
  const toggleStatus = async () => {
    await apiPatch(`/tasks/${id}/status`, { status: task.status === "completed" ? "pending" : "completed" });
    load();
  };
  const toggleSub = async (idx, done) => { await apiPatch(`/tasks/${id}/subtasks/${idx}`, { done }); load(); };
  const addSub = async () => {
    if (!newSub.trim()) return;
    await apiPost(`/tasks/${id}/subtasks`, { title: newSub });
    setNewSub("");
    load();
  };
  const remove = async () => {
    if (!confirm(t("common.delete") + "؟")) return;
    await apiDelete(`/tasks/${id}`);
    navigate("/tasks");
  };

  return body(
    <section className="detail-panel">
      {editing ? (
        <div className="profile-panel" style={{ width: "100%", padding: 0 }}>
          <div className="field"><label>{t("tasks.taskTitle")}</label><input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} /></div>
          <div className="field-row">
            <div className="field"><label>{t("tasks.course")}</label><input value={draft.course} onChange={(e) => setDraft({ ...draft, course: e.target.value })} /></div>
            <div className="field"><label>{t("tasks.deadlineLabel")}</label><input type="date" value={draft.deadline?.slice(0, 10)} onChange={(e) => setDraft({ ...draft, deadline: e.target.value })} /></div>
          </div>
          <div className="field"><label>{t("tasks.sPriority")}</label>
            <select value={draft.priority} onChange={(e) => setDraft({ ...draft, priority: e.target.value })}>
              <option value="high">{t("priority.high")}</option><option value="medium">{t("priority.medium")}</option><option value="low">{t("priority.low")}</option>
            </select>
          </div>
          <div className="field"><label>{t("tasks.desc")}</label>
            <textarea className="full" style={{ minHeight: 100, border: "1px solid #cdd9e2", borderRadius: 8, padding: 12 }}
              value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
          </div>
          <div className="save-row">
            <button className="primary-btn" onClick={save}>{t("common.save")}</button>
            <button className="btn-ghost" onClick={() => setEditing(false)}>{t("common.cancel")}</button>
          </div>
        </div>
      ) : (
        <>
          <div className="detail-head">
            <h1>{task.title}</h1>
            <PriorityBadge priority={task.priority} />
          </div>
          <div className="detail-badges">
            {task.course && <span className="chip course">{task.course}</span>}
            <span className={`chip ${overdue ? "danger" : "neutral"}`}>{overdue ? t("tasks.overdue") : `${days} ${t("detail.remaining")}`}</span>
            <span className="chip neutral">{formatDate(task.deadline)}</span>
          </div>
          {task.description && <p className="detail-desc">{task.description}</p>}

          <div className="countdown-progress">
            <div className="cp-top"><span>{t("detail.progress")}</span><span>{progress}%</span></div>
            <div className="progress-track"><div className="progress-fill" style={{ width: `${progress}%`, background: "#83d9a1" }} /></div>
          </div>

          <h3 className="detail-section-title">{t("detail.subtasks")}</h3>
          <ul className="subtask-list">
            {subs.map((s, i) => (
              <li key={s._id || i} className={s.done ? "done" : ""}>
                <input type="checkbox" checked={s.done} onChange={(e) => toggleSub(i, e.target.checked)} />
                <span>{s.title}</span>
              </li>
            ))}
          </ul>
          <div className="subtask-add">
            <input value={newSub} onChange={(e) => setNewSub(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSub())} placeholder={t("detail.addSub")} />
            <button onClick={addSub}>+</button>
          </div>

          <div className="detail-actions">
            <button className="done-btn" onClick={toggleStatus}>{task.status === "completed" ? t("detail.unmark") : t("detail.markComplete")}</button>
            <button className="btn-edit" onClick={() => { setDraft({ ...task }); setEditing(true); }}>{t("common.edit")}</button>
            <button className="delete-btn" onClick={remove}>{t("common.delete")}</button>
          </div>
        </>
      )}
    </section>
  );
}
