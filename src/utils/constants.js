const home_tabs = [
  {
    id: 0,
    label: 'Product',
  },
  {
    id: 1,
    label: 'My Chart',
  },
  {
    id: 2,
    label: 'Service',
  },
  ,
];

const dashboard_screens = {
  home: 'Home',
  category: 'Category',
  promo: 'Promo',
  profile: 'Profile',
};

const bottom_tabs = [
  {
    id: 0,
    label: dashboard_screens.home,
  },
  {
    id: 1,
    label: dashboard_screens.category,
  },
  {
    id: 2,
    label: dashboard_screens.promo,
  },
  {
    id: 3,
    label: dashboard_screens.profile,
  },
  ,
];

const scan_product_option = {
  qr: 'QR',
  camera: 'CAMERA',
};

// const xClientId = 'c3e792c8-d916-4659-84e3-f633061710cd'; // quocviet.ce
// const xApiKey = '44be5543-e624-4c42-9cbc-acec33846446';

const xClientId = 'f0a5a2c8-1b45-47ec-8145-e471ec807eac';
const xApiKey = '53fb9468-547c-4b03-889b-9c96017df0a2';

const HEROKU_LINK = 'https://decode-vietqr.vercel.app/decode-vietqr';

export const DATA_MOCK_TRANSACTION = [
  {
    isInCome: false,
    date: 'Mon, Jan 22, 2024 10:36 AM',
    nameTraction: 'SHOPEEPAY JOINT STOCK',
    amount: 2000000,
    note: 'NAP VI SHOPEEPAY',
    numberAccount: '4324324',
    dataBank: {
      id: 17,
      name: 'Ngân hàng TMCP Công thương Việt Nam',
      code: 'ICB',
      bin: '970415',
      shortName: 'VietinBank',
      logo: 'https://api.vietqr.io/img/ICB.png',
      transferSupported: 1,
      lookupSupported: 1,
      short_name: 'VietinBank',
      support: 3,
      isTransfer: 1,
      swift_code: 'ICBVVNVX',
    },
  },
  {
    isInCome: true,
    nameTraction: 'Incoming money',
    date: 'Fri, Jan 19, 2024 10:36 AM',
    amount: 300000000,
    note: 'Thanh Toan',
    numberAccount: '4324324',
    dataBank: {
      id: 42,
      name: 'Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam',
      code: 'VBA',
      bin: '970405',
      shortName: 'Agribank',
      logo: 'https://api.vietqr.io/img/VBA.png',
      transferSupported: 1,
      lookupSupported: 1,
      short_name: 'Agribank',
      support: 3,
      isTransfer: 1,
      swift_code: 'VBAAVNVX',
    },
  },
  {
    isInCome: false,
    nameTraction: 'SHOPEEPAY JOINT STOCK',
    date: 'Mon, Jan 15, 2024 10:36 AM',
    amount: 3704000,
    note: 'NAP VI SHOPEEPAY',
    numberAccount: '4324324',
    dataBank: {
      id: 43,
      name: 'Ngân hàng TMCP Ngoại Thương Việt Nam',
      code: 'VCB',
      bin: '970436',
      shortName: 'Vietcombank',
      logo: 'https://api.vietqr.io/img/VCB.png',
      transferSupported: 1,
      lookupSupported: 1,
      short_name: 'Vietcombank',
      support: 3,
      isTransfer: 1,
      swift_code: 'BFTVVNVX',
    },
  },
  {
    isInCome: true,
    nameTraction: 'Incoming money',
    date: 'Mon, Jan 15, 2024 10:36 AM',
    amount: 900000000,
    note: 'Sent by me',
    numberAccount: '4324324',
    dataBank: {
      id: 4,
      name: 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam',
      code: 'BIDV',
      bin: '970418',
      shortName: 'BIDV',
      logo: 'https://api.vietqr.io/img/BIDV.png',
      transferSupported: 1,
      lookupSupported: 1,
      short_name: 'BIDV',
      support: 3,
      isTransfer: 1,
      swift_code: 'BIDVVNVX',
    },
  },
];

export default {
  home_tabs,
  dashboard_screens,
  bottom_tabs,
  scan_product_option,
  xClientId,
  xApiKey,
  HEROKU_LINK,
  DATA_MOCK_TRANSACTION,
};
