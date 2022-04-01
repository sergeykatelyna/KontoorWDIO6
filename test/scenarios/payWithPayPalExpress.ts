import { cartPage } from '../pageObjects/cart.page';
import { checkoutPage } from '../pageObjects/checkout.page';

const payWithPayPalExpress = function (payPal) {
  it('Start PayPal Express from Cart page', function () {
    cartPage.clickPayPalExpressBtn();

    expect(browser).toHaveUrlContaining('paypal');
  });

  it('Submit order with PayPal Express', function () {
    checkoutPage.placeOrderWithPayPalExpress(payPal);
  });
};

export { payWithPayPalExpress };
