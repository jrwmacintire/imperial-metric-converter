const processInput = require('../lib/processInput');

/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  this.getNum = function(input) {
    // console.log('\t~ this.getNum triggered ~', 'input: ' + input);
    const num = processInput(input).num;
    console.log(`\tnum: ${num}`);
    if(num) return num;
    else return 'invalid number';
  };
  
  this.getUnit = function(input) {
    // console.log('\t~ this.getUnit triggered ~', 'input: ' + input);
    const unit = processInput(input).unit;
    console.log(`unit: ${unit}`);
    return unit;
  };
  
  this.getReturnUnit = function(initUnit) {
    
    // console.log(`this.getReturnUnit - initUnit: ${initUnit}`);
    const input = ['gal','l','mi','km','lbs','kg'],
          expect = ['l','gal','km','mi','kg','lbs'],
          converseUnit = expect[input.indexOf(initUnit)];
    // console.log(`initUnit: ${initUnit} | converseUnit: ${converseUnit}`);
    
    return converseUnit;
  };

  this.spellOutUnit = function(unit) {
    var result;
    // console.log(`this.spellOutUnit - unit: ${unit}`);
    
    const units = ['gal','l','mi','km','lbs','kg'];
    
    switch(unit) {
      case 'gal':
        return 'gallons';
      case 'l':
        return 'liters';
      case 'mi':
        return 'miles';
      case 'km':
        return 'kilometers';
      case 'lbs':
        return 'pounds';
      case 'kg':
        return 'kilograms';
      default:
        console.log('Failed to match and spell out unit.');
        return 'invalid unit';
    }
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    function conversion() {
      switch(initUnit.toLowerCase()) {
        case 'gal':
          return (initNum * galToL);
        case 'l':
          return (initNum / galToL);
        case 'mi':
          return (initNum * miToKm);
        case 'km':
          return (initNum / miToKm);
        case 'lbs':
          return (initNum * lbsToKg);
        case 'kg':
          return (initNum / lbsToKg);
        default:
          console.log('Failed to match a unit for conversion.');
          return 'invalid unit';
      }
    };
    
    const result = Number(conversion().toFixed(5));
    // console.log(`result: ${result}`);
    
    return result;
    
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit.toLowerCase())} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
