import { homePage } from '../pageObjects/home.page';
import { categoryPage } from '../pageObjects/category.page';
import { productPage } from '../pageObjects/product.page';
import { cartPage } from '../pageObjects/cart.page';

const addProductToCart = function (sitePartOfUrl) {
  it('Access site', function () {
    homePage.open(sitePartOfUrl);

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

  it('Go to Cart page', function () {
    homePage.goToCartPage();

    expect(browser).toHaveUrlContaining('shopping-cart');
  });

  it('Increase product quantity', function () {
    cartPage.increaseProductQty('2');

    expect(cartPage.firstLineItemQtyField).toHaveValue('2');
  });
};

export { addProductToCart };
