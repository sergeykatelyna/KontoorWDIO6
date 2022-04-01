import { addProductToCart } from '../../../../scenarios/addProductToCart';
import { completeShippingStep } from '../../../../scenarios/completeShippingStep';
import { payWithKlarna } from '../../../../scenarios/payWithKlarna';
import { verifyOrderPlaced } from '../../../../scenarios/verifyOrderPlaced';

import { email, addresses, klarna, confirmTitle } from '../../../../resources/testData';

describe('Kontoor: guest user places order using Klarna on Staging NAM Wrangler', function () {
  describe('Access site, add product to Cart and go to Cart page', function () {
    addProductToCart('/s/Wrangler');
  });

  describe('Complete Shipping step', function () {
    completeShippingStep(email, addresses.us.valid);
  });

  describe('Place order with Klarna', function () {
    payWithKlarna(klarna);
  });

  describe('Check if order has been placed', function () {
    verifyOrderPlaced(confirmTitle.en);
  });
});
