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

  expect(response1.status).toBe(405);
  expect(response2.status).toBe(405);

  const statusResponse = await fetch("http://localhost:3000/api/v1/status");

  const jsonResponse = await statusResponse.json();

  expect(statusResponse.status).toBe(200);
  expect(jsonResponse.services.database.open_connections).toBe(1);

});
