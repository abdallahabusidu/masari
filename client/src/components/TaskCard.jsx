import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PriorityBadge from "./PriorityBadge.jsx";
import { formatDate, isOverdue } from "../lib/ui.js";

export default function TaskCard({ task, onToggle, onDelete }) {
  const { t } = useTranslation();
  const id = task.id;
  const completed = task.status === "completed";
  const overdue = isOverdue(task);

  return (
    <div className={`task-card ${completed ? "completed" : ""}`}>
      <div className="task-card-head">
        <div>
          <h3><Link to={`/tasks/${id}`}>{task.title}</Link></h3>
          <p>
            {task.course || t("tasks.noCourse")} | {t("tasks.deadlineLabel")}: {formatDate(task.deadline)}
            {overdue && !completed ? ` (${t("tasks.overdue")})` : ""}
          </p>
          {task.description && <p>{task.description}</p>}
        </div>
        <PriorityBadge priority={task.priority} />
      </div>

      <div className="task-actions task-card-head">
        <button className="done-btn" onClick={() => onToggle?.(task)}>
          {completed ? t("tasks.undo") : t("tasks.markDone")}
        </button>
        <button className="delete-btn" onClick={() => onDelete?.(task)}>{t("common.delete")}</button>
      </div>
    </div>
  );
}
