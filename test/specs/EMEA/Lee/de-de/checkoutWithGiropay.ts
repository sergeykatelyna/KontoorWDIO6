import { accessSiteAsGuest } from '../../../../scenarios/accessSiteAsGuest';
import { addProductToCart } from '../../../../scenarios/addProductToCart';
import { completeShippingStep } from '../../../../scenarios/completeShippingStep';
import { payWithGiropay } from '../../../../scenarios/payWithGiropay';
import { verifyOrderPlaced } from '../../../../scenarios/verifyOrderPlaced';

import { accounts, addresses, confirmTitle } from '../../../../resources/testData';

describe('Kontoor: guest user places order using GiroPay on Staging EMEA Lee de_DE', function () {
  describe('Access site and log into account', function () {
    accessSiteAsGuest('/s/Lee/de-de');
  });

  describe('Add product to Cart and go to Cart page', function () {
    addProductToCart();
  });

  describe('Complete Shipping step', function () {
    completeShippingStep(accounts[0].email, addresses.de.valid);
  });

  describe('Place order with iDEAL', payWithGiropay);

  describe('Check if order has been placed', function () {
    verifyOrderPlaced(confirmTitle.de);
  });
});
