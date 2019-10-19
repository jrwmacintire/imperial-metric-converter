module.exports = (num1, num2) => {
  // console.log(`\t~ before validation ~ num1: ${num1} | num2: ${num2}`);
  
  function validNumRegex(num) {
    const regex = /^[0-9]*[.]?[0-9]+/gm;
    return regex.test(num);
  }
  
  const num1Result = validNumRegex(num1),
        num2Result = validNumRegex(num2);
  

  if(num1 == undefined && num2 == undefined) {
    // console.log('both nums are undefined');
    return true;
  } if(num1 != undefined && num2 == undefined) {
    // console.log(`\t\tValidating 'num1': ${num1}`);
    if(num1Result) {
      // console.log('num1 is valid!!');
      return true;
    } else {
      return false;
    }
  } else {
    if(num1Result && num2Result) {
      // console.log('num1 and num2 are valid!!');
      return true;
    } else {
      // console.log('num1 and num2 are INVALID!')
      return false;
    }
  };
}