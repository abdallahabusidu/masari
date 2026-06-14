import * as taskService from "../services/task.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ok, created } from "../utils/response.js";

export const list = asyncHandler(async (req, res) => {
  const result = await taskService.listTasks(req.userId, req.query);
  ok(res, result, "OK");
});

export const create = asyncHandler(async (req, res) => {
  const task = await taskService.createTask(req.userId, req.body);
  created(res, { task }, "Task created");
});

export const getOne = asyncHandler(async (req, res) => {
  const task = await taskService.getTask(req.params.id, req.userId);
  ok(res, { task }, "OK");
});

export const update = asyncHandler(async (req, res) => {
  const task = await taskService.updateTask(req.params.id, req.userId, req.body);
  ok(res, { task }, "Task updated");
});

export const setStatus = asyncHandler(async (req, res) => {
  const task = await taskService.setStatus(req.params.id, req.userId, req.body.status);
  ok(res, { task }, "Status updated");
});

export const archive = asyncHandler(async (req, res) => {
  await taskService.archiveTask(req.params.id, req.userId);
  ok(res, null, "Task archived");
});

export const restore = asyncHandler(async (req, res) => {
  const task = await taskService.restoreTask(req.params.id, req.userId);
  ok(res, { task }, "Task restored");
});

export const addSubTask = asyncHandler(async (req, res) => {
  const task = await taskService.addSubTask(req.params.id, req.userId, req.body);
  ok(res, { task }, "Sub-task added");
});

export const toggleSubTask = asyncHandler(async (req, res) => {
  const task = await taskService.toggleSubTask(
    req.params.id,
    req.userId,
    Number(req.params.sIdx),
    req.body.done
  );
  ok(res, { task }, "Sub-task updated");
});

export const listComments = asyncHandler(async (req, res) => {
  const comments = await taskService.listComments(req.params.id, req.userId);
  ok(res, { comments }, "OK");
});

export const addComment = asyncHandler(async (req, res) => {
  const comment = await taskService.addComment(req.params.id, req.userId, req.body);
  created(res, { comment }, "Comment added");
});
