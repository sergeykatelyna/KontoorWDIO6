import { addProductToCart } from '../../../../scenarios/addProductToCart';
import { goToCartPage } from '../../../../scenarios/goToCartPage';
import { completeShippingStep } from '../../../../scenarios/completeShippingStep';
import { payWithLocalPayment } from '../../../../scenarios/payWithLocalPayment';
import { verifyOrderPlaced } from '../../../../scenarios/verifyOrderPlaced';

import { addresses, confirmTitle } from '../../../../resources/testData';

describe('Guest user places order using iDEAL on Staging EMEA Lee nl_NL', function () {
  describe('Add product to Cart', function () {
    addProductToCart('/s/Lee/nl-nl');
  });

  describe('Go to Cart page', goToCartPage);

  describe('Complete Shipping step', function () {
    completeShippingStep(addresses.nl.valid);
  });

  describe('Place order with iDEAL', function () {
    payWithLocalPayment('ideal');
  });

  describe('Check if order has been placed', function () {
    verifyOrderPlaced(confirmTitle.nl);
  });
});
