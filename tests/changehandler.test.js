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