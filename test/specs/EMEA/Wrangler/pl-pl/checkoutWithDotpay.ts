import { addProductToCart } from '../../../../scenarios/addProductToCart';
import { goToCartPage } from '../../../../scenarios/goToCartPage';
import { completeShippingStep } from '../../../../scenarios/completeShippingStep';
import { payWithLocalPayment } from '../../../../scenarios/payWithLocalPayment';
import { verifyOrderPlaced } from '../../../../scenarios/verifyOrderPlaced';

import { addresses, confirmTitle } from '../../../../resources/testData';

describe('Guest user places order using DotPay on Staging EMEA Lee pl_PL', function () {
  describe('Add product to Cart', function () {
    addProductToCart('https://storefront:kontoor@staging-eu01-kontoor.demandware.net/s/Wrangler/pl-pl');
  });

  describe('Go to Cart page', goToCartPage);

  describe('Complete Shipping step', function () {
    completeShippingStep(addresses.pl.valid);
  });

  describe('Place order with DotPay', function () {
    payWithLocalPayment('dotpay');
  });

  describe('Check if order has been placed', function () {
    verifyOrderPlaced(confirmTitle.pl);
  });
});
