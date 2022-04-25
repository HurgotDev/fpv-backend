import { Model, ModelCtor } from 'sequelize';

export declare type OptionalAttr<T> = { [k in keyof T]?: T[k] };

export interface CreateModelInstance<T> extends Model<OptionalAttr<T>>, T {}

export declare type ModelInstance<T> = ModelCtor<CreateModelInstance<T>>;
