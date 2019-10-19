const validateNum = require('../lib/validateNum');
const validateUnit = require('../lib/validateUnit');

module.exports = (rawInput) => {
  // console.log(`splitInput function called.\nrawInput: ${rawInput}`);

  // validates against most cases, other than multiple decimals.
  // check for multiple decimals in number validation
  const regex = /^([0-9]*[.]?[0-9]+)?[\/]?([0-9]*[.]?[0-9]+)?([a-zA-Z]+)$/gm;
  // const regex = /^([0-9./])*([a-zA-Z])+$/gm;
  
  const match = regex.test(rawInput); // general format validation
  // console.log(`\tmatch?: ${match}`);
  // Get matches from exec
  
  if(match) {
    
    regex.lastIndex = 0;
    // console.log(regex.exec(rawInput)); // for debugging null values
    const results = regex.exec(rawInput);
    
    const rawNum1 = results[1], // First group for 'num', left of '/'
          rawNum2 = results[2], // Second group for 'num', right of '/'
          rawUnit = results[3]; // Group for 'unit'
    // console.log(`\trawNum1: ${rawNum1} | rawNum2: ${rawNum2} | rawUnit: ${rawUnit}`);
    
    // validate 'num' and 'unit'
    const validNums = validateNum(rawNum1, rawNum2);
    const validUnit = validateUnit(rawUnit);
    
    // console.log(regex.exec(rawInput));
    // console.log(`\tresults: `, results);
    
    function convertStrToNum(str) {
      return Number(str);
    }
    
    // console.log(`\t\tvalidNums is valid: ${validNums} | validUnit is valid: ${validUnit}`)
    if(validNums && validUnit) {
      if(rawNum1 !== undefined && rawNum2 === undefined) {
        // console.log({``
        //   num: convertStrToNum(rawNum1),
        //   unit: rawUnit
        // });
        return {
          num: convertStrToNum(rawNum1),
          unit: rawUnit
        }
      } else if(rawNum1 === undefined && rawNum2 === undefined) {
        return {
          num: 1,
          unit: rawUnit
        }
      } else {
        
        const calc = (convertStrToNum(rawNum1) / convertStrToNum(rawNum2)).toFixed(5);
        // console.log(`calc: ${calc}`);
        // console.log(`calc w/ toFixed(5): ${calc.toFixed(5)}`);
        
        return {
          num: calc,
          unit: rawUnit
        }
      }
    } else if(!validNums) {
      console.log('Nums are invalid!');
      return { 
        num: 'invalid number'
      };
    } else if(!validUnit) {
      // console.log(`Unit is invalid! - ${rawUnit}`);
      return {
        unit: 'invalid unit'
      };
    }
  } else {
      console.log('do something for the bad input matches here');
      return {
        num: 'invalid number',
        unit: 'invalid unit'
      };
  }
}