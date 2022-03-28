import { checkoutPage } from '../pageObjects/checkout.page';

const payWithKlarna = function (klarna) {
  it('Submit order with Klarna from Billing step', function () {
    checkoutPage.placeOrderWithKlarna(klarna);
  });
};

export { payWithKlarna };