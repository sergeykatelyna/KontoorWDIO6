import { BasePage } from './base.page';

class CartPage extends BasePage {
  private _firstLineItemQtyField: WebdriverIO.Element;

  public get firstLineItemQtyField(): WebdriverIO.Element {
    if (this._firstLineItemQtyField) {
      return this._firstLineItemQtyField;
    }

    this._firstLineItemQtyField = $$('#qtyselectid1').find(lineItemQtyField => lineItemQtyField.isDisplayed());
    return this._firstLineItemQtyField;
  }

  public clickCheckoutBtn(): void {
    this.waitAndClick('.checkout-btn');
  }

  public clickPayPalExpressBtn(): void {
    this.waitAndClick('#paypal-image-button');
  }

  public increaseProductQty(qty: string) {
    this.wait(this.firstLineItemQtyField);

    const plusBtn = this.firstLineItemQtyField.$('..').$('.input-group-append button');
    const isPlusBtnDisabled = plusBtn.getAttribute('class').includes('disabled');
    if (isPlusBtnDisabled) {
      return this.firstLineItemQtyField.getValue();
    }

    this.firstLineItemQtyField.setValue('');
    browser.keys('Backspace');
    browser.keys(qty);
    browser.keys('Tab');
    this.waitForSpinner();
    return qty;
  }
}

const cartPage = new CartPage();

export { cartPage };
