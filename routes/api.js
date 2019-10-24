/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){

      // FIXME: Fix false 'invalid number' from 'getUnit' method
      try {
        const input      = req.query.input,
              initNum    = convertHandler.getNum(input),   // returns input's number converted to Number, or 'invalid number'
              initUnit   = convertHandler.getUnit(input);  // returns input's unit as a string, or 'invalid unit' 

        if(initNum === 'Invalid number.' && initUnit === 'Invalid unit.') {
          res.status(500).json('Invalid number and unit in input.');
        } else if(initNum === 'Invalid number.') {
          res.status(500).json('Invalid number.');
        } else if(initUnit === 'Invalid unit.') {
          res.status(500).json('Invalid unit.')
        } else {
          const returnNum  = convertHandler.convert(initNum, initUnit),
                returnUnit = convertHandler.getReturnUnit(initUnit.toLowerCase()),
                toString   = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
          
          const response = {
                 initNum: initNum,
                initUnit: initUnit,
               returnNum: returnNum,
              returnUnit: returnUnit,
               getString: toString
            };
          
          res.json(response);
        }

      } catch(err) {
        // res.send(err);
        throw err;
      }
        
    });
    
};
