// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";
import { Mongo } from 'meteor/mongo'

// Import and rename a variable exported by angular-autoform.js.
import { name as packageName } from "meteor/angular-autoform";

import utils from "./utils"


Tinytest.add('utils getCollection', function(test) {
  const collection = new Mongo.collection('A')
  test.equal(collection, utils.getCollection('A'))
})

// Write your tests here!
// Here is an example.
Tinytest.add('angular-autoform - example', function (test) {
  test.equal(packageName, "angular-autoform");
});

