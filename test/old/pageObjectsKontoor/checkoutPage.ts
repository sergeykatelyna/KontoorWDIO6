import { BasePO } from './base';
import { expect, assert } from 'chai';

export class CheckoutPagePO extends BasePO {
  // protected containerLocator : string;
  // protected get container(){
  //   return $(this.containerLocator);
  // }
  // protected ccName: Input = new createInputFiles(() => {
  //   return this.container.$('[class^="adyen-checkout__input adyen-checkout__input--text"]');
  // });

  fillInPaymentFormAndPlaceOrder(card: object) {
    browser.pause(2000);
    let ccNumerField = "[class^='adyen-checkout__input adyen-checkout__input--text']";
    if ($$(ccNumerField).length > 0 && $(ccNumerField).isDisplayed()) {
      $(ccNumerField).setValue('');
      for (let i = 0; i < 27; i++) {
        browser.keys('Backspace');
        ``;
      }
      $(ccNumerField).setValue(card['name']);
      this.fillCCNumberDateCVVPlaceOrder(card);
    }
  }

  fillCCNumberDateCVVPlaceOrder(card: object) {
    let frameNumber = 0;
    let source;
    do {
      browser.switchToFrame(null);
      frameNumber = frameNumber + 1;
      browser.switchToFrame(frameNumber);
      source = browser.getPageSource();
      console.log(source.indexOf('encryptedCardNumber'));
    } while (source.indexOf('encryptedCardNumber') < 0);
    //console.log(browser.getPageSource());
    $('#encryptedCardNumber').setValue(card['number']);
    browser.switchToFrame(null);
    browser.switchToFrame(frameNumber + 1);
    $('#encryptedExpiryDate').setValue(card['date']);
    browser.switchToFrame(null);
    browser.switchToFrame(frameNumber + 2);
    $('#encryptedSecurityCode').setValue(card['cvv']);
    browser.switchToFrame(null);
    $('[value=submit-payment]').scrollIntoView();
    $('[value=submit-payment]').click();
  }

  fillCCNumberDateCVVPlaceOrderDE(card: object) {
    if ($('#rb_scheme').isDisplayed()) {
      $('#rb_scheme').click();
    }
    let ccNumerField = "[class^='adyen-checkout__input adyen-checkout__input--text']";
    $(ccNumerField).setValue(card['name']);
    browser.pause(2000);
    browser.switchToFrame(3);
    /*let html3 = browser.getPageSource();
        console.log(html3);*/
    browser.pause(1000);
    $('#encryptedCardNumber').setValue(card['number']);
    browser.switchToFrame(null);
    browser.switchToFrame(4);
    $('#encryptedExpiryDate').setValue(card['date']);
    browser.switchToFrame(null);
    browser.switchToFrame(5);
    $('#encryptedSecurityCode').setValue(card['cvv']);
    browser.switchToFrame(null);
    $('[value=submit-payment]').scrollIntoView();
    $('[value=submit-payment]').click();
  }

  waitAndClick(locator: string, time?: number) {
    $(locator).waitForDisplayed({ timeout: time });
    $(locator).waitForEnabled({ timeout: time });
    $(locator).waitForClickable({ timeout: time });
    $(locator).click();
  }

  passPayPalAndPlaceOrder() {
    let buttonPayPal = 'div.paypal-button-label-container';
    let buttonPlaceOrder = '.place-order';
    browser.pause(1000);
    //$(".paypal-tab").click();
    browser.pause(3000);
    browser.switchToFrame(4);
    browser.pause(2000);
    this.waitAndClick(buttonPayPal);
    browser.switchToFrame(null);
    browser.pause(5000);
    //browser.waitUntil(function(){
    //  return (browser.getWindowHandles() as any).length > 1;
    //});
    let windows = browser.getWindowHandles();
    browser.switchToWindow(windows[1]);
    browser.pause(2000);
    if ($$('//button[contains(text(), "Log In")]').length > 0) {
      $('//button[contains(text(), "Log In")]').click();
    }
    $('#injectedUnifiedLogin').waitForDisplayed;
    // browser.pause(1000);
    //browser.switchToFrame(0);
    this.passPayPalPortal();
    //windows = browser.getWindowHandles();
    windows = browser.getWindowHandles();
    browser.switchToWindow(windows[0]);
    browser.pause(5000);
    this.waitAndClick(buttonPlaceOrder, 10000);
  }

  passPayPalPortal() {
    $('#email').waitForDisplayed({ timeout: 10000 });
    browser.pause(2000);
    $('#email').setValue('asqagroup@lyonscg.com');
    $('#password').setValue('drowssapA1');
    $('#btnLogin').click();
    //browser.switchToFrame(null);
    $('#cart').waitForDisplayed({ timeout: 15000 });
    $('.loader').waitForDisplayed({ reverse: true, timeout: 7000 });
    browser.pause(1000);
    if ($('//button[contains(text(), "Continue")]').isExisting()) {
      $('//button[contains(text(), "Continue")]').waitForDisplayed({ timeout: 15000 });
      $('//button[contains(text(), "Continue")]').scrollIntoView();
      browser.pause(6000);
      $('//button[contains(text(), "Continue")]').scrollIntoView();
      $('//button[contains(text(), "Continue")]').click();
    } else {
      $('#payment-submit-btn').waitForDisplayed({ timeout: 10000 });
      $("[data-testid='paywith-title']").waitForDisplayed({ timeout: 10000 });
      if ($$('#acceptAllButton').length > 0) {
        $('#acceptAllButton').click();
      }
      $('#payment-submit-btn').scrollIntoView();
      $('#payment-submit-btn').click();
      browser.pause(1000);
    }
  }

