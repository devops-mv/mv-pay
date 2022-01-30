import User from "../database/models/user";
import { AbstractRepository } from "./abstract-repository";

export class UserRepository extends AbstractRepository<User> {
  protected model = User;

  constructor() {
    super();
  }
}