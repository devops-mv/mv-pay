import { Model } from "objection";
import { IPagedList, ISingleResult } from "./interfaces";

export abstract class AbstractRepository<T extends Model> {
  protected abstract model: any;

  async pagedList(page = 1, pageSize = 15): Promise<IPagedList<T>> {
    const result = await this.model
      .query()
      .page(page - 1, pageSize);

    return {
      data: result.results,
      page,
      pageSize,
      totalPages: Math.ceil(result.total / pageSize),
      totalRecords: result.total,
    };
  }

  async findOne(query: any): Promise<ISingleResult<T>> {
    const result = await this
      .model
      .query()
      .where(query)
      .first();

    return {
      data: result && result.toJSON(),
    };
  }

  async get(id: number): Promise<ISingleResult<T>> {
    const result = await this
      .model
      .query()
      .findById(id);

    return {
      data: result && result.toJSON(),
    };
  }

  async create(data: any): Promise<ISingleResult<T>> {
    let result = await this
      .model
      .query()
      .insert(data);

    result = await this
      .model
      .query()
      .findById(result.id);

    return {
      data: result.toJSON(),
    };
  }

  async update(id: number, data: any): Promise<ISingleResult<T>> {
    const result = await this
      .model
      .query()
      .findById(id)
      .patch(data)
      .returning('*');

    return {
      data: result && result.toJSON(),
    };
  }

  async delete(id: number) {
   await this.model.findById(id).delete();
  }
}