import { Mongo } from 'meteor/mongo';
import { Roles } from 'meteor/alanning:roles';
import { schema } from './schema.coffee';

export const Products = new Mongo.Collection('products');

function isAdmin(user) {
  return Roles.userIsInRole(user, 'admin');
}

function isProducer(user) {
  return Roles.userIsInRole(user, 'producer');
}

Products.allow({
  insert(userId, product) {
    return userId && Roles.userIsInRole(userId, 'producer') && (userId === product.producer || isAdmin(userId));
  },
  update(userId, product, fields) {
    if (fields === ['qty']) {
      return !!userId;
    }
    return userId && isProducer(userId);
  },
  remove(userId) {
    return userId && isAdmin(userId);
  },
});


Products.attachSchema(schema);
