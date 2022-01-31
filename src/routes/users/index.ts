import * as Router from '@koa/router';
import User from '../../database/models/user';
import { UserRepository } from '../../repositories/user-repository';
import { generatePassword } from '../../helpers/password';

const router = new Router({ prefix: '/api/users' });

const userRepository = new UserRepository();

router.get('/', async (ctx) => {
  ctx.body = await userRepository.pagedList();
});

router.get('/:id', async (ctx) => {
  ctx.body = await userRepository.get(Number(ctx.params.id));
});

router.post('/', async (ctx) => {
  const payload = ctx.request.body.data;
  payload.password = generatePassword(payload.password);
  ctx.body = await userRepository.create(payload);
});

router.put('/:id', async (ctx) => {
  const payload = ctx.request.body.data;
  delete payload.password;
  ctx.body = await userRepository.update(Number(ctx.params.id), payload);
});

router.delete('/:id', async (ctx) => {
  await userRepository.delete(Number(ctx.params.id));
  ctx.body = null;
});

export default router;