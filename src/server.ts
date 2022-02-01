import 'dotenv/config';
import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import router from './routes';

const app = new Koa();

app
  .use(bodyParser())
  .use(router());

const PORT: number = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
});