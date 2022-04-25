import { model } from 'mongoose';

import IFund from '../../../../entities/funds/Fund';

import fundSchema from './schemas';

const FundModel = model<IFund>('Fund', fundSchema);

export default FundModel;
