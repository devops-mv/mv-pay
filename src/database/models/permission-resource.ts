import Database from '../database';

const db = Database.getInstance();
const bookshelf = db.getBookshelf();

export default class PermissionResource extends bookshelf.Model<PermissionResource> {

    get tableName() { return 'permission_resources'; }

}