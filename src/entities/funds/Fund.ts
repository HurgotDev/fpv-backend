import BaseEntity from '../BaseEntity';

export default interface User extends BaseEntity {
  name: string;
  minAmount: number;
  category: string;
}
