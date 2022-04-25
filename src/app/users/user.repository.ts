import MongooseSource from '../../_core/sources/Mongoose.source';
import UserModel from '../../db/models/mongo/users/user.model';
import IUser from '../../entities/users/User';

export default class UserMongoose extends MongooseSource<IUser> {
  /**
   * User Mongoose DataSource
   */
  constructor() {
    super(UserModel);
  }
}
