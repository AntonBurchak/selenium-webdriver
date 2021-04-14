const { By } = require('selenium-webdriver');
const Assert = require('../assert');
const { ProductPage } = require('./ProductPage');

class BirdsPage {
    constructor(driver) {
        this.driver = driver;
    }

    static URL_MATCH = '?viewCategory=&categoryId=BIRDS';

    async open() {
        await this.driver.get('https://petstore.octoperf.com/actions/Catalog.action?viewCategory=&categoryId=BIRDS');
    }

    get goRegisterButton() {
        return this.driver.findElement(By.xpath("//a[@href='/actions/Account.action?newAccountForm=']"));
    }

    get getParrotItem() {
        return this.driver.findElement(By.xpath("//div[@id='Catalog']//a"));
    }

    get getProductId() {
        return this.driver.findElement(By.xpath("//td[text()='AV-CB-01']"));
    }
    
    async addParrotToCart() {
        await this.open();
        await this.getParrotItem.click();

        const currentUrl = await this.driver.getCurrentUrl();
        const expectedProductId = 'AV-CB-01';

        if (currentUrl.includes(ProductPage.URL_MATCH)) {
            const Productpage = new ProductPage(this.driver);

            await Productpage.addParrotToCart();
        }

        const actualProductId = await this.getProductId.getText();

        Assert.isEqual(actualProductId, expectedProductId, 
            'Product ID on cart page is not exist, adding to cart was failed',
            'Product ID on cart page is exist, adding to cart was success',)
    }
}

module.exports = { BirdsPage };