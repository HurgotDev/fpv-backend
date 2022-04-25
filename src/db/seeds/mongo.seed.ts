import fundsService from '../../app/funds/fund.interactor';

const fundSeeder = async () => {
  const currentData = await fundsService.findAll();

  if (currentData.length) return;

  // eslint-disable-next-line no-console
  console.log('Creating funds seeds...');
  await fundsService.create([
    {
      name: 'FPV_BTG_PACTUAL_RECAUDADORA',
      minAmount: 75000,
      category: 'FPV',
    },
    {
      name: 'FPV_BTG_PACTUAL_ECOPETROL',
      minAmount: 125000,
      category: 'FPV',
    },
    {
      name: 'DEUDAPRIVADA',
      minAmount: 50000,
      category: 'FIC',
    },
    {
      name: 'FDO-ACCIONES',
      minAmount: 250000,
      category: 'FIC',
    },
    {
      name: 'FPV_BTG_PACTUAL_DINAMICA',
      minAmount: 100000,
      category: 'FPV',
    },
  ]);
  // eslint-disable-next-line no-console
  console.log('Funds seeds created!');
};

export default () => {
  fundSeeder();
};
