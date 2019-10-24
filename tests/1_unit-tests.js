/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');
var validateUnit = require('../lib/validateUnit.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      var input = '32L';
      assert.equal(convertHandler.getNum(input),32);
      done();
    });
    
    test('Decimal Input', function(done) {
      const input = '3.2gal';
      assert.equal(convertHandler.getNum(input), 3.2);
      done();
    });
    
    test('Fractional Input', function(done) {
      const input = '32/7gal';
      assert.equal(convertHandler.getNum(input), 4.57143);
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      const input = '7.8/3gal';
      assert.equal(convertHandler.getNum(input), 2.6);
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      const input = '9/1/3gal';
      assert.deepEqual(convertHandler.getNum(input), 'Invalid number in input.');
      done();
    });
    
    test('No Numerical Input', function(done) {
      const input = 'mi';
      
      assert.equal(convertHandler.getNum(input), 1);
      done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      const input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach(function(ele) {
        // console.log('\t\tele = ', ele);
        // console.log(convertHandler.getUnit(ele));
        
        // This test converts the ele into an object with '1' as its number
        // (because no number input is provided, i.e. 'gal')
        // and then it returns the unit 'gal', from the object below
        // { number: 1, unit: 'gal' } -> getUnit = 'gal' , for example
        assert.equal(convertHandler.getUnit(ele), ele); 
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      const unknownUnit = '23hands';
      assert.equal(convertHandler.getUnit(unknownUnit), 'invalid unit')
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['l','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      const spelledOut = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
      input.forEach((ele, i) => {
        assert.equal(convertHandler.spellOutUnit(ele), spelledOut[i]);
      });
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      var input = [5, 'gal'];
      var expected = 18.92705;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      const input = [12, 'l'];
      const expected = 3.17007;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Mi to Km', function(done) {
      const input = [3, 'mi'];
      const expected = 4.82802;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Km to Mi', function(done) {
      const input = [100, 'km'];
      const expected = 62.13727;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Lbs to Kg', function(done) {
      const input = [170, 'lbs'];
      const expected = 77.11064;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Kg to Lbs', function(done) {
      const input = [10, 'kg'];
      const expected = 22.04624;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
  });

});