import 'dotenv/config';
import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import router from './routes';

const app = new Koa();

app.use(router())
  .use(bodyParser());

const PORT: number = Number(process.env.PORT) || 3000;

app.listen(PORT, function () {
  console.log('Server listening on port ' + PORT);
});