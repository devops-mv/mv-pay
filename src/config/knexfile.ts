import type { Knex } from 'knex';
import * as dotenv from 'dotenv';
import { knexSnakeCaseMappers } from 'objection';
dotenv.config({ path: "../../.env" });

const config: { [key: string]: Knex.Config } = {
  development: {
    debug: true,
    client: process.env.DB_DRIVER,
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      charset: "utf8"
    },
    migrations: {
      directory: __dirname + "/../migrations"
    },
    seeds: {
      directory: __dirname + "/../seeds"
    },
    ...knexSnakeCaseMappers()
  },
  production: {
    client: process.env.DB_DRIVER,
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      charset: "utf8"
    },
    migrations: {
      directory: __dirname + "/migrations"
    },
    seeds: {
      directory: __dirname + "/seeds"
    },
    ...knexSnakeCaseMappers()
  },
};

export default config;