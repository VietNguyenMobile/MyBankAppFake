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

export default {
  home_tabs,
  dashboard_screens,
  bottom_tabs,
  scan_product_option,
  xClientId,
  xApiKey,
  HEROKU_LINK,
};
