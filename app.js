// core
var fs              = require("fs")

// libs
var express         = require("express")
var jade            = require("jade")

// stuff
var app             = express.createServer()
app.middleware      = require("./lib/middleware")

// models
var message = require("./models/message")({ token: "c34e1598-d371-4809-a418-6aac7cc8a03b" })

if(process.env.NODE_ENV == "production"){
  var exec = require('child_process').exec
  exec('./node_modules/.bin/lessc public/css/site.less public/css/site.css; ./node_modules/.bin/lessc public/css/blog.less public/css/blog.css;',
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
  app.set('views', __dirname + '/views')
  app.use(express.bodyParser())
  app.use(express.static(__dirname + "/public"))
})



// --------------------
// index
// --------------------

var middleware = [app.middleware.context, app.middleware.published]

app.get("/", middleware, function(req, rsp){
  rsp.render("index", {
    active: "index",
    articles: req.published
  })
})

app.get("/team", middleware, function(req, rsp){
  rsp.render("team", {
    active: "team",
    articles: req.published
  })
})

app.get("/projects", middleware, function(req, rsp){
  rsp.render("projects", {
    active: "projects",
    articles: req.published
  })
})

app.get("/contact", middleware, function(req, rsp){
  rsp.render("contact", {
    active: "contact",
    articles: req.published
  })
})

// --------------------
// blog routes
// --------------------

require("./blog/routes")(app)

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
// 404
// --------------------

// app.all("*", app.middleware.context, function(req, rsp){
//   rsp.render("404")
// })


// --------------------
// export
// --------------------

module.exports = app
