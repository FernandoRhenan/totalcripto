
describe("POST /api/v1/status", () => {
  describe("Anonymous user", () => {
    test("Retrieving method not allowed error.", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status", {
        method: 'POST'
      });

      expect(response.status).toBe(405);

      const jsonResponse = await response.json();

      expect(jsonResponse).toEqual({
        name: 'MethodNotAllowedError',
        action: 'Verifique se o método HTTP enviado é válido para este endpoint.',
        message: 'Método não permitido para este endpoint.',
        status_code: 405
      })
    });
  });
});
