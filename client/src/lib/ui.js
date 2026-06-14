// Shared UI helpers (ported from the native project; enums are now lowercase).

export function priorityText(priority) {
  if (priority === "high") return "عالية";
  if (priority === "medium") return "متوسطة";
  return "منخفضة";
}

export function priorityClass(priority) {
  if (priority === "high") return "priority-high";
  if (priority === "medium") return "priority-medium";
  return "priority-low";
}

export function priorityDot(priority) {
  if (priority === "high") return "#e62626";
  if (priority === "medium") return "#f59e0b";
  return "#94a3b8";
}

export function statusText(status) {
  if (status === "completed") return "مكتملة";
  if (status === "in_progress") return "قيد التنفيذ";
  return "قيد المتابعة";
}

export function formatDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" });
}

export function daysUntil(value) {
  if (!value) return null;
  const ms = new Date(value).setHours(23, 59, 59, 999) - Date.now();
  return Math.ceil(ms / 86400000);
}

export function isOverdue(task) {
  return task.status !== "completed" && new Date(task.deadline) < new Date();
}
