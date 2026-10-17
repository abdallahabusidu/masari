import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import { connectDB } from "./config/db.js";
import { logger } from "./config/logger.js";
import { User } from "./models/user.model.js";
import { Task } from "./models/task.model.js";
import { Level } from "./models/level.model.js";
import { Subject } from "./models/subject.model.js";
import { Resource } from "./models/resource.model.js";

const DEMO_EMAIL = "student@masari.edu";
const DEMO_PASSWORD = "masari123";

async function run() {
  await connectDB();

  await User.deleteOne({ email: DEMO_EMAIL });
  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);
  const user = await User.create({
    name: "محمد جمال",
    email: DEMO_EMAIL,
    passwordHash,
    major: "هندسة نظم الحاسوب",
    preferences: { language: "ar", theme: "light" },
  });

  await Task.deleteMany({ owner: user._id });
  await Task.insertMany([
    {
      owner: user._id,
      title: "إنهاء تقرير مشروع التخرج",
      course: "مشروع التخرج",
      deadline: new Date(Date.now() + 2 * 86400000),
      priority: "high",
      status: "pending",
      description: "مراجعة جزء الواجهة الأمامية وتحديث التوثيق.",
      subTasks: [
        { title: "مراجعة الواجهة الأمامية", done: true },
        { title: "تحديث التوثيق", done: false },
      ],
    },
    {
      owner: user._id,
      title: "تسليم واجب قواعد البيانات",
      course: "Database",
      deadline: new Date(Date.now() + 6 * 86400000),
      priority: "medium",
      status: "pending",
      description: "حل أسئلة ERD و SQL ورفع الملف النهائي.",
    },
    {
      owner: user._id,
      title: "مراجعة مادة البرمجيات",
      course: "Software Engineering",
      deadline: new Date(Date.now() + 10 * 86400000),
      priority: "low",
      status: "completed",
      completedAt: new Date(),
      description: "مراجعة المخططات والمتطلبات الوظيفية.",
    },
  ]);

  // ---- Academic content (levels -> subjects -> resources) ----
  await Resource.deleteMany({});
  await Subject.deleteMany({});
  await Level.deleteMany({});

  const levelNames = ["المستوى الأول", "المستوى الثاني", "المستوى الثالث", "المستوى الرابع", "المستوى الخامس"];
  const levels = await Level.insertMany(levelNames.map((name, i) => ({ name, order: i })));

  // Seed subjects + sample resources for the first level only (admin fills the rest).
  const firstLevel = levels[0];
  const subjectNames = ["مقدمة في الحاسوب", "أساسيات البرمجة 1", "مبادئ قواعد البيانات", "اللغة الإنجليزية"];
  const subjects = await Subject.insertMany(
    subjectNames.map((name, i) => ({ level: firstLevel._id, name, order: i }))
  );

  const s0 = subjects[0]._id;
  await Resource.insertMany([
    { subject: s0, category: "lectures", title: "محاضرة 1: مقدمة", url: "https://example.com/lec1" },
    { subject: s0, category: "recorded", title: "شرح مصوّر: مكونات الحاسوب", url: "https://youtube.com/" },
    { subject: s0, category: "materials", title: "ملخص الوحدة الأولى", url: "https://example.com/notes.pdf" },
    { subject: s0, category: "books", title: "الكتاب المقرر", url: "https://example.com/book.pdf" },
  ]);

  logger.info(`Seed complete. Demo login -> ${DEMO_EMAIL} / ${DEMO_PASSWORD}`);
  logger.info(`Seeded ${levels.length} levels, ${subjects.length} subjects (level 1).`);
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  logger.error("Seed failed:", err);
  process.exit(1);
});
