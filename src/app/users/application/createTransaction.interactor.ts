import AppRepository from '../../../_core/repositories/app.repository';
import IUser from '../../../entities/users/User';
import IUserTransaction from '../../../entities/users/UserTransaction';

export default (userRepo: AppRepository<IUser>) => {
  return async (userId: string, transactionData: Omit<IUserTransaction, '_id' | 'date'>) => {
    const date = new Date().toISOString();
    const data = await userRepo.update(userId, {
      $push: {
        transactions: {
          ...transactionData,
          date,
        },
      },
    });

    return data;
  };
};
