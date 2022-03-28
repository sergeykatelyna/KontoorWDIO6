import { expect } from 'chai';
import * as faker from 'faker';
import { productDetailsPage, checkoutPage, shoppingCartPage } from '../../../pageObjectsKontoor/index';

const testData = require('../../testData');

/*describe("11 Guest Wrangler us-en using PayPal", function () {
  it("should be able to buy item", function () {
    let site = '/s/Wrangler'
    browser.setWindowSize(1200, 1200)
    productDetailsPage.open(site + "/shop/womens-wrangler-retro-mae-jean-plus-09RMP.htm");
    productDetailsPage.addToCart("MS Wash", "20W", "32");
    checkoutPage.open(site);
    // Filling checkout page 
    checkoutPage.fillInShippingForm(testData.addresses.us.valid);       
    $("#email").waitForDisplayed({timeout: 7000});
    //let email = faker.internet.email();
    let email = "dmitriy.mazepa@capgemini.com"
    console.log("Email address used for place Order: " + email);
    $("#email").setValue(email);    
    checkoutPage.passAdyenPayPalAndPlaceOrder();   
    // Verifying that we are on confirmation page
    $("h2.order-thank-you-msg").waitForDisplayed({timeout:25000});
    const confirmationText = $("h2.order-thank-you-msg").getText();
    const orderNumber = $(".order-number").getText();
    expect(confirmationText).to.equal("THANK YOU FOR YOUR ORDER.");
    console.log("Order Number: " + orderNumber);
  });
});*/
describe('12 Guest Wrangler us-en using СС', function () {
  it('should be able to buy product with CC', function () {
    let site = '/s/Wrangler';
    browser.setWindowSize(1200, 1200);
    productDetailsPage.open(site + '/shop/womens-wrangler-retro-mae-jean-plus-09RMP.htm');
    productDetailsPage.addToCartInStockVariant();
    productDetailsPage.goToShoppingCart();
    shoppingCartPage.clickCheckoutButton();
    // Filling checkout page
    checkoutPage.fillInShippingForm(testData.addresses.us.valid);
    $('#email').waitForDisplayed({ timeout: 7000 });
    //let email = faker.internet.email();
    let email = 'dmitriy.mazepa@capgemini.com';
    console.log('Email address used for place Order: ' + email);
    $('#email').setValue(email);
    checkoutPage.fillInPaymentFormAndPlaceOrder(testData.creditCards.visa); // Verifying that we are on confirmation page
    $('h2.order-thank-you-msg').waitForDisplayed({ timeout: 25000 });
    const confirmationText = $('h2.order-thank-you-msg').getText();
    const orderNumber = $('.order-number').getText();
    expect(confirmationText).to.equal('THANK YOU FOR YOUR ORDER.');
    console.log('Order Number: ' + orderNumber);
  });
});
describe('Registered', function () {
  it('should be able to add CC', function () {});
  it('should be able to see new CC in Auto Ship', function () {});
});
