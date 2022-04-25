import AppRepository from './app.repository';

export declare type Keyof<T> = keyof T;

export declare type Op<T> = {
  /**
   * Operator >
   */
  $gt?: string | number;
  /**
   * Operator >=
   */
  $gte?: string | number;
  /**
   * Operator <
   */
  $lt?: string | number;
  /**
   * Operator <=
   */
  $lte?: string | number;
  /**
   * Operator in
   */
  $in?: string[] | number[];
  /**
   * Operator not in
   */
  $nin?: string[] | number[];
  /**
   * Operator !=
   */
  $ne?: string | number;
  /**
   * Operator OR por definir
   */
  $or?: number[] | string[] | { [k in keyof T]?: T[k] | null } | Array<{ [k in keyof T]?: T[k] | null }>;
};

export declare type TData<T> = { [k in keyof T]?: T[k] };

export declare type TPModel<T> = AppRepository<T>;

export declare type TWhere<T> = Op<T> & {
  [k in keyof T]?: string | number | Op<T> | null;
};

export declare type BaseFilters<T> = {
  $select?: Partial<Keyof<T>[]> | { exclude: Keyof<T>[] };
  $sort?: { [k in keyof T]?: 1 | -1 };
  $limit?: number;
  $skip?: number;
  $where?: TWhere<T>;
};

export declare type AppFilters<T> = {
  // eslint-disable-next-line no-use-before-define
  $populate?: TPopulate<any>[];
} & BaseFilters<T>;

export declare type TPopulate<T> = AppFilters<T> & {
  model: TPModel<T>;
};

export declare type TCondition<T> = Pick<AppFilters<T>, '$select' | '$populate' | '$where'>;

export declare type OptionalAttrs<T, K extends keyof T> = {
  [P in K]?: T[P];
};
