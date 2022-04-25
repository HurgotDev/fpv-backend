import usersService from '../../../../app/users/user.interactor';
import { getUserFunds, getUserTransactions } from '../../../../app/users';
import withError from '../../hooks/withError';

declare type ICtr = {
  profileUser: any;
  getTransactions: any;
  getFunds: any;
};

const ctr: any = {};

ctr.profileUser = async (req: any, res: any) => {
  // eslint-disable-next-line no-underscore-dangle
  const data = await usersService.get(req.user._id).then((user) => ({
    username: user.username,
    name: user.name,
    lastName: user.lastName,
    balance: user.balance,
  }));

  return res.json(data);
};

ctr.getTransactions = async (req: any, res: any) => {
  const { _id: userId } = req.user;
  const data = await getUserTransactions(userId);

  return res.json({
    transactions: data || [],
  });
};

ctr.getFunds = async (req: any, res: any) => {
  const { _id: userId } = req.user;

  const data = await getUserFunds(userId);

  return res.json({
    funds: data || [],
  });
};

export default withError(ctr) as ICtr;
