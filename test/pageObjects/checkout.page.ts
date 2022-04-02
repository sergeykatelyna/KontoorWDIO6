import { Page } from './page';

class CheckoutPage extends Page {
  protected waitForPaymentSpinner(): void {
    if ($('.adyen-checkout__card-input.adyen-checkout__spinner__wrapper').isDisplayed()) {
      $('.adyen-checkout__card-input.adyen-checkout__spinner__wrapper').waitForDisplayed({ reverse: true });
    }
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

  protected submitBillingForm(): void {
    this.waitAndClick('[value="submit-payment"]');
    this.waitForSpinner();
  }

  public completeShippingStep(email: string, address: { [key: string]: any }): void {
    $('#email').setValue(email);
    $('#shippingFirstNamedefault').setValue('FirstName');
    $('#shippingLastNamedefault').setValue('LastName');
    $('#shippingAddressOnedefault').setValue(address.address1);
    const state = $('#shippingStatedefault.shippingState');
    if (state.getTagName() === 'select') {
      state.selectByAttribute('value', address.state);
    } else {
      state.setValue(address.state);
    }
    browser.keys('Tab');
    browser.pause(1000);
    this.waitForSpinner();
    $('#shippingAddressCitydefault').setValue(address.city);
    browser.keys('Tab');
    browser.pause(1000);
    this.waitForSpinner();
    $('#shippingZipCodedefault').setValue(address.zip);
    browser.keys('Tab');
    browser.pause(2000);
    this.waitForSpinner();
    $('#shippingPhoneNumberdefault').setValue(address.phone);
    this.waitForSpinner();

    this.waitAndClick('.submit-shipping');
    this.waitForSpinner();
  }

  public completeBillingStepWithCC(card: { [key: string]: any }): void {
    this.waitForPaymentSpinner();
    this.waitAndClick('#lb_scheme');

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
    this.waitAndClick('#lb_paypal');

    const payPalIframeIndex = this.findIframeIndex('.paypal-button[role="button"]');

    browser.switchToFrame(payPalIframeIndex);
    this.waitAndClick('.paypal-button[role="button"]');
    browser.switchToFrame(null);

    const allWindows = browser.getWindowHandles();
    const PPWindowIndex = allWindows.indexOf(parentWindow) === 0 ? 1 : 0;
    browser.switchToWindow(allWindows[PPWindowIndex]);
    this.waitAndClick('#backToInputEmailLink');
    $('#email').setValue(payPal.email);
    browser.keys('Enter');
    this.waitAndType('#password', payPal.password);
    browser.keys('Enter');
    this.waitAndClick('#payment-submit-btn');

    browser.switchToWindow(parentWindow);

    this.waitForPage('demandware');
  }

  public placeOrderWithPayPalExpress(payPal: { [key: string]: any }): void {
    this.waitAndType('#email', payPal.email);
    browser.keys('Enter');
    this.waitAndType('#password', payPal.password);
    browser.keys('Enter');
    this.waitAndClick('button[data-testid="change-shipping"]');
    $('#shippingDropdown').selectByVisibleText('FirstName LastName - 315 E Eisenhower Pkwy, Ann Arbor, MI 48108');
    $('#payment-submit-btn').click();

    this.waitForPage('demandware');

    if (browser.getUrl().includes('payment')) {
      $('[for="shippingAddressUseAsBillingAddress"]').click();
      $('[for="shippingAddressUseAsBillingAddress"]').click();
      this.submitBillingForm();
    }
  }

  public placeOrderWithKlarna(klarnaType: string, klarna: { [key: string]: any }) {
    let klarnaLocator: string;
    let submitBtnLocator: string;
    switch (klarnaType) {
      case 'payLater':
        klarnaLocator = '#lb_klarna';
        submitBtnLocator = '[id$="_kp-purchase-review-continue-button"]';
        break;
      case 'payNow':
        klarnaLocator = '#lb_klarna_paynow';
        submitBtnLocator = '#mandate-review__confirmation-button';
        break;
      default:
        klarnaLocator = '#lb_klarna_account';
        submitBtnLocator = '[id$="_kp-purchase-review-continue-button"]';
    }

    this.waitForPaymentSpinner();
    this.waitAndClick(klarnaLocator);
    this.submitBillingForm();

    if ($('#buy-button').isDisplayed()) {
      this.waitAndClick('#buy-button');
    }

    const klarnaIframeIndex = this.findIframeIndex('#main-remote-root');
    browser.switchToFrame(klarnaIframeIndex);
    this.waitAndDoubleClick('#email_or_phone');
    for (let i = 0; i < 15; i++) {
      browser.keys('Backspace');
    }
    $('#email_or_phone').setValue(klarna.phone);
    browser.keys('Enter');
    this.waitAndType('#otp_field', klarna.code);
    browser.keys('Enter');
    this.waitAndClick(submitBtnLocator);
    // this.waitAndClick('#onEmailContinue');
    // this.waitAndType('#addressCollector-date_of_birth', klarna.date);
    // browser.keys('Enter');
    // this.waitAndType('#iban', klarna.iban);
    // browser.keys('Enter');
    // this.waitAndClick('#aligned-content__button__0');
    browser.switchToFrame(null);

    this.waitForPage('demandware');
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
    this.waitAndClick('#lb_giropay');

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
