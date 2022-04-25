import { NotAceptableError, NotFoundError } from '../errors';
import AppRepository, { AppFilters, TCondition, TData, TWhere } from '../repositories/app.repository';

export default class AppInteractor<T> {
  protected repo: AppRepository<T>;

  /**
   * App generic interactor
   * @param {AppRepository<T>} repo Generic repository
   */
  constructor(repo: AppRepository<T>) {
    this.repo = repo;
  }

  /**
   * find all rows
   * @param {AppFilters<T>} p App filters
   * @return {Promise<T[]>} All rows
   */
  async findAll(p?: AppFilters<T>): Promise<T[]> {
    const data = p ? await this.repo.findAll(p) : this.repo.findAll();

    return data;
  }

  /**
   * Find one row by any filter
   * @param {AppFilters<T>} p filters
   * @return {Promise<T>} Promise with result
   */
  async findBy(p: AppFilters<T>): Promise<T> {
    const data = await this.repo.findBy(p);

    return data;
  }

  /**
   * Get one row by pk entity
   * @param {string | number} id Pk of entity
   * @param {TCondition<T>} condition Optionally you can filter by condition
   * @return {Promise<T>} Promise with result
   */
  async get(id: string | number, condition?: TCondition<T>): Promise<T> {
    if (!id) throw new NotAceptableError('id is required.');
    const data = await this.repo.get(id, condition || undefined);

    if (!data) throw new NotFoundError();

    return data;
  }

  /**
   * Create one row of entity
   * @param {T} data Data of entity to create
   * @return {Promise<T>} Promise with data created
   */
  async create(data: { [k in keyof T]?: T[k] } | Array<{ [k in keyof T]?: T[k] }>): Promise<T> {
    const d = await this.repo.create(data);

    return d;
  }

  /**
   * Update one row by pk entity
   * @param {number} id Pk of entity
   * @param {T} data Data to update
   * @return {Promise<T>} Promise with data updated
   */
  async update(id: string | number, data: TData<T>): Promise<T> {
    return this.repo.update(id, data);
  }

  /**
   * Remove rows by where condition
   * @param {TWhere<T>} where Where condition to remove
   * @return {Promise<T[]>} Promise with rows removed
   */
  async remove(where: TWhere<T>): Promise<T[]> {
    return this.repo.remove(where);
  }
}
