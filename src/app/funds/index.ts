import UserMongo from '../users/user.repository'
import FundMongo from './fund.repository'

import suscribeUserInteractor from "./application/suscribeUser.interactor"
import cancelSubscriptionInteractor from './application/cancelSubscription.interactor'

const userRepo = new UserMongo()
const fundRepo = new FundMongo()

export const suscribeUser = suscribeUserInteractor(userRepo, fundRepo)
export const cancelSubscription = cancelSubscriptionInteractor(userRepo)