import { homePage } from '../pageObjects/home.page';
import { categoryPage } from '../pageObjects/category.page';
import { productPage } from '../pageObjects/product.page';

const addProductToCart = function (urlSitePath) {
  it('Access site', function () {
    homePage.open(urlSitePath);

    expect(browser).toHaveUrlContaining('home');
  });

  it('Navigate to Category page', function () {
    homePage.openCategoryDropDown();

    const catName = homePage.l2CatLinkName;

    homePage.goToCategoryPage();

    expect(browser).toHaveUrlContaining(catName);
  });

  it('Navigate to Product page', function () {
    const productId = categoryPage.productTileId;

    categoryPage.goToProductDetailsPage();

    expect(browser).toHaveUrlContaining(productId);
  });

  it('Add product to Cart', function () {
    productPage.addToCart();

    expect(productPage.miniCartQty).toEqual('1');
  });
};

export { addProductToCart };
