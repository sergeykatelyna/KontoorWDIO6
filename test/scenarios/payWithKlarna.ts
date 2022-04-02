import { checkoutPage } from '../pageObjects/checkout.page';

const payWithKlarna = function (klarnaType, klarna) {
  it('Submit order with Klarna from Billing step', function () {
    checkoutPage.placeOrderWithKlarna(klarnaType, klarna);
  });
};

export { payWithKlarna };
