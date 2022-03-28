import {expect} from "chai";
import * as faker from "faker";
import {productDetailsPage, checkoutPage, shoppingCartPage} from "../../../pageObjectsKontoor/index";

const testData = require("../../testData");

describe("4 Guest Lee pl-pl PayPal", function () {
    it("should be able to buy item", function () {
        let site = '/s/Lee/pl-pl'
        browser.setWindowSize(1200, 1200)
        productDetailsPage.open(site + "/shop/inspiracje/daren-zip-fly-low-stretch-in-clean-black-L707HFAE.html");
        productDetailsPage.addToCartInStockVariant();
        productDetailsPage.goToShoppingCart();
        shoppingCartPage.clickCheckoutButton();
        // Filling checkout page
        checkoutPage.fillInShippingForm(testData.addresses.pl.valid);
        $("#email").waitForDisplayed({timeout: 7000});
        //let email = faker.internet.email();
        let email = "dmitriy.mazepa@capgemini.com"
        console.log("Email address used for place Order: " + email);
        $("#email").setValue(email);
        checkoutPage.passAdyenPayPalAndPlaceOrder();
        browser.pause(1000);
        // Verifying that we are on confirmation page
        $("h2.order-thank-you-msg").waitForDisplayed({timeout: 25000});
        const confirmationText = $("h2.order-thank-you-msg").getText();
        const orderNumber = $(".order-number").getText();
        expect(confirmationText).to.equal("DZIĘKUJĘ ZA TWOJE ZAMÓWIENIE.");
        console.log("Order Number: " + orderNumber);
    });
});