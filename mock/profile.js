const basicGoods = [
  {
    id: '1234561',
    name: '',
    barcode: '12421432143214321',
    price: '2.00',
    num: '1',
    amount: '2.00',
  },
  {
    id: '1234562',
    name: '',
    barcode: '12421432143214322',
    price: '3.00',
    num: '2',
    amount: '6.00',
  },
  {
    id: '1234563',
    name: '',
    barcode: '12421432143214323',
    price: '7.00',
    num: '4',
    amount: '28.00',
  },
  {
    id: '1234564',
    name: '',
    barcode: '12421432143214324',
    price: '8.50',
    num: '3',
    amount: '25.50',
  },
];

const basicProgress = [
  {
    key: '1',
    time: '1398-10-25 13:00',
    rate: 'فروش جز',
    status: 'processing',
    operator: 'محمد صدری',
    cost: '5 ساعت',
  },
  {
    key: '2',
    time: '1398-10-25 13:00',
    rate: 'فروش جز',
    status: 'success',
    operator: 'محمد راستی',
    cost: '1 ساعت',
  },
  {
    key: '3',
    time: '1398-10-25 13:00',
    rate: 'فروش کل',
    status: 'success',
    operator: 'حامد ناصری',
    cost: '3 ساعت',
  },
  {
    key: '4',
    time: '1398-10-25 13:00',
    rate: 'فروش کل',
    status: 'success',
    operator: 'کامران فروزان',
    cost: '30 دقیقه',
  },
];

const advancedOperation1 = [
  {
    key: 'op1',
    type: 'ورود از موبایل',
    status: 'agree',
    updatedAt: '1398-10-03  19:23:12',
    memo: '-',
  },
  {
    key: 'op2',
    type: 'ورود سیستم',
    status: 'reject',
    updatedAt: '1398-10-03  19:23:12',
    memo: 'بله',
  },
  {
    key: 'op3',
    type: 'ورود از موبایل',
    status: 'agree',
    updatedAt: '1398-10-03  19:23:12',
    memo: '-',
  },
  {
    key: 'op4',
    type: 'ورود از سیستم',
    status: 'agree',
    updatedAt: '1398-10-03  19:23:12',
    memo: 'بله',
  },
  {
    key: 'op5',
    type: 'ورود از سیستم',
    status: 'agree',
    updatedAt: '1398-10-03  19:23:12',
    memo: '-',
  },
];

const advancedOperation2 = [
  {
    key: 'op5',
    type: 'ورود از سیستم',
    status: 'agree',
    updatedAt: '1398-10-03  19:23:12',
    memo: '-',
  },
];

const getProfileBasicData = {
  basicGoods,
  basicProgress,
};

const getProfileAdvancedData = {
  advancedOperation1,
  advancedOperation2
};

export default {
  'GET /api/profile/advanced': getProfileAdvancedData,
  'GET /api/profile/basic': getProfileBasicData,
};
