import { AppFilters, OptionalAttrs, TCondition, TData, TWhere } from './types.d';

export * from './types.d';

export default interface IGenericRepository<T> {
  findAll(p?: AppFilters<T>): Promise<T[]>;

  findBy(p: TCondition<T>): Promise<T>;

  get(id: number | string, condition?: TCondition<T>): Promise<T>;

  create(data: OptionalAttrs<T, keyof T> | Array<OptionalAttrs<T, keyof T>>): Promise<T>;

  update(id: number | string | object, data: TData<T> | any): Promise<T>;

  remove(where: TWhere<T>): Promise<T[]>;
}
