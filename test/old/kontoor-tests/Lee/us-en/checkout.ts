import {expect} from "chai";
import * as faker from "faker";
import {
    productDetailsPage,
    checkoutPage, shoppingCartPage,
} from "../../../pageObjectsKontoor/index";

const testData = require("../../testData");

describe("6 Guest Lee us-en", function () {
    it("should be able to buy item", function () {
        let site = "/s/Lee";
        browser.setWindowSize(1200, 1200);
        productDetailsPage.open(
            site +
            "/shop/men’s-extreme-motion-straight-fit-tapered-leg-jeans-in-fernando-2015045.html"
        );
        productDetailsPage.addToCartInStockVariant();
        productDetailsPage.goToShoppingCart();
        shoppingCartPage.clickCheckoutButton();
    });

    it("should be able to fill in Shipping form with valid data", function () {
        // Filling checkout page
        checkoutPage.fillInShippingForm(testData.addresses.us.valid);
        $("#email").waitForDisplayed({timeout: 7000});
        //let email = faker.internet.email();
        let email = "dmitriy.mazepa@capgemini.com"
        console.log("Email address used for place Order: " + email);
        $("#email").setValue(email);
    });

    it("shouldn't be given error message, when entered >22 character into CardHolder Name", function () {
        checkoutPage.enterCardHolderName(testData.creditCards.visa);
    });

    it("should be able to fill in Billing form with valid data", function () {
        checkoutPage.fillInPaymentFormAndPlaceOrder(testData.creditCards.visa);
        // Verifying that we are on confirmation page
        $("h2.order-thank-you-msg").waitForDisplayed({timeout: 20000});
        const confirmationText = $("h2.order-thank-you-msg").getText();
        const orderNumber = $(".order-number").getText();
        expect(confirmationText).to.equal("THANK YOU FOR YOUR ORDER.");
        console.log("Order Number: " + orderNumber);
    });
});
