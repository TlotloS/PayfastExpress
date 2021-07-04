import {envconfig as ENV_VARIABLES } from "./envconfig";

module.exports = {
  "type": "mysql",
  "host": ENV_VARIABLES.DATABASE_HOST,
  "port": ENV_VARIABLES.DATABASE_PORT,
  "username": ENV_VARIABLES.SQL_USER,
  "password": ENV_VARIABLES.SQL_PASSWORD,
  "database": ENV_VARIABLES.SQL_DATABASE,
  "synchronize": ENV_VARIABLES.DATABASE_SYNCRONIZE,
  "logging": ENV_VARIABLES.DATABASE_LOGGING,
  "entities": [
    "src/entity/**/*.ts"
  ],
  "migrations": [
    "src/migration/**/*.ts"
  ],
  "subscribers": [
    "src/subscriber/**/*.ts"
  ],
  "cli": {
    "entitiesDir": "src/entity",
    "migrationsDir": "src/migration",
    "subscribersDir": "src/subscriber"
  }
}