  passAdyenPayPalAndPlaceOrder() {
    this.waitAndClick('.adyen-tab');
    browser.pause(1000);
    this.waitAndClick('[value=paypal]');
    // NEW ADYEN CARTRITGE
    if ($$('[data-method-id=AdyenComponent]').length > 0) {
      browser.pause(3000);
      browser.switchToFrame(4);
      browser.pause(1000);
      $('div.paypal-button').click();
      browser.switchToFrame(null);
      browser.pause(2000);
      //browser.waitUntil(function(){
      //  return (browser.getWindowHandles() as any).length > 1;
      //});
      let windows = browser.getWindowHandles();
      browser.switchToWindow(windows[1]);
      this.passPayPalPortal();
      windows = browser.getWindowHandles();
      browser.switchToWindow(windows[0]);
      browser.pause(5000);
    } else {
      //OLD Adyen Cartridge
      $('[value=submit-payment]').click();
      browser.pause(1000);
      this.passPayPalPortal();
    }
  }

  passDotPayAndPlaceOrder() {
    $('.adyen-tab').click();
    browser.pause(1000);
    $('[value=dotpay]').waitForDisplayed({ timeout: 10000 });
    $('[value=dotpay]').click();
    browser.pause(2000);
    if ($$('button.adyen-checkout__dropdown__button').length > 0) {
      $('button.adyen-checkout__dropdown__button').click();
      $('li.adyen-checkout__dropdown__element:first-child').waitForDisplayed();
      $('li.adyen-checkout__dropdown__element:first-child').click();
    }
    $('[value=submit-payment]').waitForDisplayed();
    $('[value=submit-payment]').click();
    $('#submit_success').waitForDisplayed({ timeout: 15000 });
    $('#submit_success').click();
  }

  passiDEALAndPlaceOrder() {
    $('.adyen-tab').click();
    $('[value=ideal]').waitForDisplayed({ timeout: 10000 });
    browser.pause(1000);
    $('[value=ideal]').click();
    $('.adyen-checkout__dropdown__button').waitForDisplayed();
    $('.adyen-checkout__dropdown__button').click();
    $("[data-value='1121']").waitForDisplayed();
    $("[data-value='1121']").click();
    browser.pause(1000);
    $('[value=submit-payment]').click();
    $("[name='button.edit']").waitForDisplayed();
    $("[name='button.edit']").click();
  }

  passKlarnaPayLaterAndPlaceOrder() {
    $('.adyen-tab').click();
    this.waitAndClick('[value=klarna]');
    this.waitAndClick('[value=submit-payment]');
    this.waitAndClick('.adyen-checkout__dropdown__button__text');
    this.waitAndClick("[data-value='1121']");
    this.waitAndClick("[name='button.edit']");
  }

  passGiroPayAndPlaceOrder() {
    $('.adyen-tab').click();
    browser.pause(1000);
    $('[value=giropay]').waitForDisplayed({ timeout: 10000 });
    $('[value=giropay]').click();
    $('[value=submit-payment]').click();
    $('[name=continueBtn]').waitForDisplayed();
    $('#tags').setValue('Abtsgmünder Bank -Raiffeisen- eG 60069673 GENODES1ABR');
    browser.pause(1000);
    browser.keys('ArrowDown');
    browser.keys('Enter');
    browser.pause(1000);
    $('[name=continueBtn]').click();
    $('#layerBic #yes').waitForDisplayed();
    $('#layerBic #yes').click();
  }

  open(site: string) {
    super.open(site + '/checkout/info?stage=shipping#shipping');
  }

  fillInShippingForm(address: object) {
    $('#shippingFirstNamedefault').waitForDisplayed();
    $('#shippingFirstNamedefault').setValue('TestFirstName');
    $('#shippingLastNamedefault').setValue('TestLastName');
    $('#shippingAddressOnedefault').setValue(address['address1']);
    $('#shippingZipCodedefault').setValue(address['zip']);
    let stateLocator = $('#shippingStatedefault');
    browser.pause(1000);
    if ($('#loqate-find-close span').isDisplayed()) {
      $('#loqate-find-close span').click();
    }
    browser.pause(1000);
    if (stateLocator.getTagName() == 'select') {
      $('#shippingStatedefault').selectByAttribute('value', address['state']);
    } else {
      $('#shippingStatedefault').setValue(address['state']);
    }
    browser.pause(2000);
    $('#shippingAddressCitydefault').setValue(address['city']);
    browser.keys('Tab');
    browser.pause(2000);
    $('#shippingPhoneNumberdefault').setValue(address['phone']);
    $('.submit-shipping').scrollIntoView();
    browser.pause(2000);
    $('.submit-shipping').click();
  }

  enterCardHolderName(card: object) {
    browser.refresh();
    let email = 'dmitriy.mazepa@capgemini.com';
    $('#email').setValue(email);
    $("[class^='adyen-checkout__input adyen-checkout__input--text']").setValue('Name more than 22 characters');
    this.fillCCNumberDateCVVPlaceOrder(card);
    browser.pause(2000);
    assert.isFalse($('.error-message-text').isDisplayed(), 'More than 22 characters not accepted for Card Holder name');
  }
}

export const checkoutPage = new CheckoutPagePO();
