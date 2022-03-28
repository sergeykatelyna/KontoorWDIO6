import { homePage } from '../pageObjects/home.page';

const goToCartPage = function () {
  it('Go to Cart page', function () {
    homePage.goToCartPage();

    expect(browser).toHaveUrlContaining('shopping-cart');
  });
};

export { goToCartPage };
