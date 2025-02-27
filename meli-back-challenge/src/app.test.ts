import request from "supertest";
import app from "../src/app";

describe("API Endpoints", () => {
  it("Debe responder en /api/items con un estado válido", async () => {
    const response = await request(app).get("/api/items");
    expect(response.status).toBeGreaterThanOrEqual(200);
    expect(response.status).toBeLessThan(400);
  });
});
