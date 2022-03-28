import { checkoutPage } from '../pageObjects/checkout.page';

const checkIfOrderPlaced = function () {
  it('Verify URL and title of Confirmation page', function () {
    expect(browser).toHaveUrlContaining('order-confirm');
    const titleText = checkoutPage.confirmStepMessage.getText().toLowerCase();
    expect(titleText).toContain('thank you for your order');
  });
};

export { checkIfOrderPlaced };
