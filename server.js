var app   = require("./app")
var port  = process.env.PORT || 8001

app.listen(port)
console.log("Chloi is running on port", port)