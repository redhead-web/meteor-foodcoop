import { Mongo } from 'meteor/mongo';
import {Roles} from 'meteor/alanning:roles'
import {Match} from 'meteor/check'

import {schema} from './schema'

export const Offers = new Mongo.Collection('offers');

Offers.allow({
  insert(userId, offer) {
    return offer.user == userId
  },
  update(userId, offer, fields, modifier) {
    return true
  },
  remove(userId, offer) {
    return offer.user == userId
  }
});

function isAdmin (user) {
  return Roles.userIsInRole(user, 'admin');
}

Offers.attachSchema(schema)
