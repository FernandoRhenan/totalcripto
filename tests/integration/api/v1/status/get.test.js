test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  expect(response.status).toBe(200);

  const jsonResponse = await response.json();

  const updatedAt = new Date(jsonResponse.updated_at).toISOString();

  expect(jsonResponse.updated_at).toBeDefined();
  expect(jsonResponse.updated_at).toEqual(updatedAt);

  expect(jsonResponse.services.database.version).toBe("16.0");
  expect(jsonResponse.services.database.max_connections).toBe(100);
  expect(jsonResponse.services.database.open_connections).toBe(1);
});
