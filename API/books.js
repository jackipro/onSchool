var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb+srv://jackipro:namheo1509@cluster0-0kol5.mongodb.net/test";
router.get("/", (req, res) => {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    console.log("Data created");
    var dbo = db.db("test");
    var query = {};
    dbo
      .collection("book")
      .find(query)
      .toArray((err, result) => {
        if (err) throw err;
        console.log(result);
        res.json(result);
      });
  });
  //   res.send("hello book 123");
});
router.get("/:id", (req, res) => {
  var id = req.params.id;
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("test");
    var ObjectId = require("mongodb").ObjectId;
    var query = { _id: ObjectId(id) };
    dbo.collection("book").findOne(query, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.json(result);
    });
  });
});
router.post("/", (req, res) => {
  var newBook = req.body;
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    console.log("Data created");
    var dbo = db.db("test");
    dbo.collection("book").insertOne(newBook, (error, result) => {
      if (error) throw error;
      var kq = false;
      if (result.insertedCount > 0) {
        kq = true;
      }
      console.log(kq);
      res.json(kq);
    });
  });
});

router.delete("/:id", (req, res) => {
  var id = req.params.id;
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("test");
    var ObjectId = require("mongodb").ObjectId;
    var query = { _id: ObjectId(id) };
    dbo.collection("book").deleteOne(query, (err, result) => {
      if (err) throw err;
      var kq = false;
      if (result.result.n > 0) {
        kq = true;
        console.log(kq);
        res.json(kq);
      }
    });
  });
});
module.exports = router;
