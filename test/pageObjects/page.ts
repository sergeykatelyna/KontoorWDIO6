abstract class Page {
  public open(url: string): void {
    // browser.maximizeWindow();
    browser.url(url);

    if ($('div[id^="dy-overlay"]').isDisplayed()) {
      this.waitAndClick('[id^="dy-overlay"] .overlay-submission a.link__close');
    }

    if ($('#consent_blackbar').isDisplayed()) {
      this.waitAndClick('#consent_blackbar #truste-consent-button');
    }
  }

  protected waitForSpinner(): void {
    if ($('.veil').isDisplayed()) {
      $('.veil').waitForDisplayed({ reverse: true, timeout: 30000 });
    }
  }

  protected waitAndClick(buttonLocator: string): void {
    const button = $(buttonLocator);

    button.waitForDisplayed();
    button.waitForEnabled();
    button.waitForClickable();
    button.click();
  }

  protected waitAndDoubleClick(buttonLocator: string): void {
    const button = $(buttonLocator);

    button.waitForDisplayed();
    button.waitForEnabled();
    button.waitForClickable();
    button.click();
  }

  protected waitAndType(fieldLocator: string, entry: string): void {
    const button = $(fieldLocator);

    button.waitForDisplayed();
    button.waitForEnabled();
    button.setValue(entry);
  }

  protected waitForPage(ulrPart: string): void {
    browser.waitUntil(() => browser.getUrl().toLowerCase().includes(ulrPart));
  }
}

export { Page };
