import * as Router from "@koa/router";
import authMiddleware from "../../middlewares/auth";
import userRoutes from './users';

const router = new Router({ prefix: '/api' });

router.use('',
  authMiddleware,
  userRoutes.routes(),
  userRoutes.allowedMethods()
);

export default router;