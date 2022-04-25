import type { Types } from 'mongoose';

import BaseEntity from '../BaseEntity';
import Fund from '../funds/Fund';

export default interface UserTransaction extends BaseEntity {
  type: 'opening' | 'cancellation';
  amount: number;
  fundId: Types.ObjectId;
  fundName: string;
  date: string;
}

export interface UserTransactionExtended extends UserTransaction {
  fund: Fund;
}
