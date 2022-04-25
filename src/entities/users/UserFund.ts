import type { Types } from 'mongoose';

import Fund from '../funds/Fund';

export default interface UserTransaction {
  fundId: Types.ObjectId;
  balance: number;
  status: 'subscribed' | 'unsubscribed';
  fundName: string;
}

export interface UserTransactionExtended extends UserTransaction {
  fund: Fund;
}
