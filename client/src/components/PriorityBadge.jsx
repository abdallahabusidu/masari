import { priorityClass, priorityText } from "../lib/ui.js";

export default function PriorityBadge({ priority }) {
  return <span className={`priority-badge ${priorityClass(priority)}`}>{priorityText(priority)}</span>;
}
