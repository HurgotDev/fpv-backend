import IUser from '../../entities/users/User';
import AppInteractor from '../../_core/interactors/app.interactor';

import UserRepo from './user.repository';

class UserInteractor extends AppInteractor<IUser> {}

export default new UserInteractor(new UserRepo());
