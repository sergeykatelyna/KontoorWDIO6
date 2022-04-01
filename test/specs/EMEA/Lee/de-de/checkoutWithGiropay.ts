import { addProductToCart } from '../../../../scenarios/addProductToCart';
import { completeShippingStep } from '../../../../scenarios/completeShippingStep';
import { payWithGiropay } from '../../../../scenarios/payWithGiropay';
import { verifyOrderPlaced } from '../../../../scenarios/verifyOrderPlaced';

import { email, addresses, confirmTitle } from '../../../../resources/testData';

describe('Kontoor: guest user places order using GiroPay on Staging EMEA Lee de_DE', function () {
  describe('Access site, add product to Cart and go to Cart page', function () {
    addProductToCart('/s/Lee/de-de');
  });

  describe('Complete Shipping step', function () {
    completeShippingStep(email, addresses.de.valid);
  });

  describe('Place order with iDEAL', payWithGiropay);

  describe('Check if order has been placed', function () {
    verifyOrderPlaced(confirmTitle.de);
  });
});
