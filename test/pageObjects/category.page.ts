import { BasePage } from './base.page';

class CategoryPage extends BasePage {
  protected get productTile(): WebdriverIO.Element {
    return $('.product-grid .grid-item:nth-child(1) .pdp-link a');
  }

  public get productTileId(): string {
    return this.productTile.getAttribute('id');
  }

  public goToProductDetailsPage(): void {
    this.productTile.click();
  }
}

const categoryPage = new CategoryPage();

export { categoryPage };
