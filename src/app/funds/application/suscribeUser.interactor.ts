/* eslint-disable no-underscore-dangle */
import type { Types } from 'mongoose';

import numeral from 'numeral';

import { NotFoundError, NotAceptableError } from '../../../_core/errors';
import AppRepository from '../../../_core/repositories/app.repository';
import IUser from '../../../entities/users/User';
import IFund from '../../../entities/funds/Fund';
import { createUserTransaction } from '../../users';

export default (userRepo: AppRepository<IUser>, fundRepo: AppRepository<IFund>) => {
  return async (userId: string, fundId: Types.ObjectId, amount: number) => {
    const user = await userRepo.get(userId);

    if (!user) throw new NotFoundError('User not found.');

    const isSubscripted = user?.funds?.find((it) => it.fundId === fundId && it.status === 'subscribed');

    if (isSubscripted) throw new NotAceptableError('Ya estás suscrito a este fondo.');

    const dataFund = await fundRepo.get(fundId.toString());

    if (!dataFund) throw new NotFoundError('El fondo seleccionado no existe.');

    if (user.balance < amount) {
      throw new NotAceptableError(`No saldo disponible para vincularse al fondo ${dataFund.name}`);
    }
    if (amount < dataFund.minAmount) {
      throw new NotAceptableError(`Se requiere un monto mínimo de ${numeral(dataFund.minAmount).format('$ 0,0')}`);
    }

    const success = await userRepo
      .update(user._id.toString(), {
        balance: user.balance - amount,
        $push: {
          funds: {
            balance: amount,
            fundId: dataFund._id,
            status: 'subscribed',
            fundName: dataFund.name,
          },
        },
      })
      .then(async () => {
        await createUserTransaction(userId, {
          amount,
          fundId: dataFund._id,
          fundName: dataFund.name,
          type: 'opening',
        });

        return true;
      })
      .catch(() => {
        return false;
      });

    return success;
  };
};
