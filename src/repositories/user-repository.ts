import User from "../database/models/user";
import { AbstractRepository } from "./abstract-repository";
import { ISingleResult } from "./interfaces";

export class UserRepository extends AbstractRepository<User> {
  protected model = User;

  constructor() {
    super();
  }

  async getByUsername(username: string): Promise<ISingleResult<any>> {
    const user = await new this.model({ username }).fetch();
    const result = {
      data: user.toJSON()
    };

    result.data.password = user.attributes.password;

    return result;
  }
}