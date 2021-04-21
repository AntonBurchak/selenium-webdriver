const Assert = require('../assert');
const { By } = require('selenium-webdriver');

class LoginPage {
    constructor(driver) {
        this.driver = driver;
    }

    static URL_MATCH = 'actions/Account.action';

    async open() {
        await this.driver.get('https://petstore.octoperf.com/actions/Account.action');
    }

    get goRegisterButton() {
        return this.driver.findElement(By.xpath("//a[@href='/actions/Account.action?newAccountForm=']"));
    }
    /* Loging locators */

    get usernameField() {
        return this.driver.findElement(By.xpath("//div[@id='Catalog']//input"));
    }

    get passwordField() {
        return this.driver.findElement(By.xpath("//input[@type='password']"));
    }

    get getLoginButton() {
        return this.driver.findElement(By.xpath("//input[@value='Login']"));
    }
    
    /* Registration locators */

    get getUserIdField() {
        return this.driver.findElement(By.xpath("//input[@name='username']"));
    }
    get getPasswordField() {
        return this.driver.findElement(By.xpath("//input[@name='password']"));
    }
    get getRepeatPasswordField() {
        return this.driver.findElement(By.xpath("//input[@name='repeatedPassword']"));
    }

    get getFirstNameField() {
        return this.driver.findElement(By.xpath("//input[@name='account.firstName']"));
    }
    get getLastNameField() {
        return this.driver.findElement(By.xpath("//input[@name='account.lastName']"));
    }
    get getEmailField() {
        return this.driver.findElement(By.xpath("//input[@name='account.email']"));
    }
    get getPhoneField() {
        return this.driver.findElement(By.xpath("//input[@name='account.phone']"));
    }
    get getAdress1Field() {
        return this.driver.findElement(By.xpath("//input[@name='account.address1']"));
    }
    get getAdress2Field() {
        return this.driver.findElement(By.xpath("//input[@name='account.address2']"));
    }
    get getCityField() {
        return this.driver.findElement(By.xpath("//input[@name='account.city']"));
    }
    get getStateField() {
        return this.driver.findElement(By.xpath("//input[@name='account.state']"));
    }
    get getZipField() {
        return this.driver.findElement(By.xpath("//input[@name='account.zip']"));
    }
    get getCountryField() {
        return this.driver.findElement(By.xpath("//input[@name='account.country']"));
    }
    get getMyListCheckbox() {
        return this.driver.findElement(By.xpath("//input[@name='account.listOption']"));
    }
    get getMyBannerCheckbox() {
        return this.driver.findElement(By.xpath("//input[@name='account.bannerOption']"));
    }

    get getRegisterButton() {
        return this.driver.findElement(By.xpath("//input[@value='Save Account Information']"));
    }

    get getFailedMessage() {
        return this.driver.findElement(By.xpath("//ul[@class='messages']//li[1]"));
    }

    async initializeValues(userData) {
        await this.getUserIdField.sendKeys(userData.username);
        await this.getPasswordField.sendKeys(userData.password);
        await this.getRepeatPasswordField.sendKeys(userData.password);
        await this.getFirstNameField.sendKeys(userData.firstName);
        await this.getLastNameField.sendKeys(userData.lastName);
        await this.getEmailField.sendKeys(userData.email);
        await this.getPhoneField.sendKeys(userData.phone);
        await this.getAdress1Field.sendKeys(userData.address_1);
        await this.getAdress2Field.sendKeys(userData.address_2);
        await this.getCityField.sendKeys(userData.city);
        await this.getStateField.sendKeys(userData.state);
        await this.getZipField.sendKeys(userData.zip);
        await this.getCountryField.sendKeys(userData.country);

        const getMyListCheckbox = await this.getMyListCheckbox;
        const getMyBannerCheckbox = await this.getMyBannerCheckbox;

        userData.enableMyList ?  await getMyListCheckbox.click() : null;
        userData.enableMyBanner ?  await getMyBannerCheckbox.click() : null;
    }

    async registerUser(userData) {
        await this.open();
        await this.goRegisterButton.click();

        await this.initializeValues(userData);
        await this.getRegisterButton.click();
    }

    async loginUser(userData, isNegative = false) { 
        await this.open();
        
        await this.usernameField.sendKeys(userData.username);
        await this.passwordField.clear();
        await this.passwordField.sendKeys(userData.password);

        // THEN
    
        await (async () => {
            const actualUsername = await this.usernameField.getAttribute("value");
            const actualPassword = await this.passwordField.getAttribute("value");

            Assert.isEqual(actualUsername, userData.username, 'Failed');
            Assert.isEqual(actualPassword, userData.password, 'Failed');
        })();

        await this.getLoginButton.click();

        const failureMessageExist = await this.getFailedMessage.isDisplayed();
        const failureMessageText = await this.getFailedMessage.getText();

        const expectedFailureMessage = 'Invalid username or password. Signon failed.';

        if (isNegative) {
            Assert.isEqual(failureMessageExist, true, 
                'Failed, failure message isn\'t exist',
                'Success, failure message exist when we using wrong userdata');
            Assert.isEqual(failureMessageText, expectedFailureMessage, 
                'Failed, failure message isn\'t correct',
                'Success, failure message correct when we using wrong userdata');
        }
    }

    async logOutUser(userData) { 
        await this.open();
        
        await this.usernameField.sendKeys(userData.username);
        await this.passwordField.clear();
        await this.passwordField.sendKeys(userData.password);

        await this.getLoginButton.click();

        // await this.driver.get('https://petstore.octoperf.com/actions/Catalog.action');

        
    }
}

module.exports = { LoginPage };