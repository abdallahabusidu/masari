import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { apiGet, apiPatch, apiDelete } from "../lib/api.js";

function timeAgo(date) {
  const mins = Math.floor((Date.now() - new Date(date).getTime()) / 60000);
  if (mins < 1) return "الآن";
  if (mins < 60) return `قبل ${mins} دقيقة`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `قبل ${hrs} ساعة`;
  return `قبل ${Math.floor(hrs / 24)} يوم`;
}

export default function NotificationBell() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [unread, setUnread] = useState(0);
  const ref = useRef(null);

  const load = useCallback(() => {
    apiGet("/notifications")
      .then((d) => {
        setItems(d.notifications);
        setUnread(d.unread);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    load();
    const id = setInterval(load, 60000);
    return () => clearInterval(id);
  }, [load]);

  useEffect(() => {
    const onClick = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const openItem = async (n) => {
    if (!n.read) await apiPatch(`/notifications/${n.id}/read`);
    if (n.link) navigate(n.link);
    setOpen(false);
    load();
  };
  const markAll = async () => { await apiPatch("/notifications/read-all"); load(); };
  const remove = async (e, n) => { e.stopPropagation(); await apiDelete(`/notifications/${n.id}`); load(); };

  return (
    <div className="notif-wrap" ref={ref}>
      <button className="round-icon notif-btn" title={t("notif.title")} onClick={() => { setOpen((o) => !o); load(); }}>
        🔔
        {unread > 0 && <span className="notif-badge">{unread > 9 ? "9+" : unread}</span>}
      </button>

      {open && (
        <div className="notif-panel">
          <div className="notif-head">
            <strong>{t("notif.title")}</strong>
            <div className="notif-head-actions">
              <button onClick={load} title={t("timeline.refresh")}>⟳</button>
              {unread > 0 && <button onClick={markAll}>{t("notif.markAll")}</button>}
            </div>
          </div>
          {items.length === 0 ? (
            <p className="notif-empty">{t("notif.empty")}</p>
          ) : (
            <ul className="notif-list">
              {items.map((n) => (
                <li key={n.id} className={`notif-item ${n.read ? "" : "unread"} ${n.type}`} onClick={() => openItem(n)}>
                  <div className="notif-dot" />
                  <div className="notif-body">
                    <p>{n.message}</p>
                    <span>{timeAgo(n.createdAt)}</span>
                  </div>
                  <button className="notif-del" onClick={(e) => remove(e, n)} title="حذف">×</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
