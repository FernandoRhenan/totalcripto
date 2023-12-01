test('GET to /api/v1/status should return 200', async () => {
  const response = await fetch('http://localhost:3000/api/v1/status')

  expect(response.status).toBe(200)

  const jsonResponse = await response.json()

  const updatedAt = new Date(jsonResponse.updated_at).toISOString()
  expect(jsonResponse.updated_at).toBeDefined()
  expect(jsonResponse.updated_at).toEqual(updatedAt)

  expect(jsonResponse.count).toBeDefined()
  expect(jsonResponse.max_connections).toBeDefined()
  expect(jsonResponse.version).toBeDefined()

})