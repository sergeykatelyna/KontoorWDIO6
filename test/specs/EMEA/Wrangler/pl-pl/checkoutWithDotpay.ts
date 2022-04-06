import { accessSiteAndRegister } from '../../../../scenarios/accessSiteAndRegister';
import { addProductToCart } from '../../../../scenarios/addProductToCart';
import { completeShippingStep } from '../../../../scenarios/completeShippingStep';
import { payWithLocalPayment } from '../../../../scenarios/payWithLocalPayment';
import { verifyOrderPlaced } from '../../../../scenarios/verifyOrderPlaced';

import { addresses, confirmTitle } from '../../../../resources/testData';

describe('Kontoor: registered user places order using DotPay on Staging EMEA Wrangler pl_PL', function () {
  describe('Access site, create account and login', function () {
    accessSiteAndRegister('/s/Wrangler/pl-pl');
  });

  describe('Add product to Cart and go to Cart page', function () {
    addProductToCart();
  });

  describe('Complete Shipping step', function () {
    completeShippingStep(addresses.pl.valid);
  });

  describe('Place order with DotPay', function () {
    payWithLocalPayment('dotpay');
  });

  describe('Check if order has been placed', function () {
    verifyOrderPlaced(confirmTitle.pl);
  });
});
