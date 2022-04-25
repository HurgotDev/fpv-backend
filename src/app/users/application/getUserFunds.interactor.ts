import AppRepository from '../../../_core/repositories/app.repository';
import IUser from '../../../entities/users/User';

export default (userRepo: AppRepository<IUser>) => {
  return async (userId: string) => {
    const data = await userRepo.get(userId);

    return data.funds?.filter((it) => it.status === 'subscribed');
  };
};
