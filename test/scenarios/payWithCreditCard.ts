import { checkoutPage } from '../pageObjects/checkout.page';

const payWithCreditCard = function (creditCard) {
  it('Submit Billing form with CC', function () {
    checkoutPage.completeBillingStepWithCC(creditCard);

    expect(browser).toHaveUrlContaining('placeOrder');
  });

  it('Submit order from Review step', function () {
    checkoutPage.completeReviewStep();
  });
};

export { payWithCreditCard };
