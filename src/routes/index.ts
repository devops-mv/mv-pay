
import * as combineRouters from "koa-combine-routers";
import userRoutes from './users';

const router = combineRouters(
  userRoutes
);

export default router;