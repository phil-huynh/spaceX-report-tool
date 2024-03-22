const cardFormats: Record<string, (num: string) => boolean> = {

  'American Express': (num: string): boolean => (
    ['34', '37'].includes(num.slice(0, 2)) && num.length === 15
  ),

  Visa: (num: string): boolean => (
    num[0] === '4' && [13, 16, 19].includes(num.length)
  ),

  'Visa Electron': (num: string): boolean => {
    if (num.length === 16) {
      if (['4026', '4508', '4844', '4913', '4917'].includes(num.slice(0, 4))) {
        return true;
      }
      if (num.slice(0, 6) === '417500') {
        return true;
      }
    }
    return false;
  },

  Mastercard: (num: string): boolean => {
    if (num.length === 16) {
      if (Number(num.slice(0, 4)) >= 2221 && Number(num.slice(0, 4)) <= 2720) {
        return true;
      }
      if (Number(num.slice(0, 2)) >= 51 && Number(num.slice(0, 2)) <= 55) {
        return true;
      }
    }
    return false;
  },

  Discover: (num: string): boolean => {
    if (num.length >= 16 && num.length <= 19) {
      if (num.slice(0, 4) === '6011' || num.slice(0, 2) === '65') {
        return true;
      }
      if (Number(num.slice(0, 3)) >= 644 && Number(num.slice(0, 3)) <= 649) {
        return true;
      }
      if (Number(num.slice(0, 6)) >= 622126 && Number(num.slice(0, 6)) <= 622925) {
        return true;
      }
    }
    return false;
  },

  Maestro: (num: string): boolean => {
    if (['5018', '5020', '5038', '5893', '6304', '6759', '6761', '6762', '6763'].includes(num.slice(0, 4))) {
      if (num.length >= 12 && num.length <= 19) {
        return true;
      }
    }
    return false;
  },

  MaestroUK: (num: string): boolean => {
    if (num.length >= 12 && num.length <= 19) {
      if (num.slice(0, 4) === '6759' || ['676770', '676774'].includes(num.slice(0, 6))) {
        return true;
      }
    }
    return false;
  },

  Verve: (num: string): boolean => {
    if ([16, 18, 19].includes(num.length)) {
      const number: number = Number(num.slice(0, 6));
      if ((number >= 506099 && number <= 506198) ||
        (number >= 507865 && number <= 507964) ||
        (number >= 650002 && number <= 650027)) {
        return true;
      }
    }
    return false;
  },

  'Japan Credit Bureau': (num: string): boolean => {
    if (num.length >= 16 && num.length <= 19) {
      const number: number = Number(num.slice(0, 4));
      if (number >= 3528 && number <= 3589) {
        return true;
      }
    }
    return false;
  },

  UrkCard: (num: string): boolean => {
    if (num.length >= 16 && num.length <= 19) {
      const number: number = Number(num.slice(0, 8));
      if (number >= 60400100 && number <= 60420099) {
        return true;
      }
    }
    return false;
  },

  RuPay: (num: string): boolean => {
    if (num.length === 16) {
      if (['60', '65', '81', '82'].includes(num.slice(0, 2)) ||
        ['353', '356', '508'].includes(num.slice(0, 3))) {
        return true;
      }
    }
    return false;
  },

  Mir: (num: string): boolean => {
    if ((num.length >= 16 && num.length <= 19)){
      if (['2200', '2201', '2202', '2203', '2204'].includes(num.slice(0, 4))) {
        return true;
      }
    }
    return false;
  },

  'Gerbang Pembayaran Nasional': (num: string): boolean => {
    if ([16, 18, 19].includes(num.length)) {
      if (['50', '56', '58', '60', '61', '62', '63'].includes(num.slice(0, 2))) {
        return true;
      }
    }
    return false;
  },

  Troy: (num: string): boolean => num.length === 16 && (num.slice(0, 2) === '65' || num.slice(0, 4) === '9792'),
  InterPayment: (num: string): boolean => num.length >= 16 && num.length <= 19 && num.slice(0, 3) === '636',
  InstaPayment: (num: string): boolean => ['637', '638', '639'].includes(num.slice(0, 3)) && num.length === 16,
  'Universal Air Travel Plan': (num: string): boolean => num[0] === '1' && num.length === 15,
  "Diners Club International": (num: string): boolean => num.length >= 14 && num.length <= 19 && num.slice(0, 2) === '36',
  "Diners Club US/Canada": (num: string): boolean => num.length === 16 && num.slice(0, 2) === '55',
  "Canadian Imperial Bank of Commerce": (num: string): boolean => num.length === 16 && num.slice(0, 4) === '4506',
  "Royal Bank of Canada": (num: string): boolean => num.length === 16 && num.slice(0, 2) === '45',
  "TD Canada Trust": (num: string): boolean => num.length === 16 && num.slice(0, 4) === '4724',
  "Scotiabank": (num: string): boolean => num.length === 16 && num.slice(0, 4) === '4536',
  "Bank of Montreal": (num: string): boolean => num.length === 16 && (num.slice(0, 4) === '5510' || num.slice(0, 3) === '500'),
  "HSBC Bank Canada": (num: string): boolean => num.length === 16 && num.slice(0, 2) === '56',
  "Conexus Credit Union": (num: string): boolean => num.length === 16 && num.slice(0, 6) === '629449',
  'China T Union': (num: string): boolean => num.length === 19 && num.slice(0, 2) === '31',
  'China Union Pay': (num: string): boolean => num.length >= 16 && num.length <= 19 && num.slice(0, 2) === '62',
  'Bank Negara Indonesia': (num: string): boolean => [16, 18, 19].includes(num.length) && num.slice(0, 4) === '1946',
  Dankort: (num: string): boolean => num.length === 16 && (num.slice(0, 4) === '5019' || num.slice(0, 4) === '4517'),
  BORICA: (num: string): boolean => num.length === 16 && num.slice(0, 4) === '2205',
  LankaPay: (num: string): boolean => num.slice(0, 6) === '357111' && num.length === 16,
};

export default cardFormats;