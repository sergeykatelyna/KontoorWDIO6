import { addProductToCart } from '../../../../scenarios/addProductToCart';
import { goToCartPage } from '../../../../scenarios/goToCartPage';
import { payWithPayPalExpress } from '../../../../scenarios/payWithPayPalExpress';
import { verifyOrderPlaced } from '../../../../scenarios/verifyOrderPlaced';

import { payPal, confirmTitle } from '../../../../resources/testData';

describe('Guest user places order using PayPal Express on Staging NAM Wrangler', function () {
  describe('Add product to Cart', function () {
    addProductToCart('/s/Wrangler');
  });

  describe('Go to Cart page', goToCartPage);

  describe('Place order with PayPal Express', function () {
    payWithPayPalExpress(payPal);
  });

  describe('Check if order has been placed', function () {
    verifyOrderPlaced(confirmTitle.en);
  });
});
