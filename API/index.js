var express = require("express");
var app = express();

app.listen(6969);
//Uses cors
var cors = require("cors");
app.use(cors());
//Use body parser
var bodyParser = require("body-parser");
app.use(bodyParser.json());
//Use Books
app.use("/books", require("./books"));
console.log("Connecting on Port : 6969");
