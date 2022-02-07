import Database from '../database';

const db = Database.getInstance();
const bookshelf = db.getBookshelf();

export default class RolePermission extends bookshelf.Model<RolePermission> {

    get tableName() { return 'role_permissions'; }

    get hasTimestamps() { return ["created_at", null]; }

}