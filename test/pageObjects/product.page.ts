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
    let size1Class;
    let i = -1;
    do {
      i++;
      size1Class = size1[i].getAttribute('class').trim();
    } while (size1Class === 'unselectable');
    if (size1Class !== 'selected') {
      size1[i].click();
    }
    this.spinnerWait();

    const size2 = $$('.SIZE2 button');
    let size2Class;
    let j = -1;
    do {
      j++;
      size2Class = size2[j].getAttribute('class').trim();
    } while (size2Class === 'unselectable');
    if (size2Class !== 'selected') {
      size2[j].click();
    }
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
