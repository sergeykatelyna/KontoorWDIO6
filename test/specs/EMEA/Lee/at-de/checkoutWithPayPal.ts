import { addProductToCart } from '../../../../scenarios/addProductToCart';
import { completeShippingStep } from '../../../../scenarios/completeShippingStep';
import { payWithPayPal } from '../../../../scenarios/payWithPayPal';
import { verifyOrderPlaced } from '../../../../scenarios/verifyOrderPlaced';

import { email, addresses, payPal, confirmTitle } from '../../../../resources/testData';

describe('Kontoor: guest user places order using PayPal on Staging EMEA Lee at_DE', function () {
  describe('Access site, add product to Cart and go to Cart page', function () {
    addProductToCart('/s/Lee/at-de');
  });

  describe('Complete Shipping step', function () {
    completeShippingStep(email, addresses.at.valid);
  });

  describe('Place order with PayPal', function () {
    payWithPayPal(payPal);
  });

  describe('Check if order has been placed', function () {
    verifyOrderPlaced(confirmTitle.de);
  });
});
