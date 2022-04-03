import { BasePage } from './base.page';

class ProductPage extends BasePage {
  public get miniCartQty(): string {
    return $('a .minicart-quantity').getText();
  }

  // protected selectSizes(): void {
  //   const size1 = $$('.SIZE1 button');
  //   let size1Class;
  //   let i = -1;
  //   do {
  //     i++;
  //     size1Class = size1[i].getAttribute('class').trim();
  //   } while (size1Class === 'unselectable');
  //   if (size1Class !== 'selected') {
  //     size1[i].click();
  //   }
  //   this.waitForSpinner();

  //   const size2 = $$('.SIZE2 button');
  //   if (size2.length === 0) {
  //     return;
  //   }
  //   let size2Class;
  //   let j = -1;
  //   do {
  //     j++;
  //     size2Class = size2[j].getAttribute('class').trim();
  //   } while (size2Class === 'unselectable');
  //   if (size2Class !== 'selected') {
  //     size2[j].click();
  //   }
  //   this.waitForSpinner();
  // }

  protected selectSizes(): void {
    let swatchesNum: number;

    const colorSwatches = $$('span.swatch-circle');
    const selectableColorSwatches = colorSwatches.filter(colorSwatch => !colorSwatch.getAttribute('class').includes('unselectable'));
    swatchesNum = Math.floor(Math.random() * selectableColorSwatches.length);
    if (!selectableColorSwatches[swatchesNum].getAttribute('class').includes('selected')) {
      this.waitAndClick(selectableColorSwatches[swatchesNum]);
      this.waitForSpinner();
    }

    const sizeSwatches1 = $$('.SIZE1 button');
    const selectableSizeSwatches1 = sizeSwatches1.filter(sizeSwatch => !sizeSwatch.getAttribute('class').includes('unselectable'));
    swatchesNum = Math.floor(Math.random() * selectableSizeSwatches1.length);
    if (!selectableSizeSwatches1[swatchesNum].getAttribute('class').includes('selected')) {
      this.waitAndClick(selectableSizeSwatches1[swatchesNum]);
      this.waitForSpinner();
    }

    const sizeSwatches2 = $$('.SIZE2 button');
    if (sizeSwatches2.length === 0) {
      return;
    }
    const selectableSizeSwatches2 = sizeSwatches2.filter(sizeSwatch => !sizeSwatch.getAttribute('class').includes('unselectable'));
    swatchesNum = Math.floor(Math.random() * selectableSizeSwatches2.length);
    if (!selectableSizeSwatches2[swatchesNum].getAttribute('class').includes('selected')) {
      this.waitAndClick(selectableSizeSwatches2[swatchesNum]);
      this.waitForSpinner();
    }
  }

  protected clickAddToCartBtn(): void {
    this.waitAndClick('.add-to-cart');
  }

  public addToCart(): void {
    this.selectSizes();
    this.clickAddToCartBtn();

    this.waitAndClick('#add-to-cart-modal .close');
  }
}

const productPage = new ProductPage();

export { productPage };
