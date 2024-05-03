import database from "infra/database.js";

async function resetDB() {
  await database.query("drop schema public cascade; create schema public;");
}

beforeAll(resetDB);

test("Invalid METHOD to /api/v1/migrations should return 405", async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "DELETE",
  });
  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "PUT",
  });

  const jsonResponse1 = await response1.json();
  const jsonResponse2 = await response2.json();
  expect(response1.status).toBe(405);
  expect(response2.status).toBe(405);
  expect(jsonResponse1.error).toBe("Method not allowed.");
  expect(jsonResponse2.error).toBe("Method not allowed.");
});
