import { accessSiteAsRegistered } from '../../../../scenarios/accessSiteAsRegistered';
import { addProductToCart } from '../../../../scenarios/addProductToCart';
import { completeShippingStep } from '../../../../scenarios/completeShippingStep';
import { payWithPayPal } from '../../../../scenarios/payWithPayPal';
import { verifyOrderPlaced } from '../../../../scenarios/verifyOrderPlaced';

import { accounts, addresses, payPal, confirmTitle } from '../../../../resources/testData';

describe('Kontoor: registered user places order using PayPal on Staging NAM Wrangler', function () {
  describe('Access site and log into account', function () {
    accessSiteAsRegistered('/s/Wrangler', accounts[1]);
  });

  describe('Add product to Cart and go to Cart page', function () {
    addProductToCart();
  });

  describe('Complete Shipping step', function () {
    completeShippingStep(addresses.us.valid);
  });

  describe('Place order with PayPal', function () {
    payWithPayPal(payPal);
  });

  describe('Check if order has been placed', function () {
    verifyOrderPlaced(confirmTitle.en);
  });
});
