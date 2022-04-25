import moment from 'moment';

import AppRepository from '../../../_core/repositories/app.repository';
import IUser from '../../../entities/users/User';

export default (userRepo: AppRepository<IUser>) => {
  return async (userId: string) => {
    const data = await userRepo.get(userId);

    return data.transactions?.sort((a, b) => {
      const dateA = moment(a.date);
      const dateB = moment(b.date);

      if (dateB.isAfter(dateA)) return 1;
      if (dateB.isBefore(dateA)) return -1;

      return 0;
    });
  };
};
