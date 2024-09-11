import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.clearDatabase();
});

describe("POST /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    describe("Running migrations", () => {
      test("first time running", async () => {
        const response = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
          },
        );

        const jsonResponse = await response.json();

        expect(response.status).toBe(201);
        expect(Array.isArray(jsonResponse)).toBeTruthy();
        expect(jsonResponse.length).toBeGreaterThan(0);
      });

      test("second time running", async () => {
        const response = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
          },
        );

        const jsonResponse = await response.json();

        expect(response.status).toBe(200);
        expect(Array.isArray(jsonResponse)).toBeTruthy();
        expect(jsonResponse.length).toEqual(0);
      });
    });
  });
});
