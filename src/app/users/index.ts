import UserMongo from './user.repository';
import createTransactionInteractor from './application/createTransaction.interactor';
import getUserFundsInteractor from './application/getUserFunds.interactor';
import getUserTransactionsInteractor from './application/getUserTransactions.interactor';

const userRepo = new UserMongo();

export const createUserTransaction = createTransactionInteractor(userRepo);
export const getUserFunds = getUserFundsInteractor(userRepo);
export const getUserTransactions = getUserTransactionsInteractor(userRepo);
