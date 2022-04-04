import { verifyTwoStrsHaveSameWord } from '../utilities/helpers';

import { homePage } from '../pageObjects/home.page';
import { categoryPage } from '../pageObjects/category.page';
import { productPage } from '../pageObjects/product.page';
import { cartPage } from '../pageObjects/cart.page';

const addProductToCart = function () {
  it('Navigate to Category page', function () {
    homePage.openCategoryDropDown();

    const l2catLinkText = homePage.l2CatLinkText;

    homePage.goToCategoryPage();

    const catPageTitleText = categoryPage.catPageTitleText;

    const isCatPageRight = verifyTwoStrsHaveSameWord(l2catLinkText, catPageTitleText);
    expect(isCatPageRight).toEqual(true);
  });

  it('Navigate to Product page', function () {
    const productId = categoryPage.productTileId;

    categoryPage.goToProductDetailsPage();

    expect(browser).toHaveUrlContaining(productId);
  });

  it('Add product to Cart', function () {
    const initialMiniCartQty = +productPage.miniCartQty;

    productPage.addToCart();

    expect(productPage.miniCartQty).toEqual(`${initialMiniCartQty + 1}`);
  });

  it('Go to Cart page', function () {
    productPage.goToCartPage();

    expect(browser).toHaveUrlContaining('shopping-cart');
  });

  it('Increase product quantity', function () {
    const expectedQty = cartPage.increaseProductQty('2');

    expect(cartPage.firstLineItemQtyField).toHaveValue(expectedQty);
  });
};

export { addProductToCart };
