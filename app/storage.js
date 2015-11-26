/**
 * Created by ikebal on 26.11.15.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/gladmat';

function Storage () {
  var self = this;

  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server.");
    self.db = db;
  });
}


Storage.prototype.save = function (doc, callback) {
  this.db.collection('participants').insertOne(doc, function (err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the participants collection (result)", result);
    callback(result);
  });
};

Storage.prototype.read_all = function (callback) {
  var docs = [];
  var cursor = this.db.collection('participants').find();
  cursor.forEach(function (doc) {
    docs.push(doc);
  }, function () {
    console.log("Read documents from the participants collection (result)", docs);
    callback(docs);
  });
};

Storage.prototype.disconnect = function () {
  this.db.close();
};

module.exports = Storage;
