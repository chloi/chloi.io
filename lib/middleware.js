var fs      = require("fs")
var request = require("request")
var jade    = require("jade")

exports.info = function(req, rsp, next){
  req.info = {}
  next()
}

var cache   = {
  info: {},
  publish: {}
}

var fetch = function(data, handle){
  if(cache[data][handle]){
    return cache[data][handle]
  }else{
    console.log("touching disk for", data, handle)
    cache[data][handle] = JSON.parse(fs.readFileSync("./data/"+ handle +"/"+ data +".json"))
    return cache[data][handle]
  }
}

exports.published = function(req, rsp, next){
  var posts = fetch("publish", 'chloi')
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
    var path     = "./views/"+ req.info.handle +"/articles/" + article.slug + ".jade"
    var file     = fs.readFileSync(path)
    var template = jade.compile(file, { filename: path })
    article.updated = "SomeDate";
    article.dateFormat = rfc3339;
    article.html = template({ article: article });
  })
  next()
}

