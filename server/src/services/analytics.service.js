import { Task } from "../models/task.model.js";

const DAY_MS = 86400000;

// Productivity analytics derived from the user's (non-archived) tasks.
export async function getProgress(userId) {
  const now = new Date();
  const tasks = await Task.find({ owner: userId, archived: false });

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  const pending = total - completed;
  const overdue = tasks.filter((t) => t.status !== "completed" && t.deadline && t.deadline < now).length;
  const completionRate = total ? Math.round((completed / total) * 100) : 0;

  // Per-course distribution
  const byCourseMap = {};
  for (const t of tasks) {
    const key = t.course || "غير مصنّف";
    byCourseMap[key] = (byCourseMap[key] || 0) + 1;
  }
  const byCourse = Object.entries(byCourseMap).map(([course, count]) => ({ course, count }));

  // Weekly trend: created vs completed per day (last 7 days)
  const weeklyTrend = [];
  for (let i = 6; i >= 0; i--) {
    const day = new Date(now);
    day.setHours(0, 0, 0, 0);
    day.setDate(day.getDate() - i);
    const next = new Date(day.getTime() + DAY_MS);
    weeklyTrend.push({
      date: day.toISOString().slice(0, 10),
      created: tasks.filter((t) => t.createdAt >= day && t.createdAt < next).length,
      completed: tasks.filter((t) => t.completedAt && t.completedAt >= day && t.completedAt < next).length,
    });
  }

  return { summary: { total, completed, pending, overdue, completionRate }, byCourse, weeklyTrend };
}
