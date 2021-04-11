module.exports = (function (){
    function isEqual(actual, expected, messageFail, messageSuccess) {
        console.log('\x1b[47m\x1b[30m%s\x1b[0m', '////////////TEST////////////')

        if (actual === expected) {
            console.log(`Actual: ${actual}\nExpected: ${expected}`);
            
            console.log('\x1b[32m\x1b[40m%s\x1b[0m', `Assertion passed`);
            messageSuccess ? console.log(messageSuccess) : null;
        } else {
            console.log(`Actual: ${actual}\nExpected: ${expected}`);
            messageFail ? console.log('\x1b[31m%s\x1b[0m', `Assertion failed: ${messageFail}`) :
            console.log('\x1b[31m%s\x1b[0m', `Assertion failed`);
        }
    }

    return {
        isEqual
    }
})()