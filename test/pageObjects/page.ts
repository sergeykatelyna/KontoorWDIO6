abstract class Page {
  public open(url: string): void {
    // browser.maximizeWindow();

    browser.url(url);

    if ($('div[id^="dy-overlay"]').isDisplayed()) {
      $('div[id^="dy-overlay"] a.link__close').click();
    }
  }
}

export { Page };
