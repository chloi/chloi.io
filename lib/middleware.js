var fs      = require("fs")
var request = require("request")
var jade    = require("jade")

var cache = {}

exports.context = function(req, rsp, next){
  if(req.headers.host.indexOf("blog") !== -1){
    req.context = "blog"
  }else{
    req.context = "site"
  }
  var render = rsp.render
  rsp.render = function(){
    var args = Array.prototype.slice.call(arguments)
    args[0] = req.context + "/" + args[0]
    return render.apply(this, args)
  }
  next()
}

var fetch = function(data){
  if(cache[data]){
    return cache[data]
  }else{
    console.log("touching disk for", data)
    cache[data] = JSON.parse(fs.readFileSync("./blog/publish.json"))
    return cache[data]
  }
}

exports.published = function(req, rsp, next){
  var posts = fetch("publish")
  var posts = posts.sort(sortByDate);
  req.published = posts;
  next()  
}

// Used to sort articles by date and not convention.
// Date must be a valid dateString.
var sortByDate = function(a, b) {
  var date1 = new Date(a.date);
  var date2 = new Date(b.date);
  
  if (date1 < date2) return 1;
  if (date1 > date2) return -1;
  return 0;  
}

function rfc3339(d){
 function pad(n){return n<10 ? '0'+n : n}
 return d.getUTCFullYear()+'-'
      + pad(d.getUTCMonth()+1)+'-'
      + pad(d.getUTCDate())+'T'
      + pad(d.getUTCHours())+':'
      + pad(d.getUTCMinutes())+':'
      + pad(d.getUTCSeconds())+'Z'}

exports.feed = function(req, rsp, next){
  req.published.forEach(function(article){
    var path     = "./views/blog/articles/" + article.slug + ".jade"
    var file     = fs.readFileSync(path)
    var template = jade.compile(file, { filename: path })
    article.updated = "SomeDate";
    article.dateFormat = rfc3339;
    article.html = template({ article: article });
  })
  next()
}
