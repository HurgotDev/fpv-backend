import { Schema } from 'mongoose';

import IFund from '../../../../entities/funds/Fund';

export default new Schema<IFund>({
  name: { type: String, required: true },
  minAmount: { type: Number, required: true },
  category: { type: String, required: true },
});
