import { describe, it, expect, beforeAll, afterAll, beforeEach } from "@jest/globals";
import request from "supertest";

process.env.NODE_ENV = "test";

import { createApp } from "../src/app.js";
import { startDB, stopDB, clearDB } from "./setup.js";

const app = createApp();
beforeAll(startDB);
afterAll(stopDB);
beforeEach(clearDB);

async function makeUser(email) {
  const res = await request(app)
    .post("/api/auth/register")
    .send({ name: "User", email, password: "secret1" });
  return res.body.data.accessToken;
}

const future = (days) => new Date(Date.now() + days * 86400000).toISOString();

describe("Tasks", () => {
  it("requires auth", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.status).toBe(401);
  });

  it("creates and lists a task", async () => {
    const token = await makeUser("a@masari.edu");
    const create = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "DS Lab", course: "Data Structures", deadline: future(3), priority: "high" });
    expect(create.status).toBe(201);
    expect(create.body.data.task.priority).toBe("high");

    const list = await request(app).get("/api/tasks").set("Authorization", `Bearer ${token}`);
    expect(list.status).toBe(200);
    expect(list.body.data.tasks.length).toBe(1);
    expect(list.body.data.total).toBe(1);
  });

  it("validates required fields", async () => {
    const token = await makeUser("b@masari.edu");
    const res = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ course: "X" });
    expect(res.status).toBe(400);
  });

  it("filters by priority", async () => {
    const token = await makeUser("c@masari.edu");
    const h = { Authorization: `Bearer ${token}` };
    await request(app).post("/api/tasks").set(h).send({ title: "H", deadline: future(1), priority: "high" });
    await request(app).post("/api/tasks").set(h).send({ title: "L", deadline: future(2), priority: "low" });
    const res = await request(app).get("/api/tasks?priority=high").set(h);
    expect(res.body.data.tasks.length).toBe(1);
    expect(res.body.data.tasks[0].priority).toBe("high");
  });

  it("toggles status to completed and sets completedAt", async () => {
    const token = await makeUser("d@masari.edu");
    const h = { Authorization: `Bearer ${token}` };
    const c = await request(app).post("/api/tasks").set(h).send({ title: "T", deadline: future(1) });
    const id = c.body.data.task.id;
    const res = await request(app).patch(`/api/tasks/${id}/status`).set(h).send({ status: "completed" });
    expect(res.body.data.task.status).toBe("completed");
    expect(res.body.data.task.completedAt).toBeTruthy();
  });

  it("soft-archives and restores", async () => {
    const token = await makeUser("e@masari.edu");
    const h = { Authorization: `Bearer ${token}` };
    const c = await request(app).post("/api/tasks").set(h).send({ title: "T", deadline: future(1) });
    const id = c.body.data.task.id;

    await request(app).delete(`/api/tasks/${id}`).set(h);
    let list = await request(app).get("/api/tasks").set(h);
    expect(list.body.data.tasks.length).toBe(0); // archived hidden by default

    await request(app).post(`/api/tasks/${id}/restore`).set(h);
    list = await request(app).get("/api/tasks").set(h);
    expect(list.body.data.tasks.length).toBe(1);
  });

  it("manages sub-tasks", async () => {
    const token = await makeUser("f@masari.edu");
    const h = { Authorization: `Bearer ${token}` };
    const c = await request(app).post("/api/tasks").set(h).send({ title: "T", deadline: future(1) });
    const id = c.body.data.task.id;
    const add = await request(app).post(`/api/tasks/${id}/subtasks`).set(h).send({ title: "step 1" });
    expect(add.body.data.task.subTasks.length).toBe(1);
    const toggle = await request(app).patch(`/api/tasks/${id}/subtasks/0`).set(h).send({ done: true });
    expect(toggle.body.data.task.subTasks[0].done).toBe(true);
  });

  it("adds and lists comments", async () => {
    const token = await makeUser("g@masari.edu");
    const h = { Authorization: `Bearer ${token}` };
    const c = await request(app).post("/api/tasks").set(h).send({ title: "T", deadline: future(1) });
    const id = c.body.data.task.id;
    await request(app).post(`/api/tasks/${id}/comments`).set(h).send({ body: "looks good" });
    const res = await request(app).get(`/api/tasks/${id}/comments`).set(h);
    expect(res.body.data.comments.length).toBe(1);
    expect(res.body.data.comments[0].body).toBe("looks good");
  });

  it("isolates tasks between users", async () => {
    const t1 = await makeUser("owner@masari.edu");
    const t2 = await makeUser("intruder@masari.edu");
    const c = await request(app)
      .post("/api/tasks")
      .set({ Authorization: `Bearer ${t1}` })
      .send({ title: "Private", deadline: future(1) });
    const id = c.body.data.task.id;

    const read = await request(app).get(`/api/tasks/${id}`).set({ Authorization: `Bearer ${t2}` });
    expect(read.status).toBe(404);
    const edit = await request(app)
      .patch(`/api/tasks/${id}`)
      .set({ Authorization: `Bearer ${t2}` })
      .send({ title: "hacked" });
    expect(edit.status).toBe(404);
  });
});
