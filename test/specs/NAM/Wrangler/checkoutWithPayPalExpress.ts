import { addProductToCart } from '../../../scenarios/addProductToCart';
import { goToCartPage } from '../../../scenarios/goToCartPage';
import { payWithPayPalExpress } from '../../../scenarios/payWithPayPalExpress';
import { checkIfOrderPlaced } from '../../../scenarios/verifyOrderPlaced';

import { payPal } from '../../../resources/testData';

describe('Guest user places order using PayPal Express on Staging NAM Wrangler', function () {
  describe('Add product to Cart', function () {
    addProductToCart('https://storefront:kontoor@staging-na01-kontoor.demandware.net/s/Wrangler');
  });

  describe('Go to Cart page', goToCartPage);

  describe('Place order with PayPal Express', function () {
    payWithPayPalExpress(payPal);
  });

  describe('Check if order has been placed', checkIfOrderPlaced);
});
