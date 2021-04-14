const { By } = require('selenium-webdriver');
const Assert = require('../assert');
const { BirdsPage } = require('./BirdsPage');

class CartPage {
    constructor(driver) {
        this.driver = driver;
    }

    static URL_MATCH = 'actions/Cart.action';

    async open() {
        await this.driver.get('https://petstore.octoperf.com/actions/Cart.action?viewCart=');
    }

    get getRemoveItemFromCartButton() {
        return this.driver.findElement(By.xpath("(//div[@id='Cart']//a)[2]"));
    }

    get getProductId() {
        return this.driver.findElement(By.xpath("(//div[@id='Cart']//td)[2]"));
    }

    async removeParrotFromCart() {
        console.log(BirdsPage);

        const Birdspage = new BirdsPage(this.driver);

        await Birdspage.addParrotToCart();

        await this.open();

        const productId = await this.getProductId;
        const productIdIsDisplayed = await productId.isDisplayed();

        const actualProductId = await productId.getText();
        const exptectedProductId = 'AV-CB-01';

        Assert.isEqual(productIdIsDisplayed, true,
            'Product ID is not displayed before removing, failed',
            'Product ID is displayed before removing, success',);

        Assert.isEqual(actualProductId, exptectedProductId,
            'Product ID is not correct, failed',
            'Product ID is displayed and correct, success',
            );

        await this.getRemoveItemFromCartButton.click();

        const productIfAfterRemoving = 
            await this.getProductId.isDisplayed() && await this.getProductId.getText() === 'AV-CB-01';

        Assert.isEqual(productIfAfterRemoving, false,
            'Product ID is displayed after removing, failed',
            'Product ID isn\'t displayed after removing, success');
    }
}

module.exports = { CartPage };