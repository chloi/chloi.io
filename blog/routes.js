module.exports = function(app){
  
  var middleware  = [app.middleware.context, app.middleware.published]
  var feed        = [app.middleware.context, app.middleware.published, app.middleware.feed]
  
  app.get("/articles", middleware, function(req, rsp){
    rsp.render("articles", {
      articles: req.published
    })
  })

  app.get("/articles.atom", feed, function(req, rsp){
    rsp.render("atom", {
      layout: false,
      articles: req.published
    })
  })

  app.get("/unpublished/:slug", middleware, function(req, rsp){
    if(process.env.NODE_ENV == "production"){
      rsp.send("Nothing to see here.", 404)
    }else{
      rsp.render("show", {
        article: { slug: req.params.slug, date: "Unpublished" }
      })    
    }
  })

  app.get("/:slug", middleware, function(req, rsp){
    // check for published article
    var article;
    req.published.forEach(function(a){
      if(a.slug === req.params.slug)
        article = a;
    })
    if(article){
      rsp.render("show", {
        article: article
      })
    }else{
      rsp.send("Nothing to see here.", 404)
    }
  })
  
  return app
  
}