import { BasePage } from './base.page';

class CategoryPage extends BasePage {
  private _productTileLink: WebdriverIO.Element;

  protected get catPageTitle(): WebdriverIO.Element {
    return $('h1.category-title');
  }

  protected get productsCounter(): WebdriverIO.Element {
    return $('.result-count .label');
  }

  protected get productsCounterNumber(): number {
    const productsNum = +this.productsCounter.getText();
    const productsNumLimited = productsNum > 48 ? 48 : productsNum;
    return productsNumLimited;
  }

  protected get productTileLink(): WebdriverIO.Element {
    if (this._productTileLink) {
      return this._productTileLink;
    }

    do {
      const productPosition = Math.floor(Math.random() * this.productsCounterNumber + 1);
      const productLink = $(`.product-grid .grid-item:nth-child(${productPosition}) .pdp-link a`);
      this.scrollAndWait(productLink);
      this._productTileLink = productLink;
    } while (!this._productTileLink);
    return this._productTileLink;
  }

  public get catPageTitleText(): string {
    return this.catPageTitle.getText().toLowerCase();
  }

  public get productTileId(): string {
    return this.productTileLink.getAttribute('id');
  }

  public goToProductDetailsPage(): void {
    this.waitAndClick(this.productTileLink);
  }
}

const categoryPage = new CategoryPage();

export { categoryPage };
