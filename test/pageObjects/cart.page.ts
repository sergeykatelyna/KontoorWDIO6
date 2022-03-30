import { BasePage } from './base.page';

class CartPage extends BasePage {
  public goToCheckout(): void {
    $('.checkout-btn').click();
  }
}

const cartPage = new CartPage();

export { cartPage };
