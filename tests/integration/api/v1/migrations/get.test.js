import database from "infra/database.js";

async function resetDB() {
  await database.query("drop schema public cascade; create schema public;");
}

beforeAll(resetDB);

test("GET to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");

  expect(response.status).toBe(200);

  const jsonResponse = await response.json();

  expect(Array.isArray(jsonResponse)).toBeTruthy();
  expect(jsonResponse.length).toBeGreaterThan(0);

  // Just to open a new connection with db e test if it will be closed.
  const response_ = await fetch("http://localhost:3000/api/v1/migrations");

  const statusResponse = await fetch("http://localhost:3000/api/v1/status");

  const jsonStatusResponse = await statusResponse.json();

  expect(statusResponse.status).toBe(200);
  expect(jsonStatusResponse.services.database.open_connections).toBe(1);
});
