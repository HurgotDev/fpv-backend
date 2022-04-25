import { Types } from 'mongoose';

export default interface BaseEntity {
  _id: Types.ObjectId;
}
