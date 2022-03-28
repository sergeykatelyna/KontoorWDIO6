export class BasePO {
  open(url: string) {
    console.log('Navigating to: ', browser.options.baseUrl + url);
    browser.url(browser.options.baseUrl + url);
    browser.pause(2000);
    browser.keys('Escape');
    if ($('#continueWithUS').isDisplayed()) {
      $('#continueWithUS').click();
    }
    browser.keys('Escape');
    if ($('button.truste-button1').isDisplayed()) {
      $('button.truste-button1').click();
    }
    browser.keys('Escape');
  }
}
