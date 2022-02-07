import Database from '../database';

const db = Database.getInstance();
const bookshelf = db.getBookshelf();

export default class UserRole extends bookshelf.Model<UserRole> {

    get tableName() { return 'user_Roles'; }

    get hasTimestamps() { return ["created_at", null]; }

}