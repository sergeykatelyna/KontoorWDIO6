import { addProductToCart } from '../../../../scenarios/addProductToCart';
import { goToCartPage } from '../../../../scenarios/goToCartPage';
import { completeShippingStep } from '../../../../scenarios/completeShippingStep';
import { payWithCreditCard } from '../../../../scenarios/payWithCreditCard';
import { completeReviewStep } from '../../../../scenarios/completeReviewStep';
import { verifyOrderPlaced } from '../../../../scenarios/verifyOrderPlaced';

import { addresses, creditCards, confirmTitle } from '../../../../resources/testData';

describe('Guest user places order using CC on Staging EMEA Wrangler fr_FR', function () {
  describe('Add product to Cart', function () {
    addProductToCart('https://storefront:kontoor@staging-eu01-kontoor.demandware.net/s/Wrangler/fr-fr');
  });

  describe('Go to Cart page', goToCartPage);

  describe('Complete Shipping step', function () {
    completeShippingStep(addresses.fr.valid);
  });

  describe('Complete Billing step with CC', function () {
    payWithCreditCard(creditCards.visa);
  });

  describe('Complete Review step', completeReviewStep);

  describe('Check if order has been placed', function () {
    verifyOrderPlaced(confirmTitle.fr);
  });
});
