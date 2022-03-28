import { checkoutPage } from '../pageObjects/checkout.page';

const completeReviewStep = function () {
  it('Submit order from Review step', function () {
    checkoutPage.completeReviewStep();
  });
};

export { completeReviewStep };
