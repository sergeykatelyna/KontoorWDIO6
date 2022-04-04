import { homePage } from '../pageObjects/home.page';
import { accountPage } from '../pageObjects/accont.page';

const accessSiteAndRegister = function (sitePartOfUrl) {
  it('Access site', function () {
    homePage.open(sitePartOfUrl);

    expect(browser).toHaveUrlContaining('home');
  });

  it('Go to Login page', function () {
    homePage.goToLoginPage();

    expect(browser).toHaveUrlContaining('account/login');
  });

  it('Create account and login', function () {
    accountPage.createAccount();

    expect(browser).toHaveUrlContaining('account/show');
    const accountMenuHeaderText = accountPage.welcomeMessage.getText().toLowerCase();
    expect(accountMenuHeaderText).toContain('welcome');
  });
};

export { accessSiteAndRegister };
