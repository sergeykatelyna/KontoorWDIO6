import { configLoader } from 'tsconfig-paths/lib/config-loader';
import { BasePO } from './base';

export class ProductDetailsPO extends BasePO {
  waitloader() {
    if ($('.veil').isDisplayed()) {
      $('.veil').waitForDisplayed({ reverse: true, timeout: 20000 });
    }
  }

  closePopUpIfAppeared() {
    if ($$('.overlay-submission a.link__close').length !== 0) {
      if ($('.overlay-submission a.link__close').isDisplayed()) {
        $('.overlay-submission a.link__close').click();
      }
    }
  }

  addToCart(color: string, size1: string, size2: string) {
    this.closePopUpIfAppeared();
    $("[title='" + color + "']").waitForDisplayed();
    browser.keys('Escape');
    $("[title='" + color + "']").click();
    this.waitloader();
    $(".SIZE1 [title='" + size1 + "']").click();
    browser.pause(3000);
    this.waitloader;
    $(".SIZE2 [title='" + size2 + "']").click();
    browser.pause(2000);
    this.waitloader;
    $('.add-to-cart').waitForEnabled();
    //$(".add-to-cart").scrollIntoView();
    browser.keys('Escape');
    $('.add-to-cart').click();
    //browser.waitUntil(function () {
    //  return $(".alert-success").isDisplayed();
    //});
  }

  addToCartInStockVariant() {
    this.closePopUpIfAppeared();
    $('.SIZE1 button').waitForDisplayed();
    if ($$('.variation-container .selected').length == 0) {
      $('.variation-container .color-attribute').click();
    }
    browser.pause(2000);
    let size1 = $$('.SIZE1 button');
    let i = 0;
    let unselectable;
    do {
      unselectable = size1[i].getAttribute('class') === 'unselectable' || size1[i].getAttribute('class') === ' unselectable';
      if (!unselectable) {
        size1[i].click();
        this.waitloader();
      } else {
        i = i + 1;
      }
    } while (unselectable);
    let size2 = $$('.SIZE2 button');
    let j = 0;
    let unselectable1;
    do {
      unselectable1 = size2[j].getAttribute('class') === 'unselectable';
      if (!unselectable1) {
        size2[j].click();
        this.waitloader();
      } else {
        j = j + 1;
      }
    } while (unselectable1);
    browser.pause(3000);
    $('.add-to-cart').waitForEnabled();
    //$(".add-to-cart").scrollIntoView();
    browser.keys('Escape');
    $('.add-to-cart').click();
    $('#add-to-cart-modal .close').waitForDisplayed();
    $('#add-to-cart-modal .close').click();
    $('#add-to-cart-modal .close').waitForDisplayed({ reverse: true });
  }

  goToShoppingCart() {
    $('.minicart-link').waitForDisplayed();
    $('.minicart-link').click();
  }
}

export const productDetailsPage = new ProductDetailsPO();
