
import * as Router from "@koa/router";
import apiRoutes from './api';
import authRoutes from './auth';

const router = new Router();

router.use('', 
  authRoutes.routes(), authRoutes.allowedMethods(),
  apiRoutes.routes(), apiRoutes.allowedMethods()
);

export default router;