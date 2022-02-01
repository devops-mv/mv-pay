import { DefaultContext, Next } from "koa";
import { verifyToken } from "../helpers/token";
import { UserRepository } from '../repositories/user-repository';

export default async function authMiddleware(ctx: DefaultContext, next: Next) {
  const userRepository = new UserRepository();

  const bearer = ctx.request.header.authorization;
  if (!bearer) {
    ctx.status = 401;
    ctx.body = {
      message: "Unauthorized"
    };
    return;
  }

  const token = bearer.split(" ")[1];
  const payload = await verifyToken(token);

  if (!payload) {
    ctx.status = 401;
    ctx.body = {
      message: "Unauthorized"
    };
    return;
  }

  const user: any = await userRepository.get(payload.id);
  ctx.state.user = {
    id: user.data.id,
    username: user.data.username
  };

  await next();
}