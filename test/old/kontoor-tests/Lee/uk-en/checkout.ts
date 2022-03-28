import {expect} from "chai";
import * as faker from "faker";
import {productDetailsPage, checkoutPage, shoppingCartPage} from "../../../pageObjectsKontoor/index";

const testData = require("../../testData");

describe("5 Guest Lee uk-en", function () {
    it("should be able to buy item", function () {
        let site = '/s/Lee/uk-en'
        browser.setWindowSize(1200, 1200)
        productDetailsPage.open(site + "/shop/inspiracje/daren-zip-fly-low-stretch-in-clean-black-L707HFAE.html");
        productDetailsPage.addToCartInStockVariant();
        productDetailsPage.goToShoppingCart();
        shoppingCartPage.clickCheckoutButton();
        // Filling checkout page
        checkoutPage.fillInShippingForm(testData.addresses.uk.valid);
        $("#email").waitForDisplayed({timeout: 7000});
        //let email = faker.internet.email();
        let email = "dmitriy.mazepa@capgemini.com"
        console.log("Email address used for place Order: " + email);
        $("#email").setValue(email);
        checkoutPage.fillInPaymentFormAndPlaceOrder(testData.creditCards.visa);
        // Verifying that we are on confirmation page
        $("h2.order-thank-you-msg").waitForDisplayed({timeout: 15000});
        const confirmationText = $("h2.order-thank-you-msg").getText();
        const orderNumber = $(".order-number").getText();
        expect(confirmationText).to.equal("THANK YOU FOR YOUR ORDER.");
        console.log("Order Number: " + orderNumber);
    });
});