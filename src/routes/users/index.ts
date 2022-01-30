import * as Router from '@koa/router';
import User from '../../database/models/user';
import { UserRepository } from '../../repositories/user-repository';

const router = new Router({ prefix: '/api/users' });

const userRepository = new UserRepository();

router.get('/', async (ctx) => {
  ctx.body = await userRepository.pagedList();
});

export default router;