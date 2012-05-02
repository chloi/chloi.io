var fs      = require("fs")
var request = require("request")
var jade    = require("jade")

exports.info = function(req, rsp, next){
  req.info = JSON.parse(fs.readFileSync("./data/info.json"))
  next()  
}

