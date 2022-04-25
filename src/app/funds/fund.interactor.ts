import IFund from '../../entities/funds/Fund';
import AppInteractor from '../../_core/interactors/app.interactor';

import FundRepo from './fund.repository';

class FundInteractor extends AppInteractor<IFund> {}

export default new FundInteractor(new FundRepo());
