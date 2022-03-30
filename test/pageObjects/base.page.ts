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
    return $$('ul.navbar-nav li.nav-item:nth-child(2) ul.dropdown-menu li.dropdown-item:nth-child(3) a')[1];
  }

  get l2CatLinkName() {
    const catPath = this.l2CatLink.getAttribute('data-gtm-menu-path').split(':');
    const catName = catPath[catPath.length - 1].split(' ')[0].toLowerCase();

    return catName;
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
