import Database from '../database';

const db = Database.getInstance();
const bookshelf = db.getBookshelf();

export default class Role extends bookshelf.Model<Role> {

    get tableName() { return 'roles'; }

    get hasTimestamps() { return true; }

}