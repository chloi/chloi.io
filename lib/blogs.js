var fs    = require("fs")
var jade  = require("jade")


module.exports = function(dir){
  
  var cache = function(dir){
    var blogs = {}
    var blogDirs = fs.readdirSync(dir)
    blogDirs.forEach(function(blog){

      blogs[blog] = { 
        "articles": {},
        "templates": {}
      }

      // layout
      var layoutContent = fs.readFileSync(dir + "/" + blog + "/views/layout.jade")
      blogs[blog]["templates"]["layout"] = jade.compile(layoutContent);
      
      // show
      var showContent   = fs.readFileSync(dir + "/" + blog + "/views/show.jade")
      blogs[blog]["templates"]["show"] = jade.compile(showContent);
      
      // index
      var indexContent   = fs.readFileSync(dir + "/" + blog + "/views/index.jade")
      blogs[blog]["templates"]["index"] = jade.compile(indexContent);
      
      // rss
      var rssContent   = fs.readFileSync(dir + "/" + blog + "/views/rss.jade")
      blogs[blog]["templates"]["rss"] = jade.compile(rssContent);

      var articleDirs = fs.readdirSync(dir + "/"+ blog +"/articles")
      articleDirs.forEach(function(articleDir){
        var path            = dir + "/"+ blog +"/articles/" + articleDir
        
        // article
        var articleConfig   = fs.readFileSync(path + "/article.json")
        var articleContent  = fs.readFileSync(path + "/article.jade")
        
        var config          = JSON.parse(articleConfig)
        var template        = jade.compile(articleContent, { filename: path + "/article.jade" });

        var html = template({})
        if(true || config.published){
          blogs[blog]["articles"][config.url] = {
            title: config.title,
            published: config.published ? new Date(config.published) : new Date(),
            url: config.url || config.title.replace(/\W+/gi, ' ').replace(/^\s*|\s*$/gi,'').toLowerCase().replace(/ /gi, '-'),
            html: html
          }
        }

      })
    })
    return blogs
  }
  
  var cache = cache(dir)
  
  return {
    
    index: function(blog, locals, cb){
      if(cache[blog] && cache[blog]["articles"]){
        var l = cache[blog]["templates"]["layout"]
        var i = cache[blog]["templates"]["index"]
        cb(l({ body: i({ articles: cache[blog]["articles"] }) }))
      }else{
        cb(null)
      }
    },
    
    show: function(blog, path, cb){
      if(cache[blog] && cache[blog]["articles"][path]){
        var l = cache[blog]["templates"]["layout"]
        var s = cache[blog]["templates"]["show"]
        cb(l({ body: s({ article: cache[blog]["articles"][path] }) }))
      }else{
        cb(null)
      }     
    },
    
    rss: function(blog, cb){
      if(cache[blog] && cache[blog]["articles"]){
        var l = cache[blog]["templates"]["layout"]
        var i = cache[blog]["templates"]["rss"]
        cb(l({ body: i({ articles: cache[blog]["articles"] }) }))
      }else{
        cb(null)
      }
    }
    
  }
}

