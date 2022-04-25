import type { Model, Types } from 'mongoose';

import AppRepository, { AppFilters, TCondition, TData, TWhere } from '../repositories/app.repository';

const getSelectAttributes = ($select: AppFilters<any>['$select']) => {
  if (Array.isArray($select)) return Object.fromEntries($select.map((attr) => [attr, 1]));
  if ($select?.exclude) return Object.fromEntries($select.exclude.map((attr) => [attr, 0]));

  return {};
};

/**
 * Parse result of query
 * @param {any} result Data to parse
 * @return {unknown} Data parser
 */
const parseResult = (result: any): unknown => {
  if (Array.isArray(result) && !result.length) return [];
  if (!result) return null;
  const parse = JSON.parse(JSON.stringify(result));

  return parse;
};

/**
 * Mongoose DataSource
 */
export default class MongooseDataSource<T extends { _id?: Types.ObjectId }> implements AppRepository<T> {
  private model: Model<T>;

  /**
   * Constructor
   * @param {ModelInstance<T>} model comment
   */
  constructor(model: Model<T>) {
    this.model = model;
  }

  /**
   * Find All function
   * @param {AppFilters<T>} p filters
   * @return {Array<T>} Return type
   */
  async findAll(p?: AppFilters<T>): Promise<T[]> {
    const { $select, $where } = p || {};
    const attr = getSelectAttributes($select);
    const data = await this.model.find($where as any, attr).exec();

    return parseResult(data) as T[];
  }

  /**
   * Filter by any field entity
   * @param {TCondition<T>} condition Filters
   * @return {Promise<T>} Return type
   */
  async findBy(condition: TCondition<T>): Promise<T> {
    const { $select, $where } = condition;
    const d = await this.model.findOne($where as any, getSelectAttributes($select)).exec();

    return parseResult(d) as T;
  }

  /**
   * Get one row by id
   * @param {string | number} id Index of row
   * @param {TCondition<T>} condition The condition to filter
   * @return {T} Entity data
   */
  async get(id: string | number, condition?: TCondition<T>): Promise<T> {
    const { $select } = condition || ({} as TCondition<T>);
    const d = await this.model.findById(id, getSelectAttributes($select)).exec();

    return parseResult(d) as T;
  }

  /**
   * Create one row of entity
   * @param {T} data Data to create
   * @return {T} Data created
   */
  async create(data: T | T[]): Promise<T> {
    const d = await this.model.create(data);

    return parseResult(d) as T;
  }

  /**
   * Update one row of entity by pk
   * @param {string | number} id Pk of entity
   * @param {TData<T>} data Data to update
   * @return {Promise<T>} Row updated
   */
  async update(filter: string | number | Object, data: TData<T>): Promise<T> {
    const d = await this.model.updateOne(typeof filter === 'object' ? filter : { _id: filter }, data).exec();

    return parseResult(d) as T;
  }

  /**
   * Remove any rows from condition
   * @param {TWhere<T>} where Where condition to remove row
   * @return {Promise<T[]>} Row removed
   */
  async remove(where: TWhere<T>): Promise<T[]> {
    const d = await this.model.deleteMany(where as any);

    return parseResult(d) as T[];
  }
}
