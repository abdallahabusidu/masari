import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardChrome from "../components/DashboardChrome.jsx";
import { contentApi } from "../lib/content.js";
import { LEVELS } from "../lib/data.js";

// Native "مستواك الخاص" landing: level cards loaded from the admin-managed content.
export default function Dashboard() {
  const navigate = useNavigate();
  const [levels, setLevels] = useState(null);

  useEffect(() => {
    contentApi
      .listLevels()
      .then((l) => setLevels(l))
      .catch(() => setLevels([]));
  }, []);

  // Fallback to the static names if the DB has none yet.
  const cards =
    levels === null
      ? null
      : levels.length
        ? levels
        : LEVELS.map((name) => ({ id: null, name }));

  return (
    <DashboardChrome activeTab="dashboard">
      {cards === null ? (
        <p className="panel-loading">جارٍ التحميل...</p>
      ) : (
        <div className="level-grid">
          {cards.map((lvl) => (
            <button
              key={lvl.id || lvl.name}
              className="level-card"
              onClick={() => navigate(lvl.id ? `/resources?level=${lvl.id}` : "/resources")}
            >
              <span className="level-icon" />
              <strong>{lvl.name}</strong>
            </button>
          ))}
        </div>
      )}
    </DashboardChrome>
  );
}
