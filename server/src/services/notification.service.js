import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";
import { Notification } from "../models/notification.model.js";

const DAY_MS = 86400000;
const dateKey = (d) => new Date(d).toISOString().slice(0, 10);

// Generate deadline/overdue reminders for a user's pending tasks (deduped via key).
export async function generateForUser(userId) {
  const now = Date.now();
  const soon = now + DAY_MS;
  const tasks = await Task.find({ owner: userId, archived: false, status: { $ne: "completed" } });

  for (const task of tasks) {
    if (!task.deadline) continue;
    const dl = new Date(task.deadline).getTime();
    if (dl > soon) continue;

    const overdue = dl < now;
    const type = overdue ? "overdue" : "deadline";
    const key = `${type}:${task._id}:${dateKey(task.deadline)}`;
    const message = overdue
      ? `لقد تأخرت عن تسليم "${task.title}"`
      : `اقترب موعد تسليم "${task.title}" (خلال 24 ساعة)`;

    try {
      await Notification.updateOne(
        { user: userId, key },
        {
          $setOnInsert: {
            user: userId,
            type,
            title: overdue ? "مهمة متأخرة" : "موعد قريب",
            message,
            link: `/tasks/${task._id}`,
            key,
            read: false,
          },
        },
        { upsert: true }
      );
    } catch (err) {
      if (err?.code !== 11000) throw err;
    }
  }
}

export async function generateForAll() {
  const users = await User.find({}, { _id: 1 });
  for (const u of users) await generateForUser(u._id);
}

export async function listForUser(userId) {
  await generateForUser(userId);
  const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 }).limit(50);
  const unread = await Notification.countDocuments({ user: userId, read: false });
  return { notifications, unread };
}

export async function markRead(userId, id) {
  return Notification.findOneAndUpdate({ _id: id, user: userId }, { read: true }, { new: true });
}

export async function markAllRead(userId) {
  await Notification.updateMany({ user: userId, read: false }, { read: true });
}

export async function remove(userId, id) {
  return Notification.findOneAndDelete({ _id: id, user: userId });
}
