import { accessSiteAsRegistered } from '../../../../scenarios/accessSiteAsRegistered';
import { addProductToCart } from '../../../../scenarios/addProductToCart';
import { completeShippingStep } from '../../../../scenarios/completeShippingStep';
import { payWithKlarna } from '../../../../scenarios/payWithKlarna';
import { verifyOrderPlaced } from '../../../../scenarios/verifyOrderPlaced';

import { accounts, addresses, klarna, confirmTitle } from '../../../../resources/testData';

describe('Kontoor: guest user places order using Klarna Pay Over Time on Staging EMEA Lee uk_EN', function () {
  describe('Access site and log into account', function () {
    accessSiteAsRegistered('/s/Lee/uk-en', accounts[2]);
  });

  describe('Add product to Cart and go to Cart page', function () {
    addProductToCart();
  });

  describe('Complete Shipping step', function () {
    completeShippingStep(accounts[0].email, addresses.uk.valid);
  });

  describe('Place order with Klarna Pay Over Time', function () {
    payWithKlarna('payOverTime', klarna.default);
  });

  describe('Check if order has been placed', function () {
    verifyOrderPlaced(confirmTitle.en);
  });
});
