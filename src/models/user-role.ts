import * as Objection  from "objection";

export default class UserRole extends Objection.Model {
  id!: number;
  roleId!: string;
  userId!: number;
  createdAt!: Date;

  static tableName: string = 'user_roles';
}