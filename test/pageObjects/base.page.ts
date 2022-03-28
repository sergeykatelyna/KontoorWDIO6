import { Page } from './page';

abstract class BasePage extends Page {
  // get l1CatLink() {
  //   return $('#WRG_MEN');
  // }

  // get l2CatLink() {
  //   return $('#WRG_MEN_JEANS');
  // }

  get l1CatLink() {
    return $('ul.navbar-nav li.nav-item:nth-child(2) a.nav-link');
  }

  get l2CatLink() {
    return $$('ul.navbar-nav li.nav-item:nth-child(2) ul.dropdown-menu li.dropdown-item:nth-child(3) a')[0];
  }

  get l2CatLinkHref() {
    return this.l2CatLink.getAttribute('href');
  }

  goToCartPage() {
    $('.minicart-link').click();
  }

  goToCategoryPage() {
    this.l1CatLink.moveTo();
    this.l2CatLink.waitForDisplayed();
    this.l2CatLink.click();
  }
}

export { BasePage };
