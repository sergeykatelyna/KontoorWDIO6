import { homePage } from '../pageObjects/home.page';
import { categoryPage } from '../pageObjects/category.page';
import { productPage } from '../pageObjects/product.page';

const addProductToCart = function (domain) {
  it('Access site', function () {
    homePage.open(domain);

    expect(browser).toHaveUrlContaining('home');
  });

  it('Navigate to Category page', function () {
    const catHref = homePage.l2CatLinkHref;

    homePage.goToCategoryPage();

    expect(browser).toHaveUrlContaining(catHref);
  });

  it('Navigate to Product page', function () {
    const productId = categoryPage.productTileId;

    categoryPage.goToProductDetailsPage();

    expect(browser).toHaveUrlContaining(productId);
  });

  it('Add product to Cart', function () {
    productPage.addToCart();

    expect(productPage.miniCartQty).toHaveText('1');
  });
};

export { addProductToCart };
