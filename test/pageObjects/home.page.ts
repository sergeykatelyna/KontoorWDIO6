import { BasePage } from './base.page';

class HomePage extends BasePage {
  open(domain: string) {
    super.open(domain + '/home');
  }
}

const homePage = new HomePage();

export { homePage };
