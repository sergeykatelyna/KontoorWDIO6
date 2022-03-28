abstract class Page {
  open(pageUrl: string) {
    // browser.maximizeWindow();

    browser.url(pageUrl);

    if ($('div[id^="dy-overlay"]').isDisplayed()) {
      $('div[id^="dy-overlay"] a.link__close').click();
    }
  }
}

export { Page };
