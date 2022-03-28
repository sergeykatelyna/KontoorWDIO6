import {expect} from "chai";
import * as faker from "faker";
import {productDetailsPage, checkoutPage, shoppingCartPage} from "../../../pageObjectsKontoor/index";

const testData = require("../../testData");

describe("3 Guest Lee nl-nl iDEAL", function () {
    it("should be able to buy item", function () {
        let site = '/s/Lee/nl-nl'
        browser.setWindowSize(1200, 1200)
        productDetailsPage.open(site + "/shop/inspiracje/daren-zip-fly-low-stretch-in-clean-black-L707HFAE.html");
        productDetailsPage.addToCartInStockVariant();
        productDetailsPage.goToShoppingCart();
        shoppingCartPage.clickCheckoutButton();
        // Filling checkout page
        checkoutPage.fillInShippingForm(testData.addresses.nl.valid);
        $("#email").waitForDisplayed({timeout: 7000});
        //let email = faker.internet.email();
        let email = "dmitriy.mazepa@capgemini.com"
        console.log("Email address used for place Order: " + email);
        $("#email").setValue(email);
        checkoutPage.passiDEALAndPlaceOrder();
        // Verifying that we are on confirmation page
        $("h2.order-thank-you-msg").waitForDisplayed({timeout: 15000});
        const confirmationText = $("h2.order-thank-you-msg").getText();
        const orderNumber = $(".order-number").getText();
        expect(confirmationText).to.equal("BEDANKT VOOR JE BESTELLING.");
        console.log("Order Number: " + orderNumber);
    });
});