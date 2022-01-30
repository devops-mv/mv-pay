import { Model } from "bookshelf";

export abstract class AbstractRepository<T extends Model<T>> {
  protected abstract model: typeof Model;
  // protected abstract model: { new(...args: any[]): T };

  constructor() {
  }

  async pagedList() {
    const users = await (new this.model()).fetchPage({
      pageSize: 10,
      page: 1,
    });
  }
}