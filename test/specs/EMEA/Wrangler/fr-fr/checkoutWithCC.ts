import { accessSiteAsGuest } from '../../../../scenarios/accessSiteAsGuest';
import { addProductToCart } from '../../../../scenarios/addProductToCart';
import { completeShippingStep } from '../../../../scenarios/completeShippingStep';
import { payWithCreditCard } from '../../../../scenarios/payWithCreditCard';
import { verifyOrderPlaced } from '../../../../scenarios/verifyOrderPlaced';

import { accounts, addresses, creditCards, confirmTitle } from '../../../../resources/testData';

describe('Kontoor: guest user places order using Credit Card on Staging EMEA Wrangler fr_FR', function () {
  describe('Access site as guest', function () {
    accessSiteAsGuest('/s/Wrangler/fr-fr');
  });

  describe('Add product to Cart and go to Cart page', function () {
    addProductToCart();
  });

  describe('Complete Shipping step', function () {
    completeShippingStep(addresses.fr.valid, accounts[0].email);
  });

  describe('Complete Billing step with new CC', function () {
    payWithCreditCard(false, creditCards.visa);
  });

  describe('Check if order has been placed', function () {
    verifyOrderPlaced(confirmTitle.fr);
  });
});
