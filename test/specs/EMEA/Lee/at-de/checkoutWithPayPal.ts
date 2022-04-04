import { accessSiteAsGuest } from '../../../../scenarios/accessSiteAsGuest';
import { addProductToCart } from '../../../../scenarios/addProductToCart';
import { completeShippingStep } from '../../../../scenarios/completeShippingStep';
import { payWithPayPal } from '../../../../scenarios/payWithPayPal';
import { verifyOrderPlaced } from '../../../../scenarios/verifyOrderPlaced';

import { accounts, addresses, payPal, confirmTitle } from '../../../../resources/testData';

describe('Kontoor: guest user places order using PayPal on Staging EMEA Lee at_DE', function () {
  describe('Access site as guest', function () {
    accessSiteAsGuest('/s/Lee/at-de');
  });

  describe('Add product to Cart and go to Cart page', function () {
    addProductToCart();
  });

  describe('Complete Shipping step', function () {
    completeShippingStep(accounts[0].email, addresses.at.valid);
  });

  describe('Place order with PayPal', function () {
    payWithPayPal(payPal);
  });

  describe('Check if order has been placed', function () {
    verifyOrderPlaced(confirmTitle.de);
  });
});
