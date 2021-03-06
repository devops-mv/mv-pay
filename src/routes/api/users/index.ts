import * as Router from '@koa/router';
import { UserRepository } from '../../../repositories/user-repository';
import { generatePassword } from '../../../helpers/password';
import { DefaultContext } from 'koa';

const router = new Router({ prefix: '/users' });

const userRepository = new UserRepository();

router.get('user.list', '/', async (ctx: DefaultContext) => {
  ctx.body = await userRepository.pagedList();
});

router.get('user.view', '/:id', async (ctx: DefaultContext) => {
  ctx.body = await userRepository.get(Number(ctx.params.id));
});

router.post('user.create', '/', async (ctx: DefaultContext) => {
  const payload = ctx.request.body.data;
  payload.password = generatePassword(payload.password);
  ctx.body = await userRepository.create(payload);
});

router.put('user.update', '/:id', async (ctx: DefaultContext) => {
  const payload = ctx.request.body.data;
  delete payload.password;
  ctx.body = await userRepository.update(Number(ctx.params.id), payload);
});

router.delete('user.delete', '/:id', async (ctx: DefaultContext) => {
  await userRepository.delete(Number(ctx.params.id));
  ctx.body = null;
});

export default router;