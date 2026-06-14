import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DashboardChrome from "../components/DashboardChrome.jsx";
import { contentApi, RESOURCE_CATEGORIES } from "../lib/content.js";

const ALL = "all";
const ICON = { lectures: "🎓", recorded: "🎬", materials: "📄", books: "📚" };

export default function Resources() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const levelId = params.get("level");

  const [levels, setLevels] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selected, setSelected] = useState(null);
  const [resources, setResources] = useState([]);
  const [cat, setCat] = useState(ALL);

  useEffect(() => {
    if (!levelId) contentApi.listLevels().then(setLevels).catch(() => setLevels([]));
  }, [levelId]);

  useEffect(() => {
    if (levelId) {
      contentApi.listSubjects(levelId).then((subs) => {
        setSubjects(subs);
        setSelected(subs[0] || null);
      }).catch(() => setSubjects([]));
    }
  }, [levelId]);

  useEffect(() => {
    if (selected) {
      contentApi.listResources(selected.id).then(setResources).catch(() => setResources([]));
      setCat(ALL);
    }
  }, [selected]);

  if (!levelId) {
    return (
      <DashboardChrome activeTab="resources">
        <section className="resources-panel">
          <h2>{t("resources.chooseLevel")}</h2>
          <div className="level-grid" style={{ width: "100%" }}>
            {levels.map((lvl) => (
              <button key={lvl.id} className="level-card" onClick={() => navigate(`/resources?level=${lvl.id}`)}>
                <span className="level-icon" />
                <strong>{lvl.name}</strong>
              </button>
            ))}
            {levels.length === 0 && <p className="res-empty">{t("resources.noLevels")}</p>}
          </div>
        </section>
      </DashboardChrome>
    );
  }

  const countFor = (key) => resources.filter((r) => r.category === key).length;
  const visibleCats = cat === ALL ? RESOURCE_CATEGORIES : RESOURCE_CATEGORIES.filter((c) => c.key === cat);

  const ResourceCard = (r) => (
    <div className="res-card" key={r.id}>
      <div className="rc-top">
        <span className="rc-icon">{ICON[r.category]}</span>
        <span className="rc-title">{r.title}</span>
      </div>
      {r.description && <p className="rc-desc">{r.description}</p>}
      {r.url && <a className="rc-open" href={r.url} target="_blank" rel="noreferrer">{t("resources.openRes")}</a>}
    </div>
  );

  return (
    <DashboardChrome activeTab="resources">
      <section className="resources-panel">
        <div className="res-layout">
          <aside className="subjects-rail">
            <h3>{t("resources.materials")}</h3>
            {subjects.length === 0 ? (
              <p className="res-empty">{t("resources.noSubjects")}</p>
            ) : (
              subjects.map((s) => (
                <button key={s.id} className={`subject-pill ${selected?.id === s.id ? "active" : ""}`} onClick={() => setSelected(s)}>
                  <span className="sp-icon">📖</span> {s.name}
                </button>
              ))
            )}
          </aside>

          <div className="res-main">
            <h2>{selected ? selected.name : t("tabs.resources")}</h2>
            <p className="res-sub">{t("resources.subjectMaterials")}</p>

            {selected && (
              <div className="res-cats">
                <button className={`res-cat-tab ${cat === ALL ? "active" : ""}`} onClick={() => setCat(ALL)}>
                  {t("resources.all")} <span className="count">{resources.length}</span>
                </button>
                {RESOURCE_CATEGORIES.map((c) => (
                  <button key={c.key} className={`res-cat-tab ${cat === c.key ? "active" : ""}`} onClick={() => setCat(c.key)}>
                    {ICON[c.key]} {t(`cat.${c.key}`)} <span className="count">{countFor(c.key)}</span>
                  </button>
                ))}
              </div>
            )}

            {!selected ? null : resources.length === 0 ? (
              <p className="res-empty">{t("resources.noRes")}</p>
            ) : (
              visibleCats.map((c) => {
                const items = resources.filter((r) => r.category === c.key);
                if (items.length === 0) return null;
                return (
                  <div className="res-section" key={c.key}>
                    <h3 className="res-section-head">{ICON[c.key]} {t(`cat.${c.key}`)}</h3>
                    <div className="res-cards">{items.map(ResourceCard)}</div>
                  </div>
                );
              })
            )}

            {selected && resources.length > 0 && visibleCats.every((c) => countFor(c.key) === 0) && (
              <p className="res-empty">{t("resources.noResSection")}</p>
            )}
          </div>
        </div>
      </section>
    </DashboardChrome>
  );
}
