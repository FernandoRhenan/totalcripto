import database from 'infra/database.js'
import { version } from 'react'

async function status(request, response) {

  const { rows } = await database.query("SELECT (SELECT count(*) FROM pg_stat_activity), (SELECT current_setting('max_connections')::int), (SELECT version());")

  const updatedAt = new Date().toISOString()
  response.status(200).json({
    updated_at: updatedAt,
    count: rows[0].count,
    max_connections: rows[0].current_setting,
    version: rows[0].version
  })
}

export default status
