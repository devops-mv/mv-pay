import Database from '../database';

let db = Database.getInstance();
let bookshelf = db.getBookshelf();

export default class User extends bookshelf.Model<User> {

    get tableName() { return 'users'; }

    get hasTimestamps() { return true; }

    get hidden() { return ['password']; }

}