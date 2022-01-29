// require("dotenv").config({ path: "../.env" });
import 'dotenv/config';
import { Knex } from 'knex';

const DEVELOPMENT: string = "development";
const PRODUCTION: string = "production";
const TESTING: string = "testing";

const config: Knex.Config = {
  client: process.env.DB_DRIVER,
  debug: true,
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
  }
};

export default {
  [DEVELOPMENT]: Object.assign({}, config),
  [PRODUCTION]: Object.assign({}, config),
  [TESTING]: Object.assign({}, config)
};
