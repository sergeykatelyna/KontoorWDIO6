import { homePage } from '../pageObjects/home.page';

const accessSiteAsGuest = function (sitePartOfUrl) {
  it('Access site and proceed as guest', function () {
    homePage.open(sitePartOfUrl);

    expect(browser).toHaveUrlContaining('home');
  });
};

export { accessSiteAsGuest };
