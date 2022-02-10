import 'dotenv/config';
import Knex from 'knex';
import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import router from './routes';
import knexConfig from "./config/knexfile";
import { ForeignKeyViolationError, Model, ValidationError } from 'objection';

const knex = Knex(knexConfig[process.env.NODE_ENV || 'development']);

Model.knex(knex);

const app = new Koa();

app
  .use(errorHandler)
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

const PORT: number = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
});


async function errorHandler(ctx: Koa.Context, next: () => Promise<any>) {
  try {
    await next()
  } catch (err: any) {
    if (err instanceof ValidationError) {
      ctx.status = 400
      ctx.body = {
        error: 'ValidationError',
        errors: err.data,
      }
    } else if (err instanceof ForeignKeyViolationError) {
      ctx.status = 409
      ctx.body = {
        error: 'ForeignKeyViolationError',
      }
    } else {
      ctx.status = 500
      ctx.body = {
        error: 'InternalServerError',
        message: err.message || {},
      }
    }
  }
}