import fundsService from '../../../../app/funds/fund.interactor';
import withError from '../../hooks/withError';
import { suscribeUser, cancelSubscription } from '../../../../app/funds'
import { NotAceptableError } from '../../../../_core/errors';

declare type ICtr = {
  getFunds: any;
  suscribeUser: any;
  cancelSubscription: any;
};

const ctr: any = {};

ctr.getFunds = async (req: any, res: any) => {
  const funds = await fundsService.findAll();

  return res.json({ funds });
};

ctr.suscribeUser = async (req: any, res: any) => {
    const { _id: userId } = req.user
    const { id: fundId } = req.params
    const { amount } = req.body

    if (!amount) throw new NotAceptableError('Amount is required!')
    
    const success = await suscribeUser(userId, fundId, amount)

    return res.json({
        success,
        message: success ? 'Apertura realizada correctamente.' : 'No ha sido posible realizar la apertura.'
    })
}

ctr.cancelSubscription = async (req: any, res: any) => {
    const { _id: userId } = req.user
    const { id: fundId } = req.params
    
    const success = await cancelSubscription(userId, fundId)

    return res.json({
        success,
        message: success ? 'cancelación realizada correctamente.' : 'No ha sido posible realizar la cancelación.'
    })
}

export default withError(ctr) as ICtr;
