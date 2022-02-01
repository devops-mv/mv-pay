
import * as combineRouters from "koa-combine-routers";
import apiRoutes from './api';
import authRoutes from './auth';

const router = combineRouters(
  authRoutes,
  apiRoutes,
);

export default router;