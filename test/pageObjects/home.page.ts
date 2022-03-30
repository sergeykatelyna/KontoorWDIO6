import { BasePage } from './base.page';

class HomePage extends BasePage {
  open(urlSitePath: string): void {
    super.open(urlSitePath + '/home');
  }
}

const homePage = new HomePage();

export { homePage };
