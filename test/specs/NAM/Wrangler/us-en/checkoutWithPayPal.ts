import { addProductToCart } from '../../../../scenarios/addProductToCart';
import { goToCartPage } from '../../../../scenarios/goToCartPage';
import { completeShippingStep } from '../../../../scenarios/completeShippingStep';
import { payWithPayPal } from '../../../../scenarios/payWithPayPal';
import { verifyOrderPlaced } from '../../../../scenarios/verifyOrderPlaced';

import { addresses, payPal, confirmTitle } from '../../../../resources/testData';

describe('Guest user places order using PayPal on Staging NAM Wrangler', function () {
  describe('Add product to Cart', function () {
    addProductToCart('/s/Wrangler');
  });

  describe('Go to Cart page', goToCartPage);

  describe('Complete Shipping step', function () {
    completeShippingStep(addresses.us.valid);
  });

  describe('Place order with PayPal', function () {
    payWithPayPal(payPal);
  });

  describe('Check if order has been placed', function () {
    verifyOrderPlaced(confirmTitle.en);
  });
});
