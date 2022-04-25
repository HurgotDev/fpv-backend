import BaseEntity from '../BaseEntity';

import UserTransaction from './UserTransaction';
import UserFund from './UserFund';

export default interface User extends BaseEntity {
  username: string;
  password: string;
  name: string;
  lastName: string;
  balance: number;
  transactions: UserTransaction[];
  funds: UserFund[];
}
