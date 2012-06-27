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
      "email"   : [validations.present, validations.email],
      "name"    : [validations.present],
      "body"    : [validations.present]
    }
  })
  
  // Write the Record
  message.constructor.prototype.write = function(obj, cb){
    console.log("Sending Email...")
    console.log(obj)
    // send message here
    cb(null, obj)
  }
  
  return message
}
