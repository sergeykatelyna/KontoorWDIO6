import { BasePage } from './base.page';

class HomePage extends BasePage {
  open(sitePartOfUrl: string): void {
    super.open(sitePartOfUrl + '/home');
  }
}

const homePage = new HomePage();

export { homePage };
