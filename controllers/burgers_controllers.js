// Controllers: Bridging Models & Views since... the late 90's???
// =======================================
var express = require("express");

var router = express.Router();

// Burger.js: Don't Leave Your Database Without It!
var burger = require("../models/burger.js");


// Express' Router-->so CONTROLLING
router.get("/", function(req, res) {
  burger.selectAll(function(data) {
    var hbsObject = {
      burgerList: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function(req, res) {
  burger.insertOne(
    [
        "burger_name", "devoured"
    ], 
    [
        req.body.name, 0
    ], function(result) {
    res.json({ id: result.insertId });
    });
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id=" + req.params.id;

  console.log("the condition: " + condition);

  burger.updateOne({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // Alert to let us know if our update failed because NCF ("No Can Find")
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Finally, to the SERVER.js
module.exports = router;