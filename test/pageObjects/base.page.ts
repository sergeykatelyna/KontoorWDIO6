import { Page } from './page';

abstract class BasePage extends Page {
  // get l1CatLink() {
  //   return $('#WRG_MEN');
  // }

  // get l2CatLink() {
  //   return $('#WRG_MEN_JEANS');
  // }
  private _l2CatLink: WebdriverIO.Element;

  protected get l1CatLink(): WebdriverIO.Element {
    return $('ul.navbar-nav li.nav-item:nth-child(2) a.nav-link');
  }

  protected get catDropDown(): WebdriverIO.Element {
    return $('ul.navbar-nav li.nav-item:nth-child(2) .dropdown-menu-row');
  }

  protected get l2CatLink(): WebdriverIO.Element {
    if (!this._l2CatLink) {
      const catLinks = $$('ul.navbar-nav li.nav-item:nth-child(2) ul.dropdown-menu li.dropdown-item:nth-child(3) a');
      const visibleCatLink = catLinks.find(catLink => catLink.isClickable());
      this._l2CatLink = visibleCatLink;
    }

    return this._l2CatLink;
  }

  public get l2CatLinkName(): string {
    const catPath = this.l2CatLink.getAttribute('data-gtm-menu-path').split(':');
    const catNamePart = catPath[catPath.length - 1].split(' ')[0].toLowerCase();

    return catNamePart;
  }

  public openCategoryDropDown(): void {
    this.l1CatLink.moveTo();
    this.catDropDown.waitForDisplayed();
  }

  public goToCategoryPage(): void {
    this.l2CatLink.click();
  }

  public goToCartPage(): void {
    $('.minicart-link').click();
  }
}

export { BasePage };
