import database from "infra/database.js";

async function clearDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

const orchestrator = {
  clearDatabase,
};

export default orchestrator;
