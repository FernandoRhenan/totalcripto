import database from "infra/database.js";
import { version } from "react";

async function status(request, response) {
  const serverVersion = await database.query("SHOW server_version;");
  const maxConnections = await database.query("SHOW max_connections;");
  const updatedAt = new Date().toISOString();

  response.status(200).json({
    updated_at: updatedAt,
    services: {
      database: {
        version: serverVersion.rows[0].server_version,
        max_connections: parseInt(maxConnections.rows[0].max_connections)
      },
    },
  });
}

export default status;
