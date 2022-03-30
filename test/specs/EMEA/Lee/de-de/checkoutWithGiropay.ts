import { addProductToCart } from '../../../../scenarios/addProductToCart';
import { goToCartPage } from '../../../../scenarios/goToCartPage';
import { completeShippingStep } from '../../../../scenarios/completeShippingStep';
import { payWithGiropay } from '../../../../scenarios/payWithGiropay';
import { verifyOrderPlaced } from '../../../../scenarios/verifyOrderPlaced';

import { addresses, confirmTitle } from '../../../../resources/testData';

describe('Guest user places order using GiroPay on Staging EMEA Lee de_DE', function () {
  describe('Add product to Cart', function () {
    addProductToCart('/s/Lee/de-de');
  });

  describe('Go to Cart page', goToCartPage);

  describe('Complete Shipping step', function () {
    completeShippingStep(addresses.de.valid);
  });

  describe('Place order with iDEAL', payWithGiropay);

  describe('Check if order has been placed', function () {
    verifyOrderPlaced(confirmTitle.de);
  });
});
