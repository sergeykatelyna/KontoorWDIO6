import { BasePage } from './base.page';

class CartPage extends BasePage {
  goToCheckout() {
    $('.checkout-btn').click();
  }
}

const cartPage = new CartPage();

export { cartPage };
