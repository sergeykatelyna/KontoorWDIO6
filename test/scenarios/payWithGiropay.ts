import { checkoutPage } from '../pageObjects/checkout.page';

const payWithGiropay = function () {
  it('Submit order with GiroPay from Billing step', function () {
    checkoutPage.placeOrderWithGiropay();
  });
};

export { payWithGiropay };
