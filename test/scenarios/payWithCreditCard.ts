import { checkoutPage } from '../pageObjects/checkout.page';

const payWithCreditCard = function (isCreditCardSaved, creditCardCreds?) {
  it('Submit Billing form with CC', function () {
    checkoutPage.completeBillingStepWithCC(isCreditCardSaved, creditCardCreds);

    expect(browser).toHaveUrlContaining('placeOrder');
  });

  it('Submit order from Review step', function () {
    checkoutPage.completeReviewStep();
  });
};

export { payWithCreditCard };
