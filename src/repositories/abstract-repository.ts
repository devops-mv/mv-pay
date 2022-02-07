import { Model } from "bookshelf";
import { IPagedList, ISingleResult } from "./interfaces";

export abstract class AbstractRepository<T extends Model<T>> {
  protected abstract model: any;

  async pagedList(): Promise<IPagedList<T>> {
    const result = await new this.model()
      .fetchPage({
        pageSize: 10,
        page: 1,
      });

    return {
      data: result.toJSON(),
      page: result.pagination.page,
      pageSize: result.pagination.pageSize,
      totalPages: result.pagination.pageCount,
      totalRecords: result.pagination.rowCount,
    };
  }

  async findOne(query: any): Promise<ISingleResult<T>> {
    const result = await new this.model(query).fetch();

    return {
      data: result.toJSON(),
    };
  }

  async get(id: number): Promise<ISingleResult<T>> {
    const result = await new this.model({ id }).fetch();

    return {
      data: result.toJSON(),
    };
  }

  async create(data: any): Promise<ISingleResult<T>> {
    const result = await new this.model(data).save();

    return {
      data: result.toJSON(),
    };
  }

  async update(id: number, data: any): Promise<ISingleResult<T>> {
    const result = await new this.model({ id }).fetch();
    await result.save(data);

    return {
      data: result.toJSON(),
    };
  }

  async delete(id: number) {
   await new this.model({ id }).destroy();
  }
}