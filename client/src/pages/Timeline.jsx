import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGet } from "../lib/api.js";
import DashboardChrome from "../components/DashboardChrome.jsx";
import { formatDate, daysUntil, isOverdue } from "../lib/ui.js";

function timeOf(deadline) {
  const d = new Date(deadline);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export default function Timeline() {
  const navigate = useNavigate();
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
          <h2 style={{ margin: 0 }}>المخطط الزمني</h2>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn-edit" onClick={load}>تحديث</button>
            <button className="primary-btn" onClick={() => navigate("/calendar")}>عرض التقويم</button>
          </div>
        </div>
        {!loaded ? (
          <p className="panel-loading">جارٍ التحميل...</p>
        ) : tasks.length === 0 ? (
          <p className="panel-loading">لا توجد مهام في المخطط الزمني</p>
        ) : (
          tasks.map((t) => {
            const urgent = isOverdue(t) || daysUntil(t.deadline) <= 1;
            return (
              <div key={t.id} className="timeline-row" style={{ cursor: "pointer" }} onClick={() => navigate(`/tasks/${t.id}`)}>
                <div className="timeline-time">{timeOf(t.deadline)}</div>
                <div className="timeline-task">
                  <div className={urgent ? "date-red" : "date-blue"}>{formatDate(t.deadline)}</div>
                  <strong>{t.title}</strong>
                  <p>{t.course || "بدون مادة"}</p>
                </div>
              </div>
            );
          })
        )}
      </section>
    </DashboardChrome>
  );
}
