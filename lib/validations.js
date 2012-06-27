var validator = require("validator")

exports.present = function(field, obj, errors, next){
  if(obj[field] && obj[field].length > 0){
    next()
  }else{
    errors.push("must be present")
    next()
  }
}

exports.email = function(field, obj, errors, next){
  try {
    validator.check(obj[field]).isEmail()
  } catch (e) {
    errors.push("must be valid")
  }
  next()
}
