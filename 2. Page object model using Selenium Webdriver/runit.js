const { Builder } = require('selenium-webdriver');
const { HomePage } = require('./pages/HomePage');


const delayBeforeClosingByDefault = 1000;

const waiter = (driver, delay = delayBeforeClosingByDefault) => new Promise((resolve, reject) => {
    setTimeout(() => {
        driver.close();
        return resolve();
    }, delay)
})

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

    await waiter(driver, 4000);
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
    await waiter(driver);
};

async function testAddingBirdToCart() {
    const driver = await new Builder().forBrowser('firefox').build();
    const Homepage = new HomePage(driver);

    await Homepage.addParrotToCart();
    await waiter(driver);
}

async function testRemoveBirdFromCart() {
    const driver = await new Builder().forBrowser('firefox').build();
    const Homepage = new HomePage(driver);

    await Homepage.removeParrotFromCart();
    await waiter(driver);
}

async function testLogOutUser() {
    const driver = await new Builder().forBrowser('firefox').build();
    const Homepage = new HomePage(driver);

    const userData = {
        username: 'AntonBurchak',
        password: 'qwerty',
    }

    await Homepage.logOutUser(userData);
    await waiter(driver);
}

// testRegisterUser()
//     .then(() => testLoginUser()) // + 
//     .then(() => testAddingBirdToCart()) // +
//     .then(() => testRemoveBirdFromCart()) // +
//     .then(() => testLogOutUser()) // +

    // Note:
        // + beforeEach
        // + negative

async function testLoginUserNegative() {
    // GIVEN
    const driver = await new Builder().forBrowser('firefox').build();
    const Homepage = new HomePage(driver);
        
    const wrongUserData = {
        username: 'пєтойцвтацйолт',
        password: 'qwerty',
    }
            
    // WHEN
    await Homepage.loginUser({
        ...wrongUserData
    }, true);
};

testLoginUserNegative();
