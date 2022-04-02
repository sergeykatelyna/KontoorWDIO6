import { confirmationPage } from '../pageObjects/confirmation.page';

const verifyOrderPlaced = function (confirmTitle) {
  it('Verify URL and title of Confirmation page', function () {
    const pageUrl = browser.getUrl().toLowerCase();
    expect(pageUrl).toContain('order-confirm');

    const titleText = confirmationPage.confirmStepMessage.getText().toLowerCase();
    expect(titleText).toContain(confirmTitle);
  });
};

export { verifyOrderPlaced };
