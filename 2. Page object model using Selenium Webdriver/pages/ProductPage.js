const { By } = require('selenium-webdriver');
const Assert = require('../assert');

class ProductPage {
    constructor(driver) {
        this.driver = driver;
    }

    static URL_MATCH = '?viewProduct=&productId=AV-CB-01';

    async open() {
        await this.driver.get('https://petstore.octoperf.com/actions/Catalog.action?viewProduct=&productId=AV-CB-01');
    }

    get getAddProductToCartButton() {
        return this.driver.findElement(By.xpath("(//div[@id='Catalog']//a)[2]"));
    }

    

    async addParrotToCart() {
        await this.open();
        await this.getAddProductToCartButton.click();

        
        // Assert.isEqual()
    }
}

module.exports = { ProductPage };