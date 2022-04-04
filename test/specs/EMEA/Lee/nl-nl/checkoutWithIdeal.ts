import { accessSiteAsGuest } from '../../../../scenarios/accessSiteAsGuest';
import { addProductToCart } from '../../../../scenarios/addProductToCart';
import { completeShippingStep } from '../../../../scenarios/completeShippingStep';
import { payWithLocalPayment } from '../../../../scenarios/payWithLocalPayment';
import { verifyOrderPlaced } from '../../../../scenarios/verifyOrderPlaced';

import { accounts, addresses, confirmTitle } from '../../../../resources/testData';

describe('Kontoor: guest user places order using iDEAL on Staging EMEA Lee nl_NL', function () {
  describe('Access site as guest', function () {
    accessSiteAsGuest('/s/Lee/nl-nl');
  });

  describe('Add product to Cart and go to Cart page', function () {
    addProductToCart();
  });

  describe('Complete Shipping step', function () {
    completeShippingStep(accounts[0].email, addresses.nl.valid);
  });

  describe('Place order with iDEAL', function () {
    payWithLocalPayment('ideal');
  });

  describe('Check if order has been placed', function () {
    verifyOrderPlaced(confirmTitle.nl);
  });
});
