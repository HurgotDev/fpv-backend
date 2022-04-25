import MongooseSource from '../../_core/sources/Mongoose.source';
import FundModel from '../../db/models/mongo/funds/fund.model';
import IFund from '../../entities/funds/Fund';

export default class FundMongoose extends MongooseSource<IFund> {
  /**
   * User Mongoose DataSource
   */
  constructor() {
    super(FundModel);
  }
}
