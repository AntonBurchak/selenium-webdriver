const { Builder, By, Key, until} = require('selenium-webdriver');
const { LoginPage } = require('./LoginPage');
const { BirdsPage } = require('./BirdsPage');
const { CartPage } = require('./CartPage');
const Assert = require('../assert');

class HomePage {
    constructor(driver) {
        this.driver = driver;
    }

    static URL_MATCH = 'actions/Catalog.action';

    async open() {
        await this.driver.get('https://petstore.octoperf.com/actions/Catalog.action');
    }

    // Sign In button
    get signIn() {
        return this.driver.findElement(By.xpath("//img[@align='middle']/following-sibling::a"));
    }

    get openBirdsPageButton() {
        return this.driver.findElement(By.xpath("//div[@id='SidebarContent']/a[5]/img[1]"));
    }

    get openCartButton() {
        return this.driver.findElement(By.xpath("//img[@align='middle']"));
    }

    // log out test
    get usernameField() {
        return this.driver.findElement(By.xpath("//div[@id='Catalog']//input"));
    }

    get passwordField() {
        return this.driver.findElement(By.xpath("//input[@type='password']"));
    }

    get getLoginButton() {
        return this.driver.findElement(By.xpath("//input[@value='Login']"));
    }

    get getLogoutButton() {
        return this.driver.findElement(By.xpath("//img[@align='middle']/following-sibling::a"));
    }

    get getMyAccountButton() {
        return this.driver.findElement(By.xpath("(//img[@align='middle']/following-sibling::a)[2]"));
    }

    async registerUser(userData) {
        await this.open();
        await this.signIn.click();

        const currentUrl = await this.driver.getCurrentUrl();

        console.log(currentUrl.includes(LoginPage.URL_MATCH));

        if (currentUrl.includes(LoginPage.URL_MATCH)) {
            const Loginpage = new LoginPage(this.driver);

            await Loginpage.registerUser(userData);
        }
    }

    async loginUser(userData) { // success
        await this.open();
        await this.signIn.click();

        const currentUrl = await this.driver.getCurrentUrl();

        if (currentUrl.includes(LoginPage.URL_MATCH)) {
            const Loginpage = new LoginPage(this.driver);

            await Loginpage.loginUser(userData);
        }

        const logoutButtonExists = await this.getLogoutButton.isDisplayed();
        
        Assert.isEqual(logoutButtonExists, true, 
            'Logout button isn\'t exist, login was failed',
            'Logout button is exist, login was success',)
    }

    async logOutUser(userData) {
        await this.open();
        await this.signIn.click();

        const currentUrl = await this.driver.getCurrentUrl();

        console.log(currentUrl.includes(LoginPage.URL_MATCH));

        if (currentUrl.includes(LoginPage.URL_MATCH)) {
            const Loginpage = new LoginPage(this.driver);

            await Loginpage.loginUser(userData);
        }

        const myAccountButton = await this.getMyAccountButton.isDisplayed();
        let isMyAccountBtnMustBeEnabled = true;

        Assert.isEqual(myAccountButton, isMyAccountBtnMustBeEnabled, 
            'My Account button isn\'t exist, failed',
            'My Account button is exist, login was been success :)',);

        await this.getLogoutButton.click();

        const myAccountButtonAfterLogout = 
            await this.getMyAccountButton.isDisplayed() && await this.getMyAccountButton.getText() === 'My Account';

        isMyAccountBtnMustBeEnabled = false;
        
        Assert.isEqual(myAccountButtonAfterLogout, isMyAccountBtnMustBeEnabled, 
            'My Account button is exist, failed',
            'My Account button isn\'t exist, success',);
    }

    async addParrotToCart() {
        await this.open();
        await this.openBirdsPageButton.click();

        const currentUrl = await this.driver.getCurrentUrl();

        if (currentUrl.includes(BirdsPage.URL_MATCH)) {
            const Birdspage = new BirdsPage(this.driver);

            await Birdspage.addParrotToCart();
        }
    }

    async removeParrotFromCart() {
        await this.open();
        await this.openCartButton.click();

        const currentUrl = await this.driver.getCurrentUrl();

        if (currentUrl.includes(CartPage.URL_MATCH)) {
            const Cartpage = new CartPage(this.driver);

            console.log('зашло в removeParrotFromCart')

            await Cartpage.removeParrotFromCart();
        }
    }

    
}

module.exports = { HomePage };