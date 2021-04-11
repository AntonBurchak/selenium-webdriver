const { By } = require('selenium-webdriver');
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
    
    async addParrotToCart() {
        await this.open();
        await this.getParrotItem.click();

        const currentUrl = await this.driver.getCurrentUrl();

        if (currentUrl.includes(ProductPage.URL_MATCH)) {
            const Productpage = new ProductPage(this.driver);

            await Productpage.addParrotToCart();
        }
    }
}

module.exports = { BirdsPage };