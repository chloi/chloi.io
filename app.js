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
  exec('./node_modules/.bin/lessc public/css/app.less public/css/app.css; ./node_modules/.bin/lessc public/css/responsive.less public/css/responsive.css;',
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

app.get("/",  m.info, m.published, function(req, rsp){      
  rsp.render("index",{
    info: req.info,
    articles: req.published
  })
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
// articles / blog
// --------------------

app.get("/blog/articles", m.info, m.published, function(req, rsp){
  rsp.render("blog/articles", {
    info: req.info,
    articles: req.published
  })
})

// Same as above
app.get("/blog", m.info, m.published, function(req, rsp){
  rsp.render("blog/articles", {
    info: req.info,
    articles: req.published
  })
})


app.get("/blog/articles.atom", m.info, m.published, m.feed, function(req, rsp){
  rsp.render("blog/atom", {
    layout: false,
    info: req.info,
    articles: req.published
  })
})

app.get("/blog/unpublished/:slug", m.info, m.published, function(req, rsp){
  if(process.env.NODE_ENV == "production"){
    rsp.send("Nothing to see here.", 404)
  }else{
    rsp.render("blog/show", {
      info: req.info,
      article: { slug: req.params.slug, date: "Unpublished" }
    })    
  }
})

app.get("/blog/:slug", m.info, m.published, function(req, rsp){
  // check for published article
  var article;
  req.published.forEach(function(a){
    if(a.slug === req.params.slug)
      article = a;
  })
  if(article){
    rsp.render("blog/show", {
      info: req.info,
      article: article
    })
  }else{
    rsp.send("Nothing to see here.", 404)
  }
})


// --------------------
// export
// --------------------

module.exports = app
