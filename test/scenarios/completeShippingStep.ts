import { cartPage } from '../pageObjects/cart.page';
import { checkoutPage } from '../pageObjects/checkout.page';

const completeShippingStep = function (address, email?) {
  it('Start Checkout from Cart page', function () {
    cartPage.clickCheckoutBtn();

    expect(browser).toHaveUrlContaining('shipping');
  });

  it('Submit Shipping form with valid address', function () {
    checkoutPage.completeShippingStep(address, email);

    expect(browser).toHaveUrlContaining('payment');
  });
};

export { completeShippingStep };
