import { checkoutPage } from '../pageObjects/checkout.page';

const payWithPayPalExpress = function (payPal) {
  it('Submit order with PayPal Express from Cart page', function () {
    checkoutPage.placeOrderWithPayPalExpress(payPal);
  });
};

export { payWithPayPalExpress };