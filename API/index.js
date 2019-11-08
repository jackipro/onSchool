var express = require("express");
var app = express();

app.listen(6969);
var cors = require("cors");
app.use(cors());
//Use Books
app.use("/books", require("./books"));
