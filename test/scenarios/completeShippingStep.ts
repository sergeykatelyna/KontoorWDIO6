import { cartPage } from '../pageObjects/cart.page';
import { checkoutPage } from '../pageObjects/checkout.page';

const completeShippingStep = function (email, address) {
  it('Start Checkout from Cart page', function () {
    cartPage.clickCheckoutBtn();

    expect(browser).toHaveUrlContaining('shipping');
  });

  it('Submit Shipping form with valid address', function () {
    checkoutPage.completeShippingStep(email, address);

    expect(browser).toHaveUrlContaining('payment');
  });
};

export { completeShippingStep };
