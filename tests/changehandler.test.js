let { ChangeHandler } = require("../src/changehandler");


describe('Constructor Is Set Correctly', function() {
    test('Amount Due Is Set', function() {
        const change = new ChangeHandler(80);
        expect(change.amountDue).toEqual(80);
    });
    test('Cash Tendered Is Set To Zero', function() {
        const change = new ChangeHandler(80);
        expect(change.cashTendered).toEqual(0);
    });
});

describe('Inserting Various Coins Shows Correct Amounts', function() {
    test('Inserting a quarter adds 25', function() {
        const change = new ChangeHandler(0);
        change.insertCoin('quarter');
        expect(change.cashTendered).toEqual(25);
    });
    test('Inserting a dime adds 10', function() {
        const change = new ChangeHandler(0);
        change.insertCoin('dime');
        expect(change.cashTendered).toEqual(10);
    });
    test('Inserting a nickel adds 5', function() {
        const change = new ChangeHandler(0);
        change.insertCoin('nickel');
        expect(change.cashTendered).toEqual(5);
    });
    test('Inserting a penny adds 1', function() {
        const change = new ChangeHandler(0);
        change.insertCoin('penny');
        expect(change.cashTendered).toEqual(1);
    });
    test('Calling the function multiple times continues adding', function() {
        const change = new ChangeHandler(0);
        change.insertCoin('quarter');
        change.insertCoin('penny');
        change.insertCoin('dime');
        expect(change.cashTendered).toEqual(36)
    });
});

describe('isPaymentSufficient returning the correct boolean', function() {
    test('Returns true if cashTendered more than amountDue', function() {
        const change = new ChangeHandler(10);
        change.insertCoin('quarter');
        expect(change.isPaymentSufficient()).toBeTruthy();
    });
    test('Returns false if cashTendered less than amountDue', function() {
        const change = new ChangeHandler(35);
        change.insertCoin('quarter');
        expect(change.isPaymentSufficient()).toBeFalsy();
    });
    test('Returns true if cashTendered equal to amountDue', function() {
        const change = new ChangeHandler(25);
        change.insertCoin('quarter');
        expect(change.isPaymentSufficient()).toBeTruthy();
    });
});

describe('Check if giveChange produces the right coins', function() {
    test('32 change produces: quarters: 1, dimes: 0, nickels: 1, pennies: 2', function () {
        const change = new ChangeHandler(32);
        change.cashTendered = 64;
        expect(change.giveChange()).toMatchObject({'quarters': 1, 'dimes': 0, 'nickels': 1, 'pennies': 2});
    });
    test('10 change produces: quarters: 0, dimes: 1, nickels: 0, pennies: 0', function() {
        const change = new ChangeHandler(115);
        change.cashTendered = 125;
        expect(change.giveChange()).toMatchObject({ 'quarters': 0, 'dimes': 1, 'nickels': 0, 'pennies': 0})
    });
    test('27 change produces: quarters: 1, dimes: 0, nickels: 0, pennies: 2', function() {
        const change = new ChangeHandler(25);
        change.cashTendered = 52;
        expect(change.giveChange()).toMatchObject({ 'quarters': 1, 'dimes': 0, 'nickels': 0, 'pennies': 2 })
    });
    test('68 change produces: quarters: 2, dimes: 1, nickels: 1, pennies: 3', function() {
        const change = new ChangeHandler(32);
        change.cashTendered = 100;
        expect(change.giveChange()).toMatchObject({ 'quarters': 2, 'dimes': 1, 'nickels': 1, 'pennies': 3 })
    });
});