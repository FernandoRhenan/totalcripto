import { createRouter } from 'next-connect'
import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database";

const route = createRouter()

let dbClient

route.get(getHandler)
route.post(postHandler)

export default route.handler({
  onError: onErrorHandler,
  onNoMatch: onNoMatchHandler
})

async function onErrorHandler(error, request, response) {

  await dbClient.end();

  const publicErrorObject = new InternalServerError({
    cause: error,
  });

  console.log("\nErro dentro do next-connect:");
  console.error(publicErrorObject);

  response.status(500).json(publicErrorObject);

}

async function onNoMatchHandler(request, response) {
  const error = new MethodNotAllowedError()
  response.status(error.statusCode).json(error)
}

async function getHandler(request, response) {

  dbClient = await database.getNewClient();

  try {

    const defaultMigrationSet = {
      dbClient: dbClient,
      dryRun: true,
      dir: resolve("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    };

    const pendingMigrations = await migrationRunner(defaultMigrationSet);

    return response.status(200).json(pendingMigrations);

  } finally {
    dbClient.end()
  }

}

async function postHandler(request, response) {

  dbClient = await database.getNewClient();

  try {

    const defaultMigrationSet = {
      dbClient: dbClient,
      dryRun: false,
      dir: resolve("infra", "migrations"),
      direction: "up",
      verbose: false,
      migrationsTable: "pgmigrations",
    };

    const migratedMigrations = await migrationRunner(defaultMigrationSet)

    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations);
    }

    return response.status(200).json(migratedMigrations);

  } finally {
    dbClient.end()
  }

}
