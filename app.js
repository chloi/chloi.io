// core
var fs        = require("fs")

// libs
var express   = require("express")
var jade      = require("jade")

// stuff
var app       = express.createServer()
var m         = require("./lib/middleware")
var Thug      = require("./lib/thug")

// models
var message   = require("./models/message")({ token: "c34e1598-d371-4809-a418-6aac7cc8a03b" })

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

app.get("/", function(req, rsp){      
  rsp.render("index")
})

// --------------------
// contact form
// --------------------

app.post("/messages", function(req, rsp){
  message.create(req.body, function(errors, obj){
    if(errors){
      rsp.send(JSON.stringify(errors), 400)
    }else{
      rsp.send(JSON.stringify(obj), 201)
    }
  })
})

// --------------------
// export
// --------------------

module.exports = app
