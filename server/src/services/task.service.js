import { Task } from "../models/task.model.js";
import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";

const PRIORITY_RANK = { high: 0, medium: 1, low: 2 };

// Fetch a task the user owns, or throw 404 (also hides others' tasks).
async function findOwned(taskId, userId) {
  const task = await Task.findOne({ _id: taskId, owner: userId });
  if (!task) throw ApiError.notFound("Task not found");
  return task;
}

export async function listTasks(userId, query = {}) {
  const filter = { owner: userId };
  if (query.archived === "true") filter.archived = true;
  else filter.archived = false;
  if (query.priority) filter.priority = query.priority;
  if (query.status) filter.status = query.status;
  if (query.group) filter.group = query.group;
  if (query.course) filter.course = new RegExp(query.course, "i");
  if (query.search) filter.title = new RegExp(query.search, "i");
  if (query.from || query.to) {
    filter.deadline = {};
    if (query.from) filter.deadline.$gte = query.from;
    if (query.to) filter.deadline.$lte = query.to;
  }

  const page = query.page || 1;
  const limit = query.limit || 50;

  let sortSpec = { deadline: 1 };
  if (query.sort === "created") sortSpec = { createdAt: 1 };
  if (query.sort === "-created") sortSpec = { createdAt: -1 };

  let tasks = await Task.find(filter)
    .sort(sortSpec)
    .skip((page - 1) * limit)
    .limit(limit);

  // Priority is a custom rank, sorted in memory.
  if (query.sort === "priority") {
    tasks = tasks.sort((a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority]);
  }

  const total = await Task.countDocuments(filter);
  return { tasks, page, limit, total };
}

export async function createTask(userId, data) {
  return Task.create({ ...data, owner: userId });
}

export async function getTask(taskId, userId) {
  return findOwned(taskId, userId);
}

export async function updateTask(taskId, userId, updates) {
  const task = await findOwned(taskId, userId);
  Object.assign(task, updates);
  if (updates.status === "completed") task.completedAt = new Date();
  if (updates.status && updates.status !== "completed") task.completedAt = null;
  await task.save();
  return task;
}

export async function setStatus(taskId, userId, status) {
  const task = await findOwned(taskId, userId);
  task.status = status;
  task.completedAt = status === "completed" ? new Date() : null;
  await task.save();
  return task;
}

export async function archiveTask(taskId, userId) {
  const task = await findOwned(taskId, userId);
  task.archived = true;
  await task.save();
  return task;
}

export async function restoreTask(taskId, userId) {
  const task = await Task.findOne({ _id: taskId, owner: userId });
  if (!task) throw ApiError.notFound("Task not found");
  task.archived = false;
  await task.save();
  return task;
}

export async function addSubTask(taskId, userId, { title }) {
  const task = await findOwned(taskId, userId);
  task.subTasks.push({ title, done: false });
  await task.save();
  return task;
}

export async function toggleSubTask(taskId, userId, index, done) {
  const task = await findOwned(taskId, userId);
  const sub = task.subTasks[index];
  if (!sub) throw ApiError.notFound("Sub-task not found");
  sub.done = done === undefined ? !sub.done : done;
  await task.save();
  return task;
}

export async function listComments(taskId, userId) {
  await findOwned(taskId, userId);
  return Comment.find({ task: taskId }).populate("author", "name avatarUrl").sort({ createdAt: 1 });
}

export async function addComment(taskId, userId, { body }) {
  await findOwned(taskId, userId);
  const comment = await Comment.create({ task: taskId, author: userId, body });
  return comment.populate("author", "name avatarUrl");
}
