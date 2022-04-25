import type { Types } from 'mongoose';

import { NotFoundError, NotAceptableError } from '../../../_core/errors';
import AppRepository from '../../../_core/repositories/app.repository';
import IUser from '../../../entities/users/User';
import { createUserTransaction } from '../../users';

export default (userRepo: AppRepository<IUser>) => {
  return async (userId: string, fundId: Types.ObjectId) => {
    const user = await userRepo.get(userId);

    if (!user) throw new NotFoundError('User not found.');

    const subscriptedFund = user?.funds?.find((it) => it.fundId === fundId && it.status === 'subscribed');

    if (!subscriptedFund) throw new NotAceptableError('No estás vinculado a este fondo.');

    const success = await userRepo
      .update(
        {
          // eslint-disable-next-line no-underscore-dangle
          _id: user._id.toString(),
          'funds.fundId': fundId.toString(),
        },
        {
          balance: user.balance + subscriptedFund.balance,
          $set: {
            'funds.$.status': 'unsubscribed',
          },
        }
      )
      .then(async () => {
        await createUserTransaction(userId, {
          amount: subscriptedFund.balance,
          fundId: subscriptedFund.fundId,
          type: 'cancellation',
          fundName: subscriptedFund.fundName,
        });

        return true;
      })
      .catch(() => {
        return false;
      });

    return success;
  };
};
