import { Page } from './page';

class CheckoutPage extends Page {
  protected waitForPaymentSpinner(): void {
    if ($('.adyen-checkout__spinner__wrapper').isDisplayed()) {
      $('.adyen-checkout__spinner__wrapper').waitForDisplayed({ reverse: true });
    }
  }

  protected submitBillingForm(): void {
    this.waitAndClick('[value="submit-payment"]');
    this.waitForSpinner();
  }

  public completeShippingStep(address: { [key: string]: any }, email?: string): void {
    if ($('.default-shipping-address-container').isExisting()) {
      this.waitAndClick('#btn-show-details-select');
      this.waitAndClick('.submit-shipping');
      this.waitForSpinner();
      return;
    }

    const emailField = $('#email');
    if (emailField.isDisplayed()) {
      emailField.setValue(email);
    }

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
    browser.pause(1500);
    this.waitForSpinner();
    $('#shippingPhoneNumberdefault').setValue(address.phone);
    this.waitForSpinner();

    this.waitAndClick('.submit-shipping');
    this.waitForSpinner();
  }

  public completeBillingStepWithCC(isCreditCardSaved: boolean, creditCardCreds?: { [key: string]: any }): void {
    const creditCardLocator = isCreditCardSaved ? '[for="selectStoredCards"]' : '#lb_scheme';

    this.waitForPaymentSpinner();
    this.waitAndClick(creditCardLocator);
    this.waitForPaymentSpinner();

    if (isCreditCardSaved) {
      this.switchToIframe('.saved-cards-container .paymentMethod:nth-of-type(1) iframe');
      const cvvField = $('#encryptedSecurityCode');
      this.wait(cvvField);
      const cvvValue = cvvField.getAttribute('placeholder').length === 3 ? '737' : '7373';
      cvvField.setValue(cvvValue);
      browser.switchToFrame(null);
    } else {
      this.switchToIframe('[data-cse="encryptedCardNumber"] iframe');
      this.waitAndType('#encryptedCardNumber', creditCardCreds.number);
      browser.switchToFrame(null);
      this.switchToIframe('[data-cse="encryptedExpiryDate"] iframe');
      $('#encryptedExpiryDate').setValue(creditCardCreds.date);
      browser.switchToFrame(null);
      this.switchToIframe('#component_scheme [data-cse="encryptedSecurityCode"] iframe');
      $('#encryptedSecurityCode').setValue(creditCardCreds.cvv);
      browser.switchToFrame(null);
      $('[class~="adyen-checkout__card__holderName__input"]').setValue(creditCardCreds.name);
    }

    this.submitBillingForm();
  }

  public completeReviewStep(): void {
    this.waitAndClick('[value="place-order"]');
    this.waitForSpinner();
  }

  public placeOrderWithPayPal(payPalCreds: { [key: string]: any }): void {
    const parentWindow = browser.getWindowHandle();

    this.waitForPaymentSpinner();
    this.waitAndClick('#lb_paypal');

    this.switchToIframe('iframe[title="PayPal"]');
    this.wait('.paypal-button[role="button"]');
    browser.pause(1000);
    $('.paypal-button[role="button"]').click();
    browser.switchToFrame(null);

    const allWindows = browser.getWindowHandles();
    const PPWindowIndex = allWindows.indexOf(parentWindow) === 0 ? 1 : 0;
    browser.switchToWindow(allWindows[PPWindowIndex]);
    this.waitAndClick('#backToInputEmailLink');
    $('#email').setValue(payPalCreds.email);
    browser.keys('Enter');
    this.waitAndType('#password', payPalCreds.password);
    browser.keys('Enter');
    this.waitAndClick('#payment-submit-btn');

    browser.switchToWindow(parentWindow);

    this.waitForPage('order-confirm');
  }

  public placeOrderWithPayPalExpress(payPalCreds: { [key: string]: any }): void {
    this.waitAndType('#email', payPalCreds.email);
    browser.keys('Enter');
    this.waitAndType('#password', payPalCreds.password);
    browser.keys('Enter');
    do {
      this.waitAndClick('button[data-testid="change-shipping"]');
      browser.pause(1000);
    } while ($('button[data-testid="change-shipping"]').isDisplayed());
    $('#shippingDropdown').selectByVisibleText('FirstName LastName - 315 E Eisenhower Pkwy, Ann Arbor, MI 48108');
    $('#payment-submit-btn').click();

    this.waitForPage('demandware');

    if (browser.getUrl().includes('payment')) {
      this.waitAndClick('[for="shippingAddressUseAsBillingAddress"]');
      this.submitBillingForm();
    }
  }

  public placeOrderWithKlarna(klarnaType: string, klarnaCreds: { [key: string]: any }) {
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

    if (klarnaType !== 'payIn4') {
      this.waitAndClick('#buy-button');
    }

    this.switchToIframe('#klarna-hpp-instance-fullscreen');
    const phoneField = $('#email_or_phone');
    this.wait(phoneField);
    do {
      this.waitAndDoubleClick(phoneField);
      for (let i = 0; i < 15; i++) {
        browser.keys('Backspace');
      }
    } while (phoneField.getValue() !== '');
    phoneField.setValue(klarnaCreds.phone);
    browser.keys('Enter');
    this.waitAndType('#otp_field', klarnaCreds.code);
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
    this.waitAndClick(paymentLocator);

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
