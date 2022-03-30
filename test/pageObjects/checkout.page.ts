class CheckoutPage {
  public get confirmStepMessage(): WebdriverIO.Element {
    return $('.order-thank-you-msg');
  }

  protected waitForSpinner(): void {
    if ($('.veil').isDisplayed()) {
      $('.veil').waitForDisplayed({ reverse: true });
    }
  }

  protected waitForPaymentSpinner(): void {
    if ($('.adyen-checkout__card-input.adyen-checkout__spinner__wrapper').isDisplayed()) {
      $('.adyen-checkout__card-input.adyen-checkout__spinner__wrapper').waitForDisplayed({ reverse: true });
    }
  }

  protected waitForPage(ulrPart: string): void {
    browser.waitUntil(() => browser.getUrl().toLowerCase().includes(ulrPart));
  }

  protected findIframeIndex(elInIframeLocator: string): number {
    let iframeIndex = -1;

    do {
      browser.switchToFrame(null);
      browser.switchToFrame(++iframeIndex);
    } while ($$(elInIframeLocator).length === 0);

    browser.switchToFrame(null);

    return iframeIndex;
  }

  protected waitAndClick(buttonLocator: string): void {
    const button = $(buttonLocator);

    button.waitForDisplayed();
    button.waitForEnabled();
    button.waitForClickable();
    button.click();
  }

  protected submitBillingForm() {
    this.waitAndClick('[value="submit-payment"]');

    this.waitForSpinner();
  }

  public completeShippingStep(address: { [key: string]: any }): void {
    $('#email').setValue('roman.holubkov@capgemini.com');
    $('#shippingFirstNamedefault').setValue('FirstName');
    $('#shippingLastNamedefault').setValue('LastName');
    $('#shippingAddressOnedefault').setValue(address.address1);
    const state = $('#shippingStatedefault.shippingState');
    if (state.getTagName() === 'select') {
      state.selectByAttribute('value', address.state);
    } else {
      state.setValue(address.state);
    }
    $('#shippingAddressCitydefault').setValue(address.city);
    $('#shippingZipCodedefault').setValue(address.zip);
    browser.pause(1000);
    $('#shippingPhoneNumberdefault').setValue(address.phone);

    this.waitForSpinner();

    this.waitAndClick('.submit-shipping');

    this.waitForSpinner();
  }

  public completeBillingStepWithCC(card: { [key: string]: any }): void {
    this.waitForPaymentSpinner();
    $('#lb_scheme').click();

    let CCIframeIndex = this.findIframeIndex('#encryptedCardNumber');

    browser.switchToFrame(CCIframeIndex);
    $('#encryptedCardNumber').setValue(card.number);
    browser.switchToFrame(null);

    browser.switchToFrame(++CCIframeIndex);
    $('#encryptedExpiryDate').setValue(card.date);
    browser.switchToFrame(null);

    browser.switchToFrame(++CCIframeIndex);
    $('#encryptedSecurityCode').setValue(card.cvv);
    browser.switchToFrame(null);

    $('[class~="adyen-checkout__card__holderName__input"]').setValue(card.name);

    this.submitBillingForm();
  }

  public completeReviewStep(): void {
    this.waitAndClick('[value="place-order"]');

    this.waitForSpinner();
  }

  public placeOrderWithPayPal(payPal: { [key: string]: any }): void {
    const parentWindow = browser.getWindowHandle();

    this.waitForPaymentSpinner();
    $('#lb_paypal').click();

    const payPalIframeIndex = this.findIframeIndex('.paypal-button[role="button"]');

    browser.switchToFrame(payPalIframeIndex);
    this.waitAndClick('.paypal-button[role="button"]');
    browser.switchToFrame(null);

    const allWindows = browser.getWindowHandles();
    const PPWindowIndex = allWindows.indexOf(parentWindow) === 0 ? 1 : 0;
    browser.switchToWindow(allWindows[PPWindowIndex]);
    $('#btnLogin').waitForDisplayed();
    $('#backToInputEmailLink').click();
    $('#email').setValue(payPal.email);
    browser.keys('Enter');
    $('#password').setValue(payPal.password);
    browser.keys('Enter');
    this.waitAndClick('#payment-submit-btn');

    browser.switchToWindow(parentWindow);

    this.waitForPage('order-confirm');
  }

  public placeOrderWithPayPalExpress(payPal: { [key: string]: any }): void {
    this.waitAndClick('#paypal-image-button');

    $('#email').waitForDisplayed();
    $('#email').setValue(payPal.email);
    browser.keys('Enter');
    $('#password').setValue(payPal.password);
    browser.keys('Enter');
    this.waitAndClick('button[data-testid="change-shipping"]');
    $('#shippingDropdown').selectByVisibleText('FirstName LastName - 315 E Eisenhower Pkwy, Ann Arbor, MI 48108');
    $('#payment-submit-btn').click();

    this.waitForPage('payment');

    $('[for="shippingAddressUseAsBillingAddress"]').click();
    $('[for="shippingAddressUseAsBillingAddress"]').click();

    this.submitBillingForm();
  }

  public placeOrderWithKlarna(klarna: { [key: string]: any }): void {
    this.waitForPaymentSpinner();
    $('#lb_klarna_account').click();

    this.submitBillingForm();

    const klarnaIframeIndex = this.findIframeIndex('#main-remote-root');
    browser.switchToFrame(klarnaIframeIndex);
    const phoneField = $('#email_or_phone');
    phoneField.waitForDisplayed();
    phoneField.waitForEnabled();
    phoneField.setValue('');
    for (let i = 0; i < 15; i++) {
      browser.keys('Backspace');
    }
    phoneField.setValue(klarna.phone);
    browser.keys('Enter');
    const codeField = $('#otp_field');
    codeField.waitForDisplayed();
    codeField.setValue(klarna.phone);
    browser.keys('Enter');
    this.waitAndClick('#payinparts_kp-purchase-review-continue-button');
    browser.switchToFrame(null);

    this.waitForPage('order-confirm');
  }

  public placeOrderWithLocalPayment(paymentType: string): void {
    let paymentLocator: string;
    let submitBtnLocator: string;

    switch (paymentType) {
      case 'ideal':
        paymentLocator = '#lb_ideal';
        submitBtnLocator = '[type="submit"]';
        break;
      case 'dotpay':
        paymentLocator = '#lb_dotpay';
        submitBtnLocator = '[value="accept"]';
        break;
      default:
        paymentLocator = `#lb_${paymentType}`;
        submitBtnLocator = '[type="submit"]';
    }

    this.waitForPaymentSpinner();
    $(paymentLocator).click();

    $('.adyen-checkout__dropdown__button').click();
    $('.adyen-checkout__dropdown__list li:nth-child(2)').click();

    this.submitBillingForm();

    this.waitAndClick(submitBtnLocator);
  }

  public placeOrderWithGiropay() {
    this.waitForPaymentSpinner();
    $('#lb_giropay').click();

    this.submitBillingForm();

    $('#tags').setValue('Testbank Fiducia 44448888 GENODETT488');
    $('ul.ui-autocomplete').waitForDisplayed();
    browser.keys('ArrowDown');
    browser.keys('Enter');
    $('[name="continueBtn"]').click();
    $('#layerBic #yes').click();

    $('[name="sc"]').setValue('1111');
    $('[name="extensionSc"]').setValue('1111');
    $('[name="customerName1"]').setValue('1111');
    $('[name="customerIBAN"]').setValue('1111');
    $('[value="Absenden"]').click();
  }
}

const checkoutPage = new CheckoutPage();

export { checkoutPage };
