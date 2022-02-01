import * as Router from '@koa/router';
import { UserRepository } from '../repositories/user-repository';
import { comparePassword } from '../helpers/password';
import { generateToken } from '../helpers/token';

const router = new Router({ prefix: '/auth' });

const userRepository = new UserRepository();

router.post('/login', async (ctx) => {
  const payload = ctx.request.body.data;

  const user = await userRepository.getByCredentials(payload.username, payload.password);

  if (!user.data || !comparePassword(payload.password, user.data.password)) {
    ctx.status = 401;
    ctx.body = {
      message: 'Invalid credentials'
    };
  }

  await userRepository.update(user.data.id, { lastLogin: new Date().toISOString() });

  const token: string = generateToken(user.data);

  ctx.status = 200;
  ctx.body = {
    data: {
      token,
      user: {
        id: user.data.id,
        name: user.data.name,
        username: user.data.username,
        lastLogin: user.data.lastLogin
      }
    }
  };
});

export default router;
