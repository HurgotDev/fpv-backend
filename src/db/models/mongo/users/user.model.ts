import { model } from 'mongoose';

import IUser from '../../../../entities/users/User';

import { userSchema } from './schemas';

const UserModel = model<IUser>('User', userSchema);

export default UserModel;
