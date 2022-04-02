import { BasePage } from './base.page';

class ConfirmationPage extends BasePage {
  public get confirmStepMessage(): WebdriverIO.Element {
    return $('.order-thank-you-msg');
  }
}

const confirmationPage = new ConfirmationPage();

export { confirmationPage };
