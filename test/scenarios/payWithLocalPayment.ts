import { checkoutPage } from '../pageObjects/checkout.page';

const payWithLocalPayment = function (paymentType) {
  it('Submit order with Local Payment from Billing step', function () {
    checkoutPage.placeOrderWithLocalPayment(paymentType);
  });
};

export { payWithLocalPayment };
