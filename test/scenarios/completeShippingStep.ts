import { cartPage } from '../pageObjects/cart.page';
import { checkoutPage } from '../pageObjects/checkout.page';

const completeShippingStep = function (address) {
  it('Start Checkout from Cart page', function () {
    cartPage.goToCheckout();

    expect(browser).toHaveUrlContaining('shipping');
  });

  it('Submit Shipping form with valid address', function () {
    checkoutPage.completeShippingStep(address);

    expect(browser).toHaveUrlContaining('payment');
  });
};

export { completeShippingStep };
