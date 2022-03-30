import { checkoutPage } from '../pageObjects/checkout.page';

const verifyOrderPlaced = function (confirmTitle) {
  it('Verify URL and title of Confirmation page', function () {
    const pageUrl = browser.getUrl().toLowerCase();
    expect(pageUrl).toContain('order-confirm');

    const titleText = checkoutPage.confirmStepMessage.getText().toLowerCase();
    expect(titleText).toContain(confirmTitle);
  });
};

export { verifyOrderPlaced };
