const { Builder, By, Key, until} = require('selenium-webdriver');
// const assert = require('assert');
// const Assert = require('assert-js');

const Assert = require('./assert');



async function test1() {

    /////////////////////////
    // GIVEN
    ////////////////////////

    const driver = await new Builder().forBrowser('firefox').build();

    // initial values
    const pasteDescription = 'Lab work 1 using selenium WebDriver';
    const pasteTitle = 'Lab work 1.';


    /////////////////////////
    // WHEN
    ////////////////////////

    // open url
    await driver.get('https://pastebin.com');

    // find textarea and fill it
    await driver.findElement(By.id('postform-text')).sendKeys(pasteDescription);
    
    // find combobox and click it 
    await driver.findElement(By.id("select2-postform-expiration-container")).click();
    
    // click combobox and choose need time expiration 
    await driver
                .findElement(By.id("select2-postform-expiration-results"))
                .findElement(By.xpath("//li[text()='10 Minutes']"))
                .click();
    
    // find form name input add fill it with intial value
    await driver.findElement(By.id("postform-name")).sendKeys(pasteTitle);

    // find post button and click it
    await driver
                .findElement(By.xpath("//button[text()='Create New Paste']"))
                .click();


    /////////////////////////
    // THEN
    ////////////////////////

    const actualTitle = await driver.findElement(By.xpath("//div[@class='info-top']//h1")).getText();
    const actualDescription = await driver.findElement(By.xpath("//textarea[@class='textarea']")).getText();

    Assert.isEqual(pasteDescription, actualDescription, "Contents don't match");
    Assert.isEqual(pasteTitle, actualTitle, "Titles don't match");   
}

async function test2() {
    /////////////////////////
    // GIVEN
    ////////////////////////

    const driver = await new Builder().forBrowser('firefox').build();
    const exptectedTitle = 'Demo Web Shop. Computing and Internet';

    /////////////////////////
    // WHEN
    ////////////////////////

    // open url
    await driver.get('http://demowebshop.tricentis.com/');

    await driver.findElement(By.xpath("//a[contains(text(), 'Books')]")).click()
    await driver
        .findElement(By.xpath("//div[@data-productid='13']"))
        .findElement(By.xpath("//h2[@class='product-title']//a")).click();

    const title = await driver.getTitle();

    /////////////////////////
    // THEN
    ////////////////////////

    Assert.isEqual(title, exptectedTitle, 'Titles don\'t match');
}


test1();
test2();