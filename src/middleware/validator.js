'use strict';


function validator(req, res, next){
  if (req.query.name){
    next();
  }
  else {
    next('Please input a valid name');
  }
}

module.exports = validator;
