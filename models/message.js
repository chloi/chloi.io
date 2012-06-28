var Thug        = require("../lib/thug")
var validations = require("../lib/validations")

module.exports = function(creds) {

  var message = new Thug({
    "locals": {
      "creds": creds
    },
    filters: {
      in     : [],
      before : [],
      after  : [],
      out    : []
    },
    "validations": {
      "name"    : [validations.present],
      "email"   : [validations.present, validations.email],
      "body"    : [validations.present]
    }
  })
  
  // Write the Record
  message.constructor.prototype.write = function(obj, cb){
    // send message here
    cb(null, obj)
  }
  
  return message
}
