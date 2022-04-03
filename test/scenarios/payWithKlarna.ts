import { checkoutPage } from '../pageObjects/checkout.page';

const payWithKlarna = function (klarnaType, klarnaCreds) {
  it('Submit order with Klarna from Billing step', function () {
    checkoutPage.placeOrderWithKlarna(klarnaType, klarnaCreds);
  });
};

export { payWithKlarna };
