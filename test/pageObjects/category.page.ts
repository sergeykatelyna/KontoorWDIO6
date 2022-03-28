import { BasePage } from './base.page';

class CategoryPage extends BasePage {
  get productTile() {
    return $('.product-grid .grid-item:nth-child(1) .pdp-link a');
  }

  get productTileId() {
    return this.productTile.getAttribute('id');
  }

  goToProductDetailsPage() {
    this.productTile.click();
  }
}

const categoryPage = new CategoryPage();

export { categoryPage };
