import { addProductToCart } from '../../../../scenarios/addProductToCart';
import { completeShippingStep } from '../../../../scenarios/completeShippingStep';
import { payWithLocalPayment } from '../../../../scenarios/payWithLocalPayment';
import { verifyOrderPlaced } from '../../../../scenarios/verifyOrderPlaced';

import { email, addresses, confirmTitle } from '../../../../resources/testData';

describe('Kontoor: guest user places order using DotPay on Staging EMEA Lee pl_PL', function () {
  describe('Access site, add product to Cart and go to Cart page', function () {
    addProductToCart('/s/Wrangler/pl-pl');
  });

  describe('Complete Shipping step', function () {
    completeShippingStep(email, addresses.pl.valid);
  });

  describe('Place order with DotPay', function () {
    payWithLocalPayment('dotpay');
  });

  describe('Check if order has been placed', function () {
    verifyOrderPlaced(confirmTitle.pl);
  });
});
