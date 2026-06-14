import { Level } from "../models/level.model.js";
import { Subject } from "../models/subject.model.js";
import { Resource } from "../models/resource.model.js";
import { ApiError } from "../utils/ApiError.js";

// ---- Levels ----
export const listLevels = () => Level.find().sort({ order: 1, createdAt: 1 });
export const createLevel = (data) => Level.create(data);
export async function updateLevel(id, data) {
  const lvl = await Level.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!lvl) throw ApiError.notFound("Level not found");
  return lvl;
}
export async function deleteLevel(id) {
  const lvl = await Level.findByIdAndDelete(id);
  if (!lvl) throw ApiError.notFound("Level not found");
  const subjects = await Subject.find({ level: id }, { _id: 1 });
  const subjectIds = subjects.map((s) => s._id);
  await Resource.deleteMany({ subject: { $in: subjectIds } });
  await Subject.deleteMany({ level: id });
}

// ---- Subjects ----
export const listSubjects = (levelId) => Subject.find({ level: levelId }).sort({ order: 1, createdAt: 1 });
export const createSubject = (data) => Subject.create(data);
export async function updateSubject(id, data) {
  const s = await Subject.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!s) throw ApiError.notFound("Subject not found");
  return s;
}
export async function deleteSubject(id) {
  const s = await Subject.findByIdAndDelete(id);
  if (!s) throw ApiError.notFound("Subject not found");
  await Resource.deleteMany({ subject: id });
}

// ---- Resources ----
export const listResources = (subjectId) => Resource.find({ subject: subjectId }).sort({ category: 1, createdAt: 1 });
export const createResource = (data) => Resource.create(data);
export async function updateResource(id, data) {
  const r = await Resource.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!r) throw ApiError.notFound("Resource not found");
  return r;
}
export async function deleteResource(id) {
  const r = await Resource.findByIdAndDelete(id);
  if (!r) throw ApiError.notFound("Resource not found");
}
