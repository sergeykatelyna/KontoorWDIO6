import { accessSiteAsGuest } from '../../../../scenarios/accessSiteAsGuest';
import { addProductToCart } from '../../../../scenarios/addProductToCart';
import { completeShippingStep } from '../../../../scenarios/completeShippingStep';
import { payWithKlarna } from '../../../../scenarios/payWithKlarna';
import { verifyOrderPlaced } from '../../../../scenarios/verifyOrderPlaced';

import { accounts, addresses, klarna, confirmTitle } from '../../../../resources/testData';

describe('Kontoor: guest user places order using Klarna Pay In 4 on Staging NAM Wrangler', function () {
  describe('Access site as guest', function () {
    accessSiteAsGuest('/s/Wrangler');
  });

  describe('Add product to Cart and go to Cart page', function () {
    addProductToCart();
  });

  describe('Complete Shipping step', function () {
    completeShippingStep(accounts[0].email, addresses.us.valid);
  });

  describe('Place order with Klarna Pay In 4', function () {
    payWithKlarna('payIn4', klarna.default);
  });

  describe('Check if order has been placed', function () {
    verifyOrderPlaced(confirmTitle.en);
  });
});
