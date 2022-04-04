import { BasePage } from './base.page';

class AccountPage extends BasePage {
  public get welcomeMessage(): WebdriverIO.Element {
    return $('.account-welcome-firstname h1');
  }

  public logIntoAccount(accountCreds): void {
    this.waitAndType('#login-form-email', accountCreds.email);
    this.waitAndType('#login-form-password', accountCreds.password);

    this.waitAndClick('form[name="login-form"] button[type="submit"]');
    this.waitForSpinner();
  }

  public createAccount(): void {
    this.waitAndClick('a[href="#register"]');

    this.waitAndType('#registration-form-fname', 'FirstName');
    $('#registration-form-lname').setValue('FirstName');
    const randomEmail = `autotest${Math.floor(Math.random() * 1000000)}@gmail.com`;
    $('#registration-form-email').setValue(randomEmail);
    $('#registration-form-email-confirm').setValue(randomEmail);
    $('#registration-form-password').setValue('Password-1');
    $('#registration-form-password-confirm').setValue('Password-1');
    this.waitAndClick('button.create-account');

    // this.waitAndSelectByValue('#gender', 'Male');
    // $('#registration-form-birthmonth').selectByAttribute('value', 'Jan');
    // $('#registration-form-birthday').selectByAttribute('value', '1');
    // $('#birthYear').selectByAttribute('value', '2015');
    // this.waitAndClick('#birthday-save');

    this.waitAndClick('a.create-to-my-account');
  }
}

const accountPage = new AccountPage();

export { accountPage };
