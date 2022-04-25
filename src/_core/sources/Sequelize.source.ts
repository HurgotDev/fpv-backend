import _ from 'lodash';
import { Op } from 'sequelize';

import AppRepository, { AppFilters, TCondition, TData, TPopulate, TWhere } from '../repositories/app.repository';
import { ModelInstance } from '../../db/models/sequelize/types.d';

const convertOperators: any = {
  $or: Op.or,
  $gt: Op.gt,
  $gte: Op.gte,
  $in: Op.in,
  $lt: Op.lt,
  $lte: Op.lte,
  $ne: Op.ne,
  $nin: Op.notIn,
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
 * Function
 * @param {object} obj comment
 * @return {object} sds
 */
function replaceKeysDeep(obj: any) {
  return _.transform(obj, (result: any, value, key) => {
    const currentKey = convertOperators[key] || key;

    // eslint-disable-next-line no-param-reassign
    result[currentKey] = _.isObject(value) ? replaceKeysDeep(value) : value;
  });
}

/**
 * comment
 * @param {object} $where comment
 * @return {object} comment
 */
function generateQueryWhere($where?: any) {
  if (!$where) return {};

  return replaceKeysDeep($where);
}

/**
 * Include any model to query
 * @param {TPopulate<any>} $populate The models to include
 * @return {Array} Array with models to include
 */
function generateIncludes($populate?: TPopulate<any>[]): Array<any> {
  if (!$populate) return [];
  const includes: Array<any> = [];

  $populate.forEach((p) => {
    includes.push({
      model: p?.model,
      attributes: p?.$select,
      include: generateIncludes($populate),
      where: generateQueryWhere(p?.$where),
    });
  });

  return includes;
}

/**
 * Sequelize DataSource
 */
export default class SequelizeDataSource<T extends { id?: string | number }> implements AppRepository<T> {
  private model: ModelInstance<T>;

  /**
   * Constructor
   * @param {ModelInstance<T>} model comment
   */
  constructor(model: ModelInstance<T>) {
    this.model = model;
  }

  /**
   * Find All function
   * @param {AppFilters<T>} p filters
   * @return {Array<T>} Return type
   */
  async findAll(p?: AppFilters<T>): Promise<T[]> {
    const { $select, $where } = p || {};
    const d = await this.model.findAll({
      attributes: $select as string[],
      include: generateIncludes(p?.$populate),
      where: generateQueryWhere($where),
    });

    return parseResult(d) as T[];
  }

  /**
   * Filter by any field entity
   * @param {TCondition<T>} condition Filters
   * @return {Promise<T>} Return type
   */
  async findBy(condition: TCondition<T>): Promise<T> {
    const { $select, $where, $populate } = condition;
    const d = await this.model.findOne({
      attributes: $select as string[],
      include: generateIncludes($populate),
      where: generateQueryWhere($where),
    });

    return parseResult(d) as T;
  }

  /**
   * Get one row by id
   * @param {string | number} id Index of row
   * @param {TCondition<T>} condition The condition to filter
   * @return {T} Entity data
   */
  async get(id: string | number, condition?: TCondition<T>): Promise<T> {
    const { $select, $populate, $where } = condition || ({} as TCondition<T>);
    const d = await this.model.findOne({
      attributes: $select as string[],
      include: generateIncludes($populate),
      where: {
        id,
        ...generateQueryWhere($where),
      },
    });

    return parseResult(d) as T;
  }

  /**
   * Create one row of entity
   * @param {T} data Data to create
   * @return {T} Data created
   */
  async create(data: T): Promise<T> {
    const d = await this.model.create(data);

    return parseResult(d) as T;
  }

  /**
   * Update one row of entity by pk
   * @param {string | number} id Pk of entity
   * @param {TData<T>} data Data to update
   * @return {Promise<T>} Row updated
   */
  async update(id: string | number, data: TData<T>): Promise<T> {
    const d = await this.model.update(data, { where: { id } });

    return parseResult(d) as T;
  }

  /**
   * Remove any rows from condition
   * @param {TWhere<T>} where Where condition to remove row
   * @return {Promise<T[]>} Row removed
   */
  async remove(where: TWhere<T>): Promise<T[]> {
    const d = await this.model.destroy({ where: generateQueryWhere(where) });

    return parseResult(d) as T[];
  }
}
