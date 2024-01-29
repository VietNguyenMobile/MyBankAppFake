const moment = require('moment');

const transactions = [
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
    date: 'Mon, Jan 15, 2024 10:36 AM',
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
    date: 'Fri, Jan 19, 2024 10:36 AM',
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
    date: 'Fri, Jan 19, 2024 10:36 AM',
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

// Nhóm các giao dịch theo ngày
const groupedTransactions = transactions.reduce((result, transaction) => {
  const date = moment(transaction.date, 'ddd, MMM D, YYYY h:mm A').format(
    'YYYY-MM-DD',
  );
  if (!result[date]) {
    result[date] = [];
  }
  result[date].push(transaction);
  return result;
}, {});

// Chuyển đổi kết quả thành mảng các nhóm
const groupedTransactionsArray = Object.keys(groupedTransactions).map(date => ({
  date,
  transactions: groupedTransactions[date],
}));

console.log(groupedTransactionsArray);
console.log('500,000');
console.log(parseInt('500,000'.replace(/,/g, '')));
