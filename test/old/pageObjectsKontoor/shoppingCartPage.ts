import { BasePO } from './base';
import { expect, assert } from 'chai';

export class ShippingCartPagePO extends BasePO {
  open(site: string) {
    super.open(site + '/checkout/shopping-cart');
  }

  clickCheckoutButton() {
    $('#cart-checkout-button').click();
    $('.checkout-as-guest').waitForDisplayed();
    $('.checkout-as-guest').click();
  }
}

export const shoppingCartPage = new ShippingCartPagePO();
