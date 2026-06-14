import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useTranslation } from "react-i18next";
import { apiGet, apiPatch } from "../lib/api.js";
import DashboardChrome from "../components/DashboardChrome.jsx";
import { priorityDot } from "../lib/ui.js";

export default function Calendar() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
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
        <h2>{t("calendar.title")}</h2>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          direction={i18n.language === "ar" ? "rtl" : "ltr"}
          locale={i18n.language}
          height="auto"
          editable
          headerToolbar={{ start: "title", center: "", end: "dayGridMonth,timeGridWeek today prev,next" }}
          buttonText={{ today: t("calendar.today"), month: t("calendar.month"), week: t("calendar.week") }}
          events={events}
          eventClick={(info) => navigate(`/tasks/${info.event.id}`)}
          eventDrop={onDrop}
          dateClick={() => navigate("/tasks")}
        />
        <div className="calendar-legend">
          <span><i className="dot" style={{ background: "#e62626" }} /> {t("priority.high")}</span>
          <span><i className="dot" style={{ background: "#f59e0b" }} /> {t("priority.medium")}</span>
          <span><i className="dot" style={{ background: "#94a3b8" }} /> {t("priority.low")}</span>
        </div>
      </section>
    </DashboardChrome>
  );
}
