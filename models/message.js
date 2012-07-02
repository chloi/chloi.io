var request     = require("request")

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

    var body = {
      "To"        : "info@chloi.io",
      "From"      : "info@chloi.io",
      "Subject"   : "Hello",
      "TextBody"  : obj.body,
      "ReplyTo"   : obj.name + "<" + obj.email + ">"
    }

    var args = {
      "method"  : "POST",
      "url"     : "http://api.postmarkapp.com/email",
      "body"    : JSON.stringify(body),
      "headers" : {
        "Accept"                  : "application/json",
        "Content-Type"            : "application/json",
        "X-Postmark-Server-Token" : creds.token
      }
    }

    request(args, function(e,r,b){
      if(r.statusCode == 200){
        console.log(b)
        cb(null, obj)
      }else{
        console.log(b)
        cb({})
      }
    })
  }
  
  return message
}
