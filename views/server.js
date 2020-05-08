var express = require("express");
var bodyParser = require("body-parser");
const db = require("./db");

var app = express();




app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());



module.exports= app;

require("../routes/middleware.js")(app)


app.listen(3000,function(){
    console.log("Server running at http://127.0.0:3000/")
})



