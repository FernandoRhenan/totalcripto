import database from "infra/database.js";

export default async function status(request, response) {
  const databaseName = process.env.POSTGRES_DB;
  const serverVersion = await database.query("SHOW server_version;");
  const maxConnections = await database.query("SHOW max_connections;");
  const openConnections = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1",
    values: [databaseName],
  });
  const updatedAt = new Date().toISOString();

  response.status(200).json({
    updated_at: updatedAt,
    services: {
      database: {
        version: serverVersion.rows[0].server_version,
        max_connections: parseInt(maxConnections.rows[0].max_connections),
        open_connections: openConnections.rows[0].count,
      },
    },
  });
}
