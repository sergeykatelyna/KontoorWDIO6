export const accounts = [
  {
    email: 'sperotest3@gmail.com',
    password: 'Password-1'
  },
  {
    email: 'sperotest4@gmail.com',
    password: 'Password-1'
  },
  {
    email: 'sperotest5@gmail.com',
    password: 'Password-1'
  },
  {
    email: 'sperotest6@gmail.com',
    password: 'Password-1'
  }
];

export const addresses = {
  us: {
    valid: {
      address1: '315 E. Eisenhower Parkway',
      address2: '',
      city: 'Ann Arbor',
      state: 'MI',
      zip: '48108',
      phone: '7345555555'
    },
    invalid: {
      address1: '315 E. Eisenhower Parkway',
      address2: '',
      city: 'Ann Arbor',
      state: 'MI',
      zip: '48108',
      phone: '7345555555'
    }
  },
  fr: {
    valid: {
      address1: '16 Allée des Coquelicots',
      address2: '',
      city: 'Abbaretz',
      state: 'Pays de la Loire',
      zip: '44170',
      phone: '3333333333'
    }
  },
  uk: {
    valid: {
      address1: '16 Maldon Road',
      address2: 'Sherlock Cafe',
      city: 'Burnham-on-Crouch',
      state: 'Essex',
      zip: 'CM0 8NS',
      phone: '3333333333'
    }
  },
  pl: {
    valid: {
      address1: 'Wiesławów 2',
      address2: '',
      city: 'Złożeniec',
      state: 'Śląskie',
      zip: '42-436',
      phone: '3333333333'
    }
  },
  de: {
    valid: {
      address1: 'DHL Packstation 114',
      address2: '',
      city: 'Penzberg',
      state: 'FSK_74_mit Dach_lang',
      zip: '82377',
      phone: '3333333333'
    }
  },
  nl: {
    valid: {
      address1: 'Kerkstraat 16a',
      address2: '',
      city: 'Leende',
      state: 'Noord-Brabant',
      zip: '5595 CX',
      phone: '3333333333'
    }
  },
  at: {
    valid: {
      address1: 'Siedlung zum alten Ziegelofen 115d',
      address2: '',
      city: 'Wimpassing an der Leitha',
      state: 'Niederösterreich',
      zip: '2485',
      phone: '3333333333'
    }
  },
  it: {
    valid: {
      address1: 'Via Dafnica 321',
      address2: '',
      city: 'Acireale',
      state: 'CT',
      zip: '95024',
      phone: '3333333333'
    }
  }
};

export const creditCards = {
  visa: {
    number: '4111111111111111',
    cvv: '737',
    date: '0330',
    name: 'NameOnCard'
  },
  amex: {
    number: '370000000000101',
    cvv: '7373',
    date: '0330',
    name: 'NameOnCard'
  },
  mc: {
    number: '5500000000000004',
    cvv: '737',
    date: '0330',
    name: 'NameOnCard'
  }
};

export const payPal = {
  email: 'asqagroup@lyonscg.com',
  password: 'drowssapA1'
};

export const klarna = {
  default: {
    phone: '+13322176301',
    code: '111111'
  },
  de: {
    phone: '+4917716565189',
    code: '111111',
    date: '11111990',
    iban: 'DE11520513735120710131'
  }
};

export const confirmTitle = {
  en: 'thank you for your order',
  nl: 'bedankt voor je bestelling',
  fr: 'merci de votre commande',
  pl: 'dziękuję za twoje zamówienie',
  de: 'vielen dank für ihre bestellung',
  it: `grazie per l''ordine`
};
