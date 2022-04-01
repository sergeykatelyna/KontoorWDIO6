import { addProductToCart } from '../../../../scenarios/addProductToCart';
import { completeShippingStep } from '../../../../scenarios/completeShippingStep';
import { payWithCreditCard } from '../../../../scenarios/payWithCreditCard';
import { verifyOrderPlaced } from '../../../../scenarios/verifyOrderPlaced';

import { email, addresses, creditCards, confirmTitle } from '../../../../resources/testData';

describe('Kontoor: guest user places order using CC on Staging EMEA Wrangler fr_FR', function () {
  describe('Access site, add product to Cart and go to Cart page', function () {
    addProductToCart('/s/Wrangler/fr-fr');
  });

  describe('Complete Shipping step', function () {
    completeShippingStep(email, addresses.fr.valid);
  });

  describe('Complete Billing step with CC', function () {
    payWithCreditCard(creditCards.visa);
  });

  describe('Check if order has been placed', function () {
    verifyOrderPlaced(confirmTitle.fr);
  });
});
