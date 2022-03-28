import { addProductToCart } from '../../../scenarios/addProductToCart';
import { goToCartPage } from '../../../scenarios/goToCartPage';
import { completeShippingStep } from '../../../scenarios/completeShippingStep';
import { payWithCreditCard } from '../../../scenarios/payWithCreditCard';
import { completeReviewStep } from '../../../scenarios/completeReviewStep';
import { checkIfOrderPlaced } from '../../../scenarios/verifyOrderPlaced';

import { addresses, creditCards } from '../../../resources/testData';

describe('Guest user places order using CC on Staging NAM Wrangler', function () {
  describe('Add product to Cart', function () {
    addProductToCart('https://storefront:kontoor@staging-na01-kontoor.demandware.net/s/Wrangler');
  });

  describe('Go to Cart page', goToCartPage);

  describe('Complete Shipping step', function () {
    completeShippingStep(addresses.us.valid);
  });

  describe('Complete Billing step with CC', function () {
    payWithCreditCard(creditCards.visa);
  });

  describe('Complete Review step', completeReviewStep);

  describe('Check if order has been placed', checkIfOrderPlaced);
});
