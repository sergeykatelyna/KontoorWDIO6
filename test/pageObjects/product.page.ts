import { BasePage } from './base.page';

class ProductPage extends BasePage {
  get miniCartQty() {
    return $('a .minicart-quantity');
  }

  spinnerWait() {
    if ($('.veil').isDisplayed()) {
      $('.veil').waitForDisplayed({ reverse: true });
    }
  }

  selectSizes() {
    const size1 = $$('.SIZE1 button');
    let unselectable1;
    let i = -1;
    do {
      i++;
      unselectable1 = size1[i].getAttribute('class').trim() === 'unselectable';
    } while (unselectable1);
    size1[i].click();
    this.spinnerWait();

    const size2 = $$('.SIZE2 button');
    let unselectable2;
    let j = -1;
    do {
      j++;
      unselectable2 = size2[j].getAttribute('class').trim() === 'unselectable';
    } while (unselectable2);
    size2[j].click();
    this.spinnerWait();
  }

  clickAddToCartBtn() {
    const addToCartBtn = $('.add-to-cart');
    addToCartBtn.waitForEnabled();
    addToCartBtn.click();
  }

  addToCart() {
    this.selectSizes();
    this.clickAddToCartBtn();

    const closeBtn = $('#add-to-cart-modal .close');
    closeBtn.waitForDisplayed();
    closeBtn.click();
  }
}

const productPage = new ProductPage();

export { productPage };
