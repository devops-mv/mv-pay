import * as Objection  from "objection";

export default class Role extends Objection.Model {
  id!: number;
  name!: string;
  createdAt: string;
  updatedAt: string;

  static tableName: string = 'roles';
}