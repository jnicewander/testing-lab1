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
        
    });
});