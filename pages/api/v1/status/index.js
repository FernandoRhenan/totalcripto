import database from "infra/database.js";
import { version } from "react";

async function status(request, response) {
  const data = await database.query("SHOW server_version;");

  const updatedAt = new Date().toISOString();

  response.status(200).json({
    updated_at: updatedAt,
    services: {
      database: {
        version: data.rows[0].server_version,
      },
    },
  });
}

export default status;
