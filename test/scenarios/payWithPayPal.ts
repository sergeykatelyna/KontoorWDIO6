import { checkoutPage } from '../pageObjects/checkout.page';

const payWithPayPal = function (payPal) {
  it('Submit order with PayPal from Billing step', function () {
    checkoutPage.placeOrderWithPayPal(payPal);
  });
};

export { payWithPayPal };
