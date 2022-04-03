import { checkoutPage } from '../pageObjects/checkout.page';

const payWithPayPal = function (payPalCreds) {
  it('Submit order with PayPal from Billing step', function () {
    checkoutPage.placeOrderWithPayPal(payPalCreds);
  });
};

export { payWithPayPal };
