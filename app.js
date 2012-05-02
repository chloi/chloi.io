// core
var fs        = require("fs")

// libs
var express   = require("express")
var jade      = require("jade")
var request   = require("request")

// stuff
var app       = express.createServer()
var m         = require("./lib/middleware")



if(process.env.NODE_ENV == "production"){
  var exec = require('child_process').exec
  exec('./node_modules/.bin/lessc public/css/app.less public/css/app.css;',
    function (error, stdout, stderr) {
      if (error) {
        console.log('exec error: ' + error)
      }else{
        console.log("compiled css files")
      }
  })
}

// --------------------
// configure
// --------------------

app.configure(function(){
  app.set("view engine", "jade")
  app.set('views', __dirname + '/views');  
  app.use(express.static(__dirname + "/public"))
})

// --------------------
// index
// --------------------

app.get("/", m.info, function(req, rsp){      
  rsp.render("index", {
    info      : req.info
  })
})

// --------------------
// export
// --------------------

module.exports = app
