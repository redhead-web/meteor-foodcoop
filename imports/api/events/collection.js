import { Mongo } from 'meteor/mongo';
import {Roles} from 'meteor/alanning:roles'

export const Events = new Mongo.Collection('events');

Events.allow({
  insert(userId, party) {
    return userId && isAdmin(userId);
  },
  update(userId, party, fields, modifier) {
    return userId && isAdmin(userId);
  },
  remove(userId, party) {
    return userId && isAdmin(userId);
  }
});

function isAdmin (user) {
  return Roles.userIsInRole(user, 'admin');
}
