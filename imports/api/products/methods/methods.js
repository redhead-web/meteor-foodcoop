import { Meteor } from 'meteor/meteor';
import { Products } from '../collection';
import { check } from 'meteor/check';

export function getProduct(productId) {
  check(productId, String);
  return Products.findOne(productId);
}

Meteor.methods({ getProduct });
