import { createRequire } from "module";
const require = createRequire(import.meta.url);
const request = require("supertest");

import app from "../server.js"; // Import your Express app

describe("Task API", () => {
  it("should create a new task", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({
        title: "Test Task",
        user_id: 1,
        description: "This is a test task",
        status: "pending",
        due_date: "2024-12-31",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.title).toBe("Test Task");
  });

  it("should return 400 for invalid task data", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({
        user_id: 1,
        status: "pending",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
});
