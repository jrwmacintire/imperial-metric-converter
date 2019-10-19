module.exports = (unit) => {
  // console.log(`\tValidating 'unit': ${unit}`);
  const inputs = ['gal','l','mi','km','lbs','kg'];
  let valid = false;
  inputs.forEach(input => {
    if(input === unit.toLowerCase()) valid = true;
  });
  // console.log(`Validating unit - unit is ${valid}`);
  return valid;
}