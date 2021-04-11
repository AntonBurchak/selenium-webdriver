const { By } = require('selenium-webdriver');

class CartPage {
    constructor(driver) {
        this.driver = driver;
    }

    static URL_MATCH = 'actions/Cart.action?viewCart=';

    async open() {
        await this.driver.get('https://petstore.octoperf.com/actions/Cart.action?viewCart=');
    }

    get getRemoveItemFromCartButton() {
        return this.driver.findElement(By.xpath("//a[@class='Button']"));
    }

    async removeParrotFromCart() {
        await this.open();
        await this.getRemoveItemFromCartButton.click();
    }
}

module.exports = { CartPage };