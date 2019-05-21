// This file is also part of the "M" of MVC-->
// Use the DB queries from the ORM & create functions for the Controller
var orm = require("../config/orm.js");

var burger = {
    // This function will list all the burgers in the DB
  selectAll: function(cb) {
    orm.selectAll("burgers", function(res) {
      cb(res);
    });
  },

  // This function inserts FIVE BURGERS!!
  // J/K, this function inserts a single, user-generated burger
  insertOne: function(cols, vals, cb) {
    orm.insertOne("burgers", cols, vals, function(res) {
      cb(res);
    });
  },

  //Courtesy of "PUT", in this instance we'll use this function to...
  //  update a single db value based on a specific column value (the ID)
  updateOne: function(objColVals, condition, cb) {
    orm.updateOne("burgers", objColVals, condition, function(res) {
      cb(res);
    });
  }
};

// Controllers gotta control:
module.exports = burger;