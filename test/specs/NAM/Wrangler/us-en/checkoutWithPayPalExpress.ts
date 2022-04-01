import { addProductToCart } from '../../../../scenarios/addProductToCart';
import { payWithPayPalExpress } from '../../../../scenarios/payWithPayPalExpress';
import { verifyOrderPlaced } from '../../../../scenarios/verifyOrderPlaced';

import { payPal, confirmTitle } from '../../../../resources/testData';

describe('Kontoor: guest user places order using PayPal Express on Staging NAM Wrangler', function () {
  describe('Access site, add product to Cart and go to Cart page', function () {
    addProductToCart('/s/Wrangler');
  });

  describe('Place order with PayPal Express', function () {
    payWithPayPalExpress(payPal);
  });

  describe('Check if order has been placed', function () {
    verifyOrderPlaced(confirmTitle.en);
  });
});
