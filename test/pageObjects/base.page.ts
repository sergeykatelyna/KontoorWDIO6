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
    if (this._l2CatLink) {
      return this._l2CatLink;
    }

    const l2CatLinks = $$('ul.navbar-nav li.nav-item:nth-child(2) ul.dropdown-menu li.dropdown-item a');
    const visibleL2CatLinks = l2CatLinks.filter(l2CatLink => l2CatLink.isClickable()).slice(1);
    const validL2CatLink = visibleL2CatLinks.find(l2CatLink => !l2CatLink.getAttribute('href').includes('www'));
    this._l2CatLink = validL2CatLink;
    return this._l2CatLink;
  }

  protected get cartLink(): WebdriverIO.Element {
    return $('.minicart-link');
  }

  protected get loginLink(): WebdriverIO.Element {
    return $('.user a[href*="login"]');
  }

  public get l2CatLinkText(): string {
    return this.l2CatLink.getText().toLowerCase();
  }

  public get miniCartQty(): string {
    return $('a .minicart-quantity').getText().trim();
  }

  public openCategoryDropDown(): void {
    this.l1CatLink.moveTo();
    this.catDropDown.waitForDisplayed();
  }

  public goToCategoryPage(): void {
    this.l2CatLink.click();
  }

  public goToCartPage(): void {
    this.cartLink.click();
  }

  public goToLoginPage(): void {
    this.loginLink.click();
  }
}

export { BasePage };
