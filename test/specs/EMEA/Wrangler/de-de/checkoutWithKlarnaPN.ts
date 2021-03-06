import { accessSiteAsGuest } from '../../../../scenarios/accessSiteAsGuest';
import { addProductToCart } from '../../../../scenarios/addProductToCart';
import { completeShippingStep } from '../../../../scenarios/completeShippingStep';
import { payWithKlarna } from '../../../../scenarios/payWithKlarna';
import { verifyOrderPlaced } from '../../../../scenarios/verifyOrderPlaced';

import { accounts, addresses, klarna, confirmTitle } from '../../../../resources/testData';

describe('Kontoor: guest user places order using Klarna Pay Now on Staging EMEA Wrangler de_DE', function () {
  describe('Access site as guest', function () {
    accessSiteAsGuest('/s/Wrangler/de-de');
  });

  describe('Access site, add product to Cart and go to Cart page', function () {
    addProductToCart();
  });

  describe('Complete Shipping step', function () {
    completeShippingStep(addresses.de.valid, accounts[0].email);
  });

  describe('Place order with Klarna Pay Now', function () {
    payWithKlarna('payNow', klarna.de);
  });

  describe('Check if order has been placed', function () {
    verifyOrderPlaced(confirmTitle.de);
  });
});
