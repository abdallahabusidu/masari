import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { apiGet } from "../lib/api.js";
import DashboardChrome from "../components/DashboardChrome.jsx";
import { formatDate, daysUntil, isOverdue } from "../lib/ui.js";

function timeOf(deadline) {
  const d = new Date(deadline);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export default function Timeline() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [tasks, setTasks] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const load = () => {
    apiGet("/tasks").then((d) => {
      setTasks([...d.tasks].sort((a, b) => new Date(a.deadline) - new Date(b.deadline)));
      setLoaded(true);
    });
  };
  useEffect(load, []);

  return (
    <DashboardChrome activeTab="timeline">
      <section className="timeline-panel">
        <div className="task-card-head" style={{ marginBottom: 20 }}>
          <h2 style={{ margin: 0 }}>{t("timeline.title")}</h2>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn-edit" onClick={load}>{t("timeline.refresh")}</button>
            <button className="primary-btn" onClick={() => navigate("/calendar")}>{t("timeline.viewCalendar")}</button>
          </div>
        </div>
        {!loaded ? (
          <p className="panel-loading">{t("common.loading")}</p>
        ) : tasks.length === 0 ? (
          <p className="panel-loading">{t("timeline.empty")}</p>
        ) : (
          tasks.map((tk) => {
            const urgent = isOverdue(tk) || daysUntil(tk.deadline) <= 1;
            return (
              <div key={tk.id} className="timeline-row" style={{ cursor: "pointer" }} onClick={() => navigate(`/tasks/${tk.id}`)}>
                <div className="timeline-time">{timeOf(tk.deadline)}</div>
                <div className="timeline-task">
                  <div className={urgent ? "date-red" : "date-blue"}>{formatDate(tk.deadline)}</div>
                  <strong>{tk.title}</strong>
                  <p>{tk.course || t("tasks.noCourse")}</p>
                </div>
              </div>
            );
          })
        )}
      </section>
    </DashboardChrome>
  );
}
