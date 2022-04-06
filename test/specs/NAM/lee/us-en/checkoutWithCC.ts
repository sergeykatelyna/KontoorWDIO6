import { accessSiteAsRegistered } from '../../../../scenarios/accessSiteAsRegistered';
import { addProductToCart } from '../../../../scenarios/addProductToCart';
import { completeShippingStep } from '../../../../scenarios/completeShippingStep';
import { payWithCreditCard } from '../../../../scenarios/payWithCreditCard';
import { verifyOrderPlaced } from '../../../../scenarios/verifyOrderPlaced';

import { accounts, addresses, confirmTitle } from '../../../../resources/testData';

describe('Kontoor: registered user places order using Credit Card on Staging NAM Lee', function () {
  describe('Access site and log into account', function () {
    accessSiteAsRegistered('/s/Lee', accounts[3]);
  });

  describe('Add product to Cart and go to Cart page', function () {
    addProductToCart();
  });

  describe('Complete Shipping step', function () {
    completeShippingStep(addresses.us.valid);
  });

  describe('Complete Billing step with saved CC', function () {
    payWithCreditCard(true);
  });

  describe('Check if order has been placed', function () {
    verifyOrderPlaced(confirmTitle.en);
  });
});
