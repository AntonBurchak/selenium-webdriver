const { Builder } = require('selenium-webdriver');
const { HomePage } = require('./pages/HomePage');

async function testRegisterUser() {
    const driver = await new Builder().forBrowser('firefox').build();
    const Homepage = new HomePage(driver);

    const userData = {
        username: 'AntonBurchak',
        password: 'qwerty',
    }
    
    const accountData = {
        firstName: 'Anton',
        lastName: 'Burchak',
        email: 'burchak.a18@fpm.dnu.edu.ua',
        phone: '380731616440',
        address_1: 'Haharina 28',
        address_2: 'Haharina 28',
        city: 'Dnipro',
        state: 'Dniprovska oblast\'',
        zip: 112233,
        country: 'Ukraine'
    }

    const profileData = {
        enableMyList: true,
        enableMyBanner: true
    }

    await Homepage.registerUser({
        ...userData,
        ...accountData,
        ...profileData
    });
};

async function testLoginUser() {
    // GIVEN
    const driver = await new Builder().forBrowser('firefox').build();
    const Homepage = new HomePage(driver);

    const userData = {
        username: 'AntonBurchak',
        password: 'qwerty',
    }
    
    // WHEN
    await Homepage.loginUser({
        ...userData
    });
};

async function testAddingBirdToCart() {
    const driver = await new Builder().forBrowser('firefox').build();
    const Homepage = new HomePage(driver);

    await Homepage.addParrotToCart();
}

async function testRemoveBirdFromCart() {
    const driver = await new Builder().forBrowser('firefox').build();
    const Homepage = new HomePage(driver);

    await Homepage.removeParrotFromCart();
}

async function testLogOutUser() {
    const driver = await new Builder().forBrowser('firefox').build();
    const Homepage = new HomePage(driver);

    const userData = {
        username: 'AntonBurchak',
        password: 'qwerty',
    }

    await Homepage.logOutUser(userData);
}
// await testRegisterUser() // [error, because I'm already registered]

testLoginUser() // +
    .then(() => testAddingBirdToCart()) // +
    .then(() => testRemoveBirdFromCart()) // +
    // .then(() => testLogOutUser())

    // testRemoveBirdFromCart()