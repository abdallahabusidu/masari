import { jest, describe, it, expect, beforeAll, afterAll, beforeEach } from "@jest/globals";
import request from "supertest";

process.env.NODE_ENV = "test";

import { createApp } from "../src/app.js";
import { startDB, stopDB, clearDB } from "./setup.js";

const app = createApp();

beforeAll(startDB);
afterAll(stopDB);
beforeEach(clearDB);

const validUser = { name: "Lama Khaled", email: "lama@masari.edu", password: "secret1", major: "CSE" };

async function registerUser(overrides = {}) {
  return request(app).post("/api/auth/register").send({ ...validUser, ...overrides });
}

describe("Auth", () => {
  it("registers a user and returns tokens + sanitized user", async () => {
    const res = await registerUser();
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.accessToken).toBeTruthy();
    expect(res.body.data.refreshToken).toBeTruthy();
    expect(res.body.data.user.email).toBe("lama@masari.edu");
    expect(res.body.data.user.passwordHash).toBeUndefined();
    expect(res.body.data.user.refreshTokenHash).toBeUndefined();
  });

  it("rejects duplicate email with 409", async () => {
    await registerUser();
    const res = await registerUser();
    expect(res.status).toBe(409);
    expect(res.body.success).toBe(false);
  });

  it("rejects invalid registration payload with 400", async () => {
    const res = await registerUser({ email: "not-an-email", password: "x" });
    expect(res.status).toBe(400);
    expect(res.body.errors.length).toBeGreaterThan(0);
  });

  it("logs in with correct credentials", async () => {
    await registerUser();
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: validUser.email, password: validUser.password });
    expect(res.status).toBe(200);
    expect(res.body.data.accessToken).toBeTruthy();
  });

  it("rejects login with wrong password (401)", async () => {
    await registerUser();
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: validUser.email, password: "wrong" });
    expect(res.status).toBe(401);
  });

  it("protects /me and returns the current user with a valid token", async () => {
    const reg = await registerUser();
    const token = reg.body.data.accessToken;

    const noAuth = await request(app).get("/api/auth/me");
    expect(noAuth.status).toBe(401);

    const res = await request(app).get("/api/auth/me").set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.data.user.email).toBe(validUser.email);
  });

  it("refreshes and rotates the refresh token", async () => {
    const reg = await registerUser();
    const oldRefresh = reg.body.data.refreshToken;

    const res = await request(app).post("/api/auth/refresh").send({ refreshToken: oldRefresh });
    expect(res.status).toBe(200);
    expect(res.body.data.accessToken).toBeTruthy();
    expect(res.body.data.refreshToken).not.toBe(oldRefresh);

    // Old refresh token is now invalid (rotated).
    const reuse = await request(app).post("/api/auth/refresh").send({ refreshToken: oldRefresh });
    expect(reuse.status).toBe(401);
  });

  it("logs out and invalidates the refresh token", async () => {
    const reg = await registerUser();
    const { accessToken, refreshToken } = reg.body.data;
    await request(app).post("/api/auth/logout").set("Authorization", `Bearer ${accessToken}`);
    const res = await request(app).post("/api/auth/refresh").send({ refreshToken });
    expect(res.status).toBe(401);
  });

  it("updates profile preferences", async () => {
    const reg = await registerUser();
    const token = reg.body.data.accessToken;
    const res = await request(app)
      .patch("/api/auth/me")
      .set("Authorization", `Bearer ${token}`)
      .send({ major: "Software", preferences: { theme: "dark", language: "ar" } });
    expect(res.status).toBe(200);
    expect(res.body.data.user.major).toBe("Software");
    expect(res.body.data.user.preferences.theme).toBe("dark");
  });

  it("resets password via reset token and invalidates old credentials", async () => {
    await registerUser();
    const { forgotPassword } = await import("../src/services/auth.service.js");
    const token = await forgotPassword({ email: validUser.email });

    const res = await request(app)
      .post("/api/auth/reset-password")
      .send({ token, password: "newpass1" });
    expect(res.status).toBe(200);

    const oldLogin = await request(app)
      .post("/api/auth/login")
      .send({ email: validUser.email, password: validUser.password });
    expect(oldLogin.status).toBe(401);

    const newLogin = await request(app)
      .post("/api/auth/login")
      .send({ email: validUser.email, password: "newpass1" });
    expect(newLogin.status).toBe(200);
  });
});
