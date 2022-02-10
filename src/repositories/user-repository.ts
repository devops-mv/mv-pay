import User from "../models/user";
import { AbstractRepository } from "./abstract-repository";
import { ISingleResult } from "./interfaces";

export class UserRepository extends AbstractRepository<User> {
  protected model = User;

  constructor() {
    super();
  }

  async getByUsername(username: string): Promise<ISingleResult<any>> {
    const user = await this
      .model
      .query()
      .where('username', username)
      .first();

    const result = {
      data: user && user.toJSON()
    };

    result.data.password = user.password;

    return result;
  }
}