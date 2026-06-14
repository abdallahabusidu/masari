import { useTranslation } from "react-i18next";
import { priorityClass } from "../lib/ui.js";

export default function PriorityBadge({ priority }) {
  const { t } = useTranslation();
  return <span className={`priority-badge ${priorityClass(priority)}`}>{t(`priority.${priority}`)}</span>;
}
