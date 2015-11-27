/**
 * Created by ikebal on 26.11.15.
 */
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID
var assert = require('assert');
var url = 'mongodb://localhost:27017/gladmat';

function Storage () {
  var self = this;

  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server.");
    self.db = db;
    self.participants = self.db.collection('participants');
  });
}


Storage.prototype.save = function (doc, callback) {
  this.participants.insertOne(doc, function (err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the participants collection (result)", result);
    callback(result);
  });
};

Storage.prototype.read_all = function (callback) {
  var docs = [];
  var cursor = this.participants.find().sort({ _id: -1 });
  cursor.forEach(function (doc) {
    doc.created_at = ObjectId(doc._id).getTimestamp();
    docs.push(doc);
  }, function () {
    console.log("Read documents from the participants collection (result)", docs);
    callback(docs);
  });
};

Storage.prototype.read = function (id, callback) {
  var docs = [];
  var query = { _id: ObjectId(id) };

    var cursor = this.participants.find(query);
  cursor.forEach(function (doc) {
    doc.created_at = ObjectId(doc._id).getTimestamp();
    docs.push(doc);
  }, function () {
    console.log("Read documents from the participants collection with query (result)", query, docs);
    callback(docs);
  });
};

Storage.prototype.disconnect = function () {
  this.db.close();
};

module.exports = Storage;
