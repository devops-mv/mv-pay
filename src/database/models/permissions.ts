import Database from '../database';

const db = Database.getInstance();
const bookshelf = db.getBookshelf();

export default class Permission extends bookshelf.Model<Permission> {

    get tableName() { return 'permissions'; }

}