import * as Objection from "objection";

export default class User extends Objection.Model {
  id!: number;
  name!: string;
  username!: string;
  password!: string;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;

  static tableName: string = 'users';

  $beforeUpdate() {
    this.updatedAt = new Date();
  }

  $formatJson(json: Objection.Pojo) {
    json = super.$formatJson(json);
    delete json.password;
    return json;
  }
}