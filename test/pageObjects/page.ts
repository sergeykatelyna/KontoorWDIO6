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
      $('.veil').waitForDisplayed({ reverse: true, timeout: 40000 });
    }
  }

  protected wait(elementOrLocator: string | WebdriverIO.Element): void {
    const element = typeof elementOrLocator === 'string' ? $(elementOrLocator) : elementOrLocator;

    element.waitForDisplayed();
    element.waitForEnabled();
    element.waitForClickable();
  }

  protected waitAndClick(buttonOrLocator: string | WebdriverIO.Element): void {
    const button = typeof buttonOrLocator === 'string' ? $(buttonOrLocator) : buttonOrLocator;

    button.waitForDisplayed();
    button.waitForEnabled();
    button.waitForClickable();
    button.click();
  }

  protected waitAndDoubleClick(buttonOrLocator: string | WebdriverIO.Element): void {
    const button = typeof buttonOrLocator === 'string' ? $(buttonOrLocator) : buttonOrLocator;

    button.waitForDisplayed();
    button.waitForEnabled();
    button.waitForClickable();
    button.doubleClick();
  }

  protected waitAndType(fieldOrLocator: string | WebdriverIO.Element, entry: string): void {
    const field = typeof fieldOrLocator === 'string' ? $(fieldOrLocator) : fieldOrLocator;

    field.waitForDisplayed();
    field.waitForEnabled();
    field.waitForClickable();
    field.setValue(entry);
  }

  protected waitAndSelectByValue(fieldOrLocator: string | WebdriverIO.Element, value: string): void {
    const field = typeof fieldOrLocator === 'string' ? $(fieldOrLocator) : fieldOrLocator;

    field.waitForDisplayed();
    field.waitForEnabled();
    field.waitForClickable();
    field.selectByAttribute('value', value);
  }

  protected scrollAndWait(elementOrLocator: string | WebdriverIO.Element): void {
    const element = typeof elementOrLocator === 'string' ? $(elementOrLocator) : elementOrLocator;

    element.scrollIntoView();
    element.waitForDisplayed();
    element.waitForEnabled();
    element.waitForClickable();
  }

  protected waitForPage(ulrPart: string): void {
    browser.waitUntil(() => browser.getUrl().toLowerCase().includes(ulrPart), { timeout: 60000 });
  }

  // protected findIframeIndex(iframeLocator: string, locatorOfElInIframe: string): number {
  //   $(iframeLocator).waitForDisplayed();

  //   let iframeIndex = -1;
  //   do {
  //     browser.switchToFrame(null);
  //     browser.switchToFrame(++iframeIndex);
  //   } while ($$(locatorOfElInIframe).length === 0);
  //   browser.switchToFrame(null);

  //   return iframeIndex;
  // }

  protected switchToIframe(iframeLocator: string): void {
    const iframe = $(iframeLocator);

    iframe.waitForDisplayed();

    browser.switchToFrame(iframe);
  }
}

export { Page };
