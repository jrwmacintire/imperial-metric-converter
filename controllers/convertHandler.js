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
    const { num, unit } = this.splitInputUnitAndNumber(input);
    // TODO: Add validation to 'num'
    // find the two pieces

    const regex = /^([0-9]*[.]?[0-9]*)[\/]?([0-9]*[.]?[0-9]*[.]?[0-9]*)$/gm;
    const matches = regex.exec(num);

    if(matches === null) return 'Invalid number.';
    const num1 = Number(matches[1]),
          num2 = Number(matches[2]);
    const validNumber = this.validateNumber(num);

    if(validNumber) {
      const float = this.convertToFloat(num1, num2);
      if(num === '') return 1;
      if(float !== false) return float;
      if(float === false) return 'Invalid number.';
    } else {
      throw Error('Error occured trying to get a number from the input.');
    }

  };
  
  this.getUnit = function(input) {
    const unit = this.splitInputUnitAndNumber(input).unit;
    // TODO: Add validation for 'unit'
    const validUnit = this.validateUnit(unit);
    if(validUnit) return unit;
    else return 'Invalid unit.';
  };

  this.splitInputUnitAndNumber = function(input) {
    try {
      const splitInputRegex = /^([0-9./]*)([a-zA-Z]+)$/gm;
      const matches = splitInputRegex.exec(input);
      if(!matches) {
        return {
          num: 'Invalid number.',
          unit: 'Invalid unit.'
        };
      }
      const [ all, number, unit ] = matches;
      // For input w/o number, containing only text
      if(matches[1] === '' && matches[2] !== '') {
        return {
          num: 1,
          unit: matches[2]
        };
      } else if(matches[1] === '' && matches[2] === '') {
        return {
          num: 'Invalid number.',
          unit: 'Invalid unit.'
        };
      } else {
        return {
          num: matches[1],
          unit: matches[2]
        };
      }
    } catch(err) {
      throw err;
    }
  };

  this.convertToFloat = function(num1, num2) {
    if(num1 !== 0 && num2 === 0) {
      return parseFloat(num1);
    } else if(num1 !== 0 && num2 !== 0) {
      const dividend = num1 / num2;
      return Number(dividend.toFixed(5));
    } else {
      return false;
    }
  };

  this.validateNumber = function(num) {
    const regex = /^([0-9]*[.]?[0-9]*[\/]?)([0-9]*[.]?[0-9]*[.]?[0-9]*)$/gm;
    const result = regex.test(num);
    if(result) return true;
    else return false;
  };

  this.validateUnit = function(unit) {
    const inputs = ['gal','l','mi','km','lbs','kg'];
    let valid = false;
    inputs.forEach(input => {
      if(input === unit.toLowerCase()) valid = true;
    });
    // console.log(`Validating unit - unit is ${valid}`);
    return valid;
  }
  
  this.getReturnUnit = function(initUnit) {
    
    // console.log(`this.getReturnUnit - initUnit: ${initUnit}`);
    const input = ['gal','l','mi','km','lbs','kg'],
          expect = ['l','gal','km','mi','kg','lbs'],
          converseUnit = expect[input.indexOf(initUnit)];
    // console.log(`initUnit: ${initUnit} | converseUnit: ${converseUnit}`);
    
    return converseUnit;
  };

  this.spellOutUnit = function(unit) {
    // console.log(`this.spellOutUnit - unit: ${unit}`);
    
    switch(unit.toLowerCase()) {
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
        return 'Invalid unit';
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    function conversion(unit) {
      switch(unit.toLowerCase()) {
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
          // console.log('Failed to match a unit for conversion.');
          return 'Invalid unit';
      }
    };
    
    const result = parseFloat(conversion(initUnit).toFixed(5));
    // console.log(`result: ${result}`);
    return result;
    
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit.toLowerCase())} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
