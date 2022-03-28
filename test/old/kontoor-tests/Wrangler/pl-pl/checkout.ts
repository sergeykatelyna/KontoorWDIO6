import {expect} from "chai";
import * as faker from "faker";
import {productDetailsPage, checkoutPage, shoppingCartPage} from "../../../pageObjectsKontoor/index";

const testData = require("../../testData");

describe("9 Guest Wrangler pl-pl Dot Pay", function () {
    it("should be able to buy item", function () {
        let site = '/s/Wrangler/pl-pl'
        browser.setWindowSize(1400, 1200)
        productDetailsPage.open(site + "/shop/mezczyzni/dzinsy-i-odziez/dzinsy/texas-low-stretch-in-black-overdye-W12109004.html");
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
        checkoutPage.passDotPayAndPlaceOrder();
        // Verifying that we are on confirmation page
        $("h2.order-thank-you-msg").waitForDisplayed({timeout: 15000});
        const confirmationText = $("h2.order-thank-you-msg").getText();
        const orderNumber = $(".order-number").getText();
        expect(confirmationText).to.equal("DZIĘKUJĘ ZA TWOJE ZAMÓWIENIE.");
        console.log("Order Number: " + orderNumber);
    });
});