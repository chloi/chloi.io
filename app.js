// core
var fs        = require("fs")

// libs
var express   = require("express")
var jade      = require("jade")
var request   = require("request")

// stuff
var app       = express.createServer()
var m         = require("./lib/middleware")
var Thug      = require("./lib/thug")

// models
var message   = require("./models/message")({})

if(process.env.NODE_ENV == "production"){
  var exec = require('child_process').exec
  exec('./node_modules/.bin/lessc public/css/app.less public/css/app.css;',
    function (error, stdout, stderr) {
      if (error) {
        console.log('exec error: ' + error)
      } else {
        console.log("compiled css files")
      }
  })
}

// --------------------
// configure
// --------------------

app.configure(function(){
  app.set("view engine", "jade");
  app.set('views', __dirname + '/views'); 
  app.use(express.bodyParser());
  app.use(express.static(__dirname + "/public"))
})

// --------------------
// index
// --------------------

app.get("/", m.info, function(req, rsp){      
  rsp.render("index", {
    info : req.info
  })
})

// --------------------
// contact form
// --------------------

app.post("/messages", function(req, rsp){
  message.create(req.body, function(errors, obj){
    if(errors){
      // not sent
      console.log("not sent")
      console.log(errors.messages)
      rsp.redirect("index")
    }else{
      // sent
      console.log("sent")
      rsp.redirect("index")
    }
  })
})

// --------------------
// export
// --------------------

module.exports = app
