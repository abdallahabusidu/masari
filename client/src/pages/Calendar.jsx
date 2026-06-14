import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { apiGet, apiPatch } from "../lib/api.js";
import DashboardChrome from "../components/DashboardChrome.jsx";
import { priorityDot } from "../lib/ui.js";

export default function Calendar() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  const load = () =>
    apiGet("/tasks").then((d) =>
      setEvents(
        d.tasks.map((t) => ({
          id: t.id,
          title: t.title,
          start: t.deadline,
          allDay: true,
          backgroundColor: priorityDot(t.priority),
          borderColor: priorityDot(t.priority),
        }))
      )
    );
  useEffect(() => { load(); }, []);

  const onDrop = async (info) => {
    try {
      await apiPatch(`/tasks/${info.event.id}`, { deadline: info.event.start.toISOString() });
    } catch {
      info.revert();
    }
  };

  return (
    <DashboardChrome activeTab="timeline">
      <section className="tasks-panel calendar-panel">
        <h2>التقويم الأكاديمي</h2>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          direction="rtl"
          locale="ar"
          height="auto"
          editable
          headerToolbar={{ start: "title", center: "", end: "dayGridMonth,timeGridWeek today prev,next" }}
          buttonText={{ today: "اليوم", month: "شهر", week: "أسبوع" }}
          events={events}
          eventClick={(info) => navigate(`/tasks/${info.event.id}`)}
          eventDrop={onDrop}
          dateClick={() => navigate("/tasks")}
        />
        <div className="calendar-legend">
          <span><i className="dot" style={{ background: "#e62626" }} /> عالية</span>
          <span><i className="dot" style={{ background: "#f59e0b" }} /> متوسطة</span>
          <span><i className="dot" style={{ background: "#94a3b8" }} /> منخفضة</span>
        </div>
      </section>
    </DashboardChrome>
  );
}
