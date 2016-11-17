import { Mongo } from 'meteor/mongo';
import { Roles } from 'meteor/alanning:roles';
import { schema } from './schema.coffee';

export const Products = new Mongo.Collection('products');

Products.allow({
  insert: function (userId, product) {
    return userId && Roles.userIsInRole(userId, 'producer') && (userId === product.producer || isAdmin(userId));
  },
  update: function (userId, product, fields, modifier) {
    if (fields === ['qty']) {
      return !!userId;
    }
    return userId && isProducer(userId);
  },
  remove: function (userId, product) {
    return userId && isAdmin(userId);
  },
});

function isAdmin(user) {
  return Roles.userIsInRole(user, 'admin');
}

function isProducer(user) {
  return Roles.userIsInRole(user, 'producer');
}

Products.attachSchema(schema);
