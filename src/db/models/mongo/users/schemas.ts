import { Schema } from 'mongoose';

import User from '../../../../entities/users/User';
import UserTransaction from '../../../../entities/users/UserTransaction';
import UserFund from '../../../../entities/users/UserFund';

export const userTransactionSchema = new Schema<UserTransaction>({
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  fundId: { type: Schema.Types.ObjectId, required: true },
  date: { type: String, required: true },
  fundName: { type: String, required: true },
});

export const userFundSchema = new Schema<UserFund>({
  fundId: { type: Schema.Types.ObjectId, required: true },
  fundName: { type: String, required: true },
  balance: { type: Number, required: true },
  status: { type: String, required: true },
});

export const userSchema = new Schema<User>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  balance: { type: Number, required: true, default: 500000 },
  transactions: { type: [userTransactionSchema], default: undefined },
  funds: { type: [userFundSchema], default: undefined },
});
