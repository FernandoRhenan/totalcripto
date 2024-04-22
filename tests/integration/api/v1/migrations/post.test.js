import database from "infra/database.js";

async function resetDB() {
  await database.query("drop schema public cascade; create schema public;");
}

beforeAll(resetDB);

test("POST to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  expect(response.status).toBe(201);

  const jsonResponse = await response.json();

  expect(Array.isArray(jsonResponse)).toBeTruthy();
  expect(jsonResponse.length).toBeGreaterThan(0);

  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  expect(response2.status).toBe(200);

  const jsonResponse2 = await response2.json();

  expect(Array.isArray(jsonResponse)).toBeTruthy();
  expect(jsonResponse2.length).toEqual(0);
});